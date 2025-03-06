// src/context/UserContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase' // Firebase Auth
import { onAuthStateChanged } from 'firebase/auth'; // Auth state listener
import { doc, getDoc, setDoc } from 'firebase/firestore'; // Firestore functions
import { db } from '../firebase'; // Firestore instance

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userRole, setUserRole] = useState(null); // null until authenticated
  const [user, setUser] = useState(null); // Track authenticated user (now used)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // Fetch role from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role || 'resident'); // Default to resident if no role
        } else {
          setUserRole('resident'); // Default for new users
          // Create a new user document with default role
          await setDoc(doc(db, 'users', user.uid), { role: 'resident' }, { merge: true });
        }
      } else {
        setUserRole(null); // Logout
      }
    });
    return unsubscribe; // Cleanup subscription
  }, []);

  const updateUserRole = async (role) => {
    setUserRole(role);
    if (user) {
      // Update role in Firestore
      await setDoc(doc(db, 'users', user.uid), { role }, { merge: true });
    }
  };

  const value = {
    userRole,
    setUserRole: updateUserRole,
    user, // Expose user object for authentication checks
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);