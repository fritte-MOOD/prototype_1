"use client"; // Important for the context to run on the client

import { createContext, useContext, ReactNode } from "react";
import { Group } from '@/data/interfaces';
import { mockData } from '@/data/mockup';

// Define the type for the context
type MockupContextType = Group[];

// Create the context
const MockupContext = createContext<MockupContextType | null>(null);

// Provider for the global mockup data
export const MockupProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <MockupContext.Provider value={mockData}>
      {children}
    </MockupContext.Provider>
  );
};

// Custom Hook to access the context
export const useMockup = (): MockupContextType => {
  const context = useContext(MockupContext);
  if (context === null) {
    throw new Error('useMockup must be used within a MockupProvider');
  }
  return context;
};