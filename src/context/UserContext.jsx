// src/context/UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase'; // Import Firebase auth
import { onAuthStateChanged } from 'firebase/auth';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userRole, setUserRole] = useState(null); // null until authenticated
  const [user, setUser] = useState(null); // Track authenticated user

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        // Fetch role from Firestore or set a default
        fetchUserRole(user.uid);
      } else {
        setUserRole(null); // Logout
      }
    });
    return unsubscribe; // Cleanup subscription
  }, []);

  const fetchUserRole = async (uid) => {
    // Replace with your Firestore collection and document structure
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      setUserRole(userDoc.data().role || 'resident'); // Default to resident if no role
    } else {
      setUserRole('resident'); // Default for new users
    }
  };

  const updateUserRole = (role) => {
    setUserRole(role);
    if (user) {
      // Update role in Firestore
      setDoc(doc(db, 'users', user.uid), { role }, { merge: true });
    }
  };

  const value = {
    userRole,
    setUserRole: updateUserRole,
    user, // Expose user object for authentication state
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);