"use client";

import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { mockData } from '@/data/mockup';

// Console log the mockData right after importing
console.log('Imported mockData:', JSON.stringify(mockData, null, 2));

interface GroupCheckbox {
  name: string;
  checked: boolean;
}

interface GroupStructure {
  name: string;
  subgroups: string[];
}

interface CheckboxContextType {
  groups: GroupCheckbox[];
  toggleGroup: (groupName: string) => void;
  activateAll: () => void;
  deactivateAll: () => void;
  randomizeAll: () => void;
  groupStructure: GroupStructure[];
  activateMainAndSubs: (mainGroupName: string) => void;
  activateOnlySub: (subGroupName: string) => void;
}

const generateInitialGroups = (): GroupCheckbox[] => [];

const initialGroups: GroupCheckbox[] = generateInitialGroups();

const CheckboxContext = createContext<CheckboxContextType | undefined>(undefined);

export const useCheckbox = () => {
  const context = useContext(CheckboxContext);
  if (!context) {
    throw new Error('useCheckbox must be used within a CheckboxProvider');
  }
  return context;
};

export const CheckboxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [groups, setGroups] = useState<GroupCheckbox[]>(generateInitialGroups());
  const [groupStructure, setGroupStructure] = useState<GroupStructure[]>([]);

  useEffect(() => {
    const initializeData = async () => {
      // Wait for mockData to be populated
      await new Promise(resolve => setTimeout(resolve, 0));
      
      console.log('MockData after waiting:', JSON.stringify(mockData, null, 2));

      const newGroups: GroupCheckbox[] = [];
      const newGroupStructure: GroupStructure[] = [];

      mockData.forEach(mainGroup => {
        newGroups.push({ name: mainGroup.name, checked: true });
        const subgroups: string[] = [];
        mainGroup.subgroups.forEach(subgroup => {
          newGroups.push({ name: subgroup.name, checked: true });
          subgroups.push(subgroup.name);
        });
        newGroupStructure.push({ name: mainGroup.name, subgroups });
      });

      setGroups(newGroups);
      setGroupStructure(newGroupStructure);

      console.log('Initialized groups:', newGroups);
      console.log('Initialized group structure:', JSON.stringify(newGroupStructure, null, 2));
    };

    initializeData();
  }, []);

  const toggleGroup = (groupName: string) => {
    setGroups(prevGroups =>
      prevGroups.map(group =>
        group.name === groupName ? { ...group, checked: !group.checked } : group
      )
    );
  };

  const activateAll = () => {
    setGroups(prevGroups => prevGroups.map(group => ({ ...group, checked: true })));
  };

  const deactivateAll = () => {
    setGroups(prevGroups => prevGroups.map(group => ({ ...group, checked: false })));
  };

  const randomizeAll = () => {
    setGroups(prevGroups =>
      prevGroups.map(group => ({ ...group, checked: Math.random() < 0.5 }))
    );
  };

  const activateMainAndSubs = (mainGroupName: string) => {
    setGroups(prevGroups => {
      const deactivatedGroups = prevGroups.map(group => ({ ...group, checked: false }));
      const mainGroup = groupStructure.find(g => g.name === mainGroupName);
      if (mainGroup) {
        return deactivatedGroups.map(group => ({
          ...group,
          checked: group.name === mainGroupName || mainGroup.subgroups.includes(group.name)
        }));
      }
      return deactivatedGroups;
    });
  };

  const activateOnlySub = (subGroupName: string) => {
    setGroups(prevGroups => {
      const deactivatedGroups = prevGroups.map(group => ({ ...group, checked: false }));
      return deactivatedGroups.map(group => ({
        ...group,
        checked: group.name === subGroupName
      }));
    });
  };

  useEffect(() => {
    // You can add more logging here if needed
    console.log('Groups updated:', groups);
  }, [groups, groupStructure]);

  return (
    <CheckboxContext.Provider value={{ 
      groups, 
      toggleGroup, 
      activateAll, 
      deactivateAll, 
      randomizeAll, 
      groupStructure,
      activateMainAndSubs,
      activateOnlySub
    }}>
      {children}
    </CheckboxContext.Provider>
  );
};