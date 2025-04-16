import { Member, Chat, Task, Appointment } from '../interfaces';

export const members: Member[] = [
  { name: "Alice Johnson", commonGroups: ["Marin Quarter", "House 24"] },
  { name: "Bob Smith", commonGroups: ["Marin Quarter", "Handcrafts Friday"] },
  { name: "Carol White", commonGroups: ["Marin Quarter", "Shared Dinner"] },
  { name: "David Brown", commonGroups: ["Marin Quarter", "House 24", "Shared Dinner"] },
];

export const chats: Chat[] = [
  {
    id: 1,
    new: true,
    members: [{ name: "Alice Johnson", commonGroups: ["Marin Quarter", "House 24"] }],
    messages: [
      { sentBy: "Alice Johnson", time: "10:00", distance: 0, content: "Hello everyone! Reminder about our community meeting tomorrow." },
      { sentBy: "You", time: "10:05", distance: 0, content: "Thanks for the reminder, Alice. I'll be there." },
    ],
  },
  {
    id: 2,
    new: false,
    members: [{ name: "Bob Smith", commonGroups: ["Marin Quarter", "Handcrafts Friday"] }],
    messages: [
      { sentBy: "Bob Smith", time: "14:30", distance: 1, content: "Don't forget to bring your crafting supplies for Friday!" },
      { sentBy: "You", time: "14:35", distance: 1, content: "Got it, thanks Bob. See you then." },
    ],
  },
];

export const tasks: Task[] = [
  { id: 1, done: false, description: "Prepare agenda for Marin Quarter monthly meeting", assignedBy: "Carol White", time: "09:00", distance: 2 },
  { id: 2, done: true, description: "Buy supplies for community garden", assignedBy: "David Brown", time: "11:00", distance: 1 },
  { id: 3, done: false, description: "Coordinate with House 24 for upcoming event", assignedBy: "Alice Johnson", time: "15:00", distance: 3 },
];

export const appointments: Appointment[] = [
  { id: 1, description: "Marin Quarter Monthly Meeting", time: "19:00", distance: 2, acceptedBy: ["You", "Alice Johnson", "Bob Smith"], declinedBy: ["Carol White"] },
  { id: 2, description: "Handcrafts Friday Session", time: "18:00", distance: 3, acceptedBy: ["You", "Bob Smith"], declinedBy: [] },
  { id: 3, description: "Shared Dinner", time: "20:00", distance: 5, acceptedBy: ["You", "Carol White", "David Brown"], declinedBy: ["Alice Johnson"] },
];