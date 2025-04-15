import React from 'react';
import { Check } from 'lucide-react';

interface Group {
  name: string;
  subgroups: string[];
}

interface GroupCheckboxesProps {
  allGroups: Group[];
  checkedGroups: { [key: string]: boolean };
  setCheckedGroups: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
}

export const GroupCheckboxes: React.FC<GroupCheckboxesProps> = ({ allGroups, checkedGroups, setCheckedGroups }) => {
  const handleCheckboxChange = (groupName: string) => {
    setCheckedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };

  const isGroupChecked = (groupName: string) => {
    return checkedGroups[groupName] || false;
  };

  const areAllMainGroupChecked = (groupName: string, subgroups: string[]) => {
    return checkedGroups[groupName] && subgroups.every(subgroup => checkedGroups[subgroup]);
  };

  const handleAllMainGroupCheckboxChange = (groupName: string, subgroups: string[]) => {
    const allChecked = areAllMainGroupChecked(groupName, subgroups);
    const newCheckedState = !allChecked;

    const newCheckedGroups = { ...checkedGroups };
    newCheckedGroups[groupName] = newCheckedState;
    subgroups.forEach(subgroup => {
      newCheckedGroups[subgroup] = newCheckedState;
    });

    setCheckedGroups(newCheckedGroups);
  };

  const activateAllGroups = () => {
    const newCheckedGroups = { ...checkedGroups };
    allGroups.forEach(group => {
      newCheckedGroups[group.name] = true;
      group.subgroups.forEach(subgroup => {
        newCheckedGroups[subgroup] = true;
      });
    });
    setCheckedGroups(newCheckedGroups);
  };

  const deactivateAllGroups = () => {
    const newCheckedGroups = { ...checkedGroups };
    allGroups.forEach(group => {
      newCheckedGroups[group.name] = false;
      group.subgroups.forEach(subgroup => {
        newCheckedGroups[subgroup] = false;
      });
    });
    setCheckedGroups(newCheckedGroups);
  };

  return (
    <div className="w-[359px] pr-4">
      <h2 className="text-lg font-semibold mb-2">Filter Groups</h2>
      <div className="mb-4 flex space-x-2">
        <button
          onClick={activateAllGroups}
          className="px-3 py-1 bg-brand-300 text-white rounded hover:bg-brand-400 transition-colors"
        >
          Activate All
        </button>
        <button
          onClick={deactivateAllGroups}
          className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
        >
          Deactivate All
        </button>
      </div>
      {allGroups.map((group) => (
        <div key={group.name} className="mb-4">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => handleAllMainGroupCheckboxChange(group.name, group.subgroups)}
          >
            <div className={`w-4 h-4 border-2 rounded flex items-center justify-center mr-2 ${
              areAllMainGroupChecked(group.name, group.subgroups)
                ? 'bg-brand-300 border-brand-300'
                : 'border-gray-300'
            }`}>
              {areAllMainGroupChecked(group.name, group.subgroups) &&
                <Check className="w-3 h-3 text-white" />
              }
            </div>
            <span className="text-sm font-medium">All {group.name}</span>
          </div>
          <div className="ml-6 mt-2">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => handleCheckboxChange(group.name)}
            >
              <div className={`w-4 h-4 border-2 rounded flex items-center justify-center mr-2 ${
                isGroupChecked(group.name) ? 'bg-brand-300 border-brand-300' : 'border-gray-300'
              }`}>
                {isGroupChecked(group.name) && <Check className="w-3 h-3 text-white" />}
              </div>
              <span className="text-sm">{group.name}</span>
            </div>
            {group.subgroups.map((subgroup) => (
              <div
                key={subgroup}
                className="flex items-center mt-1 cursor-pointer"
                onClick={() => handleCheckboxChange(subgroup)}
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