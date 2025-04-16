import React from 'react';
import { Check } from 'lucide-react';
import { useCheckbox } from '@/context/CheckboxesContext';

export const GroupCheckboxes: React.FC = () => {
  const { groups, groupStructure, toggleGroup, activateAll, deactivateAll, randomizeAll } = useCheckbox();

  const isGroupChecked = (groupName: string): boolean => {
    const group = groups.find(g => g.name === groupName);
    return group ? group.checked : false;
  };

  const areAllSubsAndTheMainChecked = (groupName: string): boolean => {
    const mainGroup = groupStructure.find(g => g.name === groupName);
    if (!mainGroup) return false;

    if (!isGroupChecked(groupName)) return false;

    for (const subgroup of mainGroup.subgroups) {
      if (!isGroupChecked(subgroup)) return false;
    }

    return true;
  };

  const handleAllMain = (groupName: string): void => {
    const mainGroup = groupStructure.find(g => g.name === groupName);
    if (!mainGroup) return;

    const allChecked = areAllSubsAndTheMainChecked(groupName);
    const newState = !allChecked;

    if (!isGroupChecked(groupName) === newState) {
      toggleGroup(groupName);
    }
    mainGroup.subgroups.forEach(subgroup => {
      if (isGroupChecked(subgroup) !== newState) {
        toggleGroup(subgroup);
      }
    });
  };
  
  return (
    <div className="w-[359px] pr-4">
      <h2 className="text-lg font-semibold mb-2">Filter Groups</h2>
      
      {/* Activate all and Deactivate all buttons */}
      <div className="mb-4 flex space-x-2">
        <button
          onClick={activateAll}
          className="px-3 py-1 bg-brand-300 text-white rounded hover:bg-brand-400 transition-colors"
        >
          Activate All
        </button>
        <button
          onClick={deactivateAll}
          className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
        >
          Deactivate All
        </button>
      </div>
      
      {/* Mapping through each main group */}
      {groupStructure.map((group) => (
        <div key={group.name} className="mb-4">
          {/* "All [Group Name]" checkbox */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => handleAllMain(group.name)}
          >
            <div className={`w-4 h-4 border-2 rounded flex items-center justify-center mr-2 ${
              areAllSubsAndTheMainChecked(group.name)
                ? 'bg-brand-300 border-brand-300'
                : 'border-gray-300'
            }`}>
              {areAllSubsAndTheMainChecked(group.name) &&
                <Check className="w-3 h-3 text-white" />
              }
            </div>
            <span className="text-sm font-medium">All {group.name}</span>
          </div>
          
          <div className="ml-6 mt-2">
            {/* Main group checkbox */}
            <div
              className="flex items-center mt-1 cursor-pointer"
              onClick={() => toggleGroup(group.name)}
            >
              <div className={`w-4 h-4 border-2 rounded flex items-center justify-center mr-2 ${
                isGroupChecked(group.name) ? 'bg-brand-300 border-brand-300' : 'border-gray-300'
              }`}>
                {isGroupChecked(group.name) && <Check className="w-3 h-3 text-white" />}
              </div>
              <span className="text-sm">{group.name}</span>
            </div>
            
            {/* Subgroup checkboxes */}
            {group.subgroups.map((subgroup) => (
              <div
                key={subgroup}
                className="flex items-center mt-1 cursor-pointer"
                onClick={() => toggleGroup(subgroup)}
              >
                <div className={`w-4 h-4 border-2 rounded flex items-center justify-center mr-2 ${
                  isGroupChecked(subgroup) ? 'bg-brand-300 border-brand-300' : 'border-gray-300'
                }`}>
                  {isGroupChecked(subgroup) && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className="text-sm">{subgroup}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

    </div>
  );
};