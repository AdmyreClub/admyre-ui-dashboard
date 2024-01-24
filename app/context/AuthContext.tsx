"use client"
import React, { createContext, useContext, ReactNode } from 'react';

type AuthContextType = {
  userId: string | null;
};

const AuthContext = createContext<AuthContextType>({ userId: null });

export const useAuth = () => useContext(AuthContext);

type AuthProviderProps = {
  userId: string | null;
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ userId, children }) => {
  return (
    <AuthContext.Provider value={{ userId }}>
      {children}
    </AuthContext.Provider>
  );
};
