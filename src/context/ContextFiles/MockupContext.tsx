"use client"; // Important for the context to run on the client

import { createContext, useContext, ReactNode, useEffect, useState } from "react";
import { Group } from '@/data/interfaces';
import { mockData } from '@/data/mockup';
import { useName } from './NameContext';

// Define the type for the context
type MockupContextType = Group[];

// Create the context
const MockupContext = createContext<MockupContextType | null>(null);

const replaceUserWithName = (obj: any, name: string): any => {
  if (typeof obj === 'string') {
    return obj.replace(/USER/g, name);
  }
  if (Array.isArray(obj)) {
    return obj.map(item => replaceUserWithName(item, name));
  }
  if (typeof obj === 'object' && obj !== null) {
    const newObj: any = {};
    for (const key in obj) {
      newObj[key] = replaceUserWithName(obj[key], name);
    }
    return newObj;
  }
  return obj;
};

// Provider for the global mockup data
export const MockupProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { name } = useName();
  const [processedMockData, setProcessedMockData] = useState<MockupContextType>(() => {
    console.log('Initial mockData:', mockData);
    return mockData;
  });

  useEffect(() => {
    console.log('MockupProvider useEffect triggered');
    console.log('Current name:', name);

    const effectiveName = name || "Noa";
    console.log('Effective name:', effectiveName);

    let storedData: string | null = null;
    let storedName: string | null = null;

    try {
      storedData = localStorage.getItem('processedMockData');
      storedName = localStorage.getItem('storedName');
      console.log('Stored name:', storedName);
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }

    if (!storedData || storedName !== effectiveName) {
      console.log('Processing new data');
      const newProcessedData = replaceUserWithName(mockData, effectiveName);
      setProcessedMockData(newProcessedData);
      try {
        localStorage.setItem('processedMockData', JSON.stringify(newProcessedData));
        localStorage.setItem('storedName', effectiveName);
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    } else {
      console.log('Using stored data');
      try {
        const parsedData = JSON.parse(storedData);
        setProcessedMockData(parsedData);
      } catch (error) {
        console.error('Error parsing stored data:', error);
        setProcessedMockData(replaceUserWithName(mockData, effectiveName));
      }
    }
  }, [name]);

  console.log('Rendered processedMockData:', processedMockData);

  return (
    <MockupContext.Provider value={processedMockData}>
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