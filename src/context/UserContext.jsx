// src/context/UserContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userRole, setUserRole] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        console.log('Auth user UID:', user.uid); // Debug
        console.log('Auth user email:', user.email); // Debug
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const role = userDoc.data().role || 'resident';
            setUserRole(role);
            console.log('Fetched role from Firestore:', role); // Debug
          } else {
            setUserRole('resident'); // Default
            await setDoc(doc(db, 'users', user.uid), { role: 'resident' }, { merge: true });
            console.log('Created new user with default role:', 'resident'); // Debug
          }
        } catch (error) {
          console.error('Error fetching user role:', error.message);
          setUserRole('resident'); // Fallback
        }
      } else {
        setUserRole(null);
        console.log('User logged out'); // Debug
      }
    });
    return unsubscribe;
  }, []);

  const updateUserRole = async (role) => {
    setUserRole(role);
    if (user) {
      await setDoc(doc(db, 'users', user.uid), { role }, { merge: true });
      console.log('Updated role to:', role); // Debug
    }
  };

  const value = {
    userRole,
    setUserRole: updateUserRole,
    user,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);