import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState({});

  const updateProfile = (profile) => {
    setUserProfile(profile);
  };

  return (
    <UserContext.Provider value={{ userProfile, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
};