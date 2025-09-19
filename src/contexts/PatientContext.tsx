import React, { createContext, useContext, ReactNode } from 'react';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  address: string;
  profilePicture: string;
  bloodGroup: string;
  allergies: string[];
  chronicConditions: string[];
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
}

interface PatientContextType {
  patient: Patient;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

const mockPatient: Patient = {
  id: 'UP-P001',
  name: 'Asha Sharma',
  age: 32,
  gender: 'Female',
  email: 'asha.sharma@example.in',
  phone: '+91 94150 12345',
  address: 'Sector 7, Alambagh, Lucknow, Uttar Pradesh',
  profilePicture: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
  bloodGroup: 'A+',
  allergies: ['Penicillin', 'Seafood', 'Pollen'],
  chronicConditions: ['Hypertension', 'Type 2 Diabetes'],
  emergencyContact: {
    name: 'Ramesh Sharma',
    phone: '+91 94150 54321',
    relation: 'Husband'
  }
};

export const PatientProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <PatientContext.Provider value={{ patient: mockPatient }}>
      {children}
    </PatientContext.Provider>
  );
};

export const usePatient = () => {
  const context = useContext(PatientContext);
  if (context === undefined) {
    throw new Error('usePatient must be used within a PatientProvider');
  }
  return context;
};