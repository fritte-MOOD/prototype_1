import { Member, Chat, Task, Appointment, Process } from '../interfaces';

export const members: Member[] = [
  { name: "Alice Johnson", commonGroups: ["Rochefort", "Parents of Rochefort"] },
  { name: "Bob Smith", commonGroups: ["Rochefort", "Sports in Rochefort"] },
  { name: "Carol Davis", commonGroups: ["Rochefort"] },
  { name: "David Brown", commonGroups: ["Rochefort", "Parents of Rochefort", "Sports in Rochefort"] },
];

export const chats: Chat[] = [
  {
    id: 1,
    new: true,
    members: [{ name: "Alice Johnson", commonGroups: ["Rochefort", "Parents of Rochefort"] }],
    messages: [
      { sentBy: "Alice Johnson", time: "10:00", distance: 0, content: "Hello everyone! Any updates on the town festival?" },
      { sentBy: "You", time: "10:05", distance: 0, content: "Hi Alice! The festival committee is meeting tomorrow to finalize details." },
    ]
  },
  {
    id: 2,
    new: false,
    members: [{ name: "Bob Smith", commonGroups: ["Rochefort", "Sports in Rochefort"] }],
    messages: [
      { sentBy: "Bob Smith", time: "14:30", distance: 0, content: "Don't forget about the community sports day next week!" },
      { sentBy: "You", time: "14:35", distance: 0, content: "Thanks for the reminder, Bob. I'll be there!" },
    ]
  },
];

export const tasks: Task[] = [
  { id: 1, done: false, description: "Prepare report for town council meeting", assignedBy: "Carol Davis", time: "15:00", distance: 2 },
  { id: 2, done: true, description: "Organize volunteers for community garden", assignedBy: "David Brown", time: "09:00", distance: 1 },
];

export const appointments: Appointment[] = [
  { id: 1, description: "Town Council Meeting", time: "19:00", distance: 3, acceptedBy: ["You", "Carol Davis"], declinedBy: [] },
  { id: 2, description: "Community Sports Day", time: "10:00", distance: 5, acceptedBy: ["You", "Bob Smith"], declinedBy: ["Alice Johnson"] },
];

export const processes: Process[] = [

];
