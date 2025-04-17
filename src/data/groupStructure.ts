import { Group } from './interfaces';


/* ID Spaces:
1000    "Park Club"
1100    "Executive Committee"
1200    "2nd Senior Team"
1300    "Construction Committee"
1400    "Training Organization"

2000    "Rochefort"
2100    "Parents of Rochefort"
2200    "Sports in Rochefort"

3000    "Marin Quarter"
3100    "House 12"
3200    "Handcrafts Friday"
3300    "Shared Dinner"
*/


const importGroupData = async (groupName: string) => {
  const normalizedName = groupName.replace(/\s+/g, '').toLowerCase();
  try {
    return await import(`./Groups/${normalizedName}.ts`);
  } catch (error) {
    return {};
  }
};

const importSubgroupData = async (mainGroupName: string, subgroupName: string) => {
  const normalizedMainGroup = mainGroupName.replace(/\s+/g, '').toLowerCase();
  const normalizedSubgroup = subgroupName.replace(/\s+/g, '').toLowerCase();
  try {
    const importedData = await import(`./Groups/${normalizedMainGroup}/${normalizedSubgroup}.ts`);
    return importedData;
  } catch (error) {
    return {};
  }
};

const createGroup = async (name: string, IAmMember: boolean, isPublic: boolean, subgroupNames: string[]): Promise<Group> => {
  const groupData = await importGroupData(name);

  const subgroups = await Promise.all(subgroupNames.map(async (subgroupName) => {
    const subgroupData = await importSubgroupData(name, subgroupName);
    return {
      name: subgroupName,
      IAmMember: subgroupData.IAmMember,
      public: subgroupData.public,
      subgroups: [],
      members: subgroupData.members || [],
      processes: subgroupData.processes || [],
      chats: subgroupData.chats || [],
      tasks: subgroupData.tasks || [],
      appointments: subgroupData.appointments || [],
    };
  }));

  return {
    name,
    IAmMember,
    public: isPublic,
    subgroups,
    members: groupData.members || [],
    processes: groupData.processes || [],
    chats: groupData.chats || [],
    tasks: groupData.tasks || [],
    appointments: groupData.appointments || [],
  };
};

export const getGroupStructure = async (): Promise<Group[]> => {
  return Promise.all([
    createGroup("Park Club", true, true, [
      "Executive Committee",
      "2nd Senior Team",
      "Construction Committee",
      "Training Organization"
    ]),
    createGroup("Rochefort", true, true, [
      "Parents of Rochefort",
      "Sports in Rochefort"
    ]),
    createGroup("Marin Quarter", true, true, [
      "House 12",
      "Handcrafts Friday",
      "Shared Dinner"
    ])
  ]);
};