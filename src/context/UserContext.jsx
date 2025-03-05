// src/context/UserContext.js
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userRole, setUserRole] = useState('resident'); // Default to resident, update via login/API

  const updateUserRole = (role) => {
    setUserRole(role);
  };

  const value = {
    userRole,
    setUserRole: updateUserRole,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);