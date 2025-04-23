import { Group } from './interfaces';

// Some hints when generating content:


/* These are the ID Spaces for ALL entities (messages, tasks, etc.):
   Each group and subgroup can use IDs within its designated range for any entity type.
   The same ID can be used for different entity types within a group/subgroup.
   Members always keep the same ID, even when they are in multiple groups or subgroups.
   Member's Names can be from any culture, but are mostly from european countries, and not so much from the US.
   Don't add ethnic background to the names.

1000-1999    All Groups of Park Club
   1000-1099    "Park Club"
   1100-1199    "Executive Committee"
   1200-1299    "2nd Senior Team"
   1300-1399    "Construction Committee"
   1400-1499    "Training Organization"

2000-2999    All Groups of Rochefort
   2000-2099    "Rochefort"
   2100-2199    "Parents of Rochefort"
   2200-2299    "Sports in Rochefort"

3000-3099    All Groups of Marin Quarter
   3000-3099    "Marin Quarter"
   3100-3199    "House 13"
   3200-3299    "Handcrafts"
   3300-3399    "Shared Dinner"
   3400-3499    rest of the Houses: "House 1", "House 2", "House 11", "House 12", "House 21", "House 22", "House 23"
   3500-3599    "Board"
   3600-3699    "Childcare"
   3700-3799    "Building"
   3800-3899    "Garden"

Note:
1. IDs are unique within each group/subgroup, but can be reused across different entity types.
   For example, in "Park Club", ID 1001 could be both a message ID and a member ID.
2. Always include a member with Name: "You" and ID: 1 in each group where the user is a member. The character description is this: "32, Political activist: welcoming, collaborative and empathetic, but assertive, concerned and strict."
3. To use "Your" Name as saved in NameContext.tsx, type "USER" and it's going to be exchanged later. Never use USER inside number input such as "supportedBy" and "createdBy" fields.
4. Never mention, that "You" is a political activist. Always use they/them as You's pronoun.
5. Always keep the same order of typescript types as defined in "interfaces.ts" file.
6. Members always keep the same ID, even when they are in multiple groups or subgroups.
7. Member's Names can be from any culture, but are mostly from european countries, and not so much from the US. Don't add ethnic background to the members, just use different names.
*/

/*
Necessary inside the "options" for each module: (unnecessary ones are left empty, but need to be added nonetheless)
- Ideation and Brainstorming: Everything except for rank. Rank=0
- Estimate: Everything except for rank, supportedBy, createdBy, CreatedAt
- Prioritize: Everything except for createdBy, CreatedAt, Rank is the total percentage from 1-100 and supportedBy means "this member gave this option the highest rank"
- Vote: Everything except for createdBy, CreatedAt, Rank is the total votes from all users and supportedBy means "this member voted for this option"
- Announcement: only one option with: ID, description, createdAt, content and comments. module's dueAt, description and content are left blank.
- External decision: everything except for createdAt, createdAy, supportedBy
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
      isPublic: subgroupData.public,
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
    isPublic: isPublic,
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
      "House 1",
      "House 2",
      "House 11",
      "House 12",
      "House 13",
      "House 21",
      "House 22",
      "House 23",
      "Handcrafts",
      "Shared Dinner",
      "Board",
      "Childcare",
      "Building",
      "Garden"
    ])
  ]);
};