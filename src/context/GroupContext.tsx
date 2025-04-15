"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define the type for the context
interface GroupContextType {
  groupName: string;
  setGroupName: (name: string) => void;
}

// Create the context
const GroupContext = createContext<GroupContextType | undefined>(undefined);

// Provider for the global group name
export const GroupProvider = ({ children }: { children: ReactNode }) => {
  const [groupName, setGroupName] = useState<string>(() => {
    // Check if a group name is stored in localStorage on first load
    if (typeof window !== "undefined") {
      return localStorage.getItem("groupName") || "";
    }
    return "";
  });

  // Save the group name to localStorage when it changes
  useEffect(() => {
    if (groupName) {
      localStorage.setItem("groupName", groupName);
    }
  }, [groupName]);

  return (
    <GroupContext.Provider value={{ groupName, setGroupName }}>
      {children}
    </GroupContext.Provider>
  );
};

// Custom Hook to access the context
export const useGroup = () => {
  const context = useContext(GroupContext);
  if (!context) {
    throw new Error("useGroup must be used within a GroupProvider");
  }
  return context;
};