import React, { useState, useEffect, createContext, useContext } from 'react';
import { User } from '../types';

type AuthShape = {
  user: User | null;
  loading: boolean;
  login: (phone: string, aadhaar?: string, role?: 'patient' | 'doctor') => Promise<User>;
  logout: () => void;
};

const AuthContext = createContext<AuthShape | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const stored = localStorage.getItem('medi-mantra_user');
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const login = async (phone: string, aadhaar?: string, role: 'patient' | 'doctor' = 'patient') => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: role === 'doctor' ? 'Dr. ' + phone.slice(-4) : 'Patient ' + phone.slice(-4),
      phone,
      role,
      aadhaar,
      specialization: role === 'doctor' ? 'General Medicine' : undefined,
      createdAt: new Date().toISOString(),
    };
  localStorage.setItem('medi-mantra_user', JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
  localStorage.removeItem('medi-mantra_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthShape => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
