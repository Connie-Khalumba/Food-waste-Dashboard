// redifu-dashboard/src/context/UserContext.jsx
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
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      setUser(authUser);
      if (authUser) {
        console.log('Auth user UID:', authUser.uid);
        console.log('Auth user email:', authUser.email);
        try {
          const userDoc = await getDoc(doc(db, 'users', authUser.uid));
          if (userDoc.exists()) {
            const role = userDoc.data().role || 'resident';
            setUserRole(role);
            console.log('Fetched role from Firestore:', role);
          } else {
            setUserRole('resident');
            await setDoc(doc(db, 'users', authUser.uid), { role: 'resident' }, { merge: true });
            console.log('Created new user with default role:', 'resident');
          }
        } catch (error) {
          console.error('Error fetching user role:', error.message);
          setUserRole(null);
        }
      } else {
        setUserRole(null);
        console.log('User logged out');
      }
    });
    return () => unsubscribe();

  }, []);

  const updateUserRole = async (role) => {
    if (!user) return;
    const validRoles = ["admin", "resident", "moderator"]; // Define allowed roles
    if (!validRoles.includes(role)) {
      console.error("Invalid role assignment:", role);
      return;
    }
  
    setUserRole(role);
    try {
      await setDoc(doc(db, "users", user.uid), { role }, { merge: true });
      console.log("Updated role to:", role);
    } catch (error) {
      console.error("Error updating role:", error.message);
    }
  };
  

  const value = {
    userRole,
    setUserRole: updateUserRole, // Use the custom update function
    user,
    setUser, // Expose setUser for manual updates (e.g., from Login)
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);