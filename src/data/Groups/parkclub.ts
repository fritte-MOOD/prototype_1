import { Member, Chat, Task, Appointment } from '../interfaces';

// Helper function to generate random dates within the next 30 days
const randomFutureDate = () => {
  const now = new Date();
  const futureDate = new Date(now.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000);
  return `${futureDate.getHours().toString().padStart(2, '0')}:${futureDate.getMinutes().toString().padStart(2, '0')}`;
};

// Helper function to generate random distance in days (0-30)
const randomDistance = () => Math.floor(Math.random() * 31);

// Generate 53 members
export const members: Member[] = Array.from({ length: 53 }, (_, i) => ({
  name: `Member ${i + 1}`,
  commonGroups: ["Marin Quarter", ...(Math.random() < 0.5 ? ["House 24"] : []), ...(Math.random() < 0.5 ? ["Handcrafts Friday"] : []), ...(Math.random() < 0.5 ? ["Shared Dinner"] : [])]
}));

// Generate 20 chats
export const chats: Chat[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  new: Math.random() < 0.3,
  members: [members[Math.floor(Math.random() * members.length)]],
  messages: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, (_, j) => ({
    sentBy: Math.random() < 0.5 ? "You" : members[Math.floor(Math.random() * members.length)].name,
    time: randomFutureDate(),
    distance: randomDistance(),
    content: `Message ${j + 1} content`
  }))
}));

// Generate 15 tasks
export const tasks: Task[] = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  done: Math.random() < 0.3,
  description: `Task ${i + 1} description`,
  assignedBy: members[Math.floor(Math.random() * members.length)].name,
  time: randomFutureDate(),
  distance: randomDistance()
}));

// Generate 10 appointments
export const appointments: Appointment[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  description: `Appointment ${i + 1} description`,
  time: randomFutureDate(),
  distance: randomDistance(),
  acceptedBy: members.filter(() => Math.random() < 0.6).map(member => member.name),
  declinedBy: members.filter(() => Math.random() < 0.2).map(member => member.name)
}));
