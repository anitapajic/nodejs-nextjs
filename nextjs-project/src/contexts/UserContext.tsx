"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserContextType {
  user: any | null;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  refreshUser: () => Promise<void>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode; 
  }
  
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  const refreshUser = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/users/current`, {
        credentials: "include",
      });
      const currentUser = await response.json();
      setUser(currentUser);
    } catch (e) {
      setUser(null);
    }
  };

  useEffect(() => {
    refreshUser(); 
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
