import { Member, Chat, Task, Appointment, Process } from '../../interfaces';

export const members: Member[] = [
  { id: 1, name: "You" }, // Your character: 32, Political activist, welcoming, collaborative and empathetic, but assertive, concerned and strict.

  //House 1
  { id: 3401, name: "Alex Chen" }, // 22, Engineering student, loves tinkering with electronics, organizes house parties
  { id: 3402, name: "Dmitri Volkov" }, // 24, Physics PhD student, quiet but brilliant, enjoys stargazing
  { id: 3403, name: "Marco Rossi" }, // 21, Mechanical engineering student, passionate about motorcycles, runs a small repair business
  { id: 3404, name: "Jamal Ahmed" }, // 23, Mathematics student, chess enthusiast, tutors part-time
  { id: 3405, name: "Felix Müller" }, // 20, Computer science freshman, gamer, developing an indie game in his spare time
  { id: 3406, name: "Sven Eriksson" }, // 25, Engineering graduate student, eco-conscious, leads recycling initiatives in the house
  { id: 3407, name: "Liam O'Connor" }, // 22, Robotics student, always working on a new invention, slightly absent-minded

  //House 2
  { id: 3408, name: "Emma Dubois" }, // 23, French literature student, organizes poetry nights, loves cooking
  { id: 3414, name: "Nadia Petrov" }, // 22, Linguistics major, polyglot, organizes language exchange meetups

  //House 11
  { id: 3423, name: "Sophia Eriksen" }, // 9, Middle Eriksen child, aspiring artist, loves painting

  //House 12
  { id: 3431, name: "Amelia Nowak" }, // 31, Freelance graphic designer, organizes community art projects
  { id: 3432, name: "Hugo Dubois" }, // 27, Chef at a local vegetarian restaurant, loves experimenting with urban gardening

  //House 13
  { id: 3103, name: "Lena Schmidt" }, // 33, graphic designer, married to Markus (3102), passionate about art
  { id: 3106, name: "Nikolai Ivanov" }, // 37, architect, married, has twins (age 3)
  { id: 3112, name: "Andreas Papadopoulos" }, // 30, chef, single, organizes community dinners

  //House 21
  { id: 3440, name: "Lukas Novotny" }, // 35, Freelance photographer, single, travels frequently for work
  { id: 3448, name: "Carlos Fernandez" }, // 34, Graphic designer, married, passionate about urban sketching

  //House 22
  { id: 3457, name: "Elisa Moretti" }, // 37, Art gallery curator, single, passionate about promoting local artists
  { id: 3463, name: "Linnea Bergström" }, // 34, Veterinarian, divorced with a young daughter, animal rights activist

  //House 23
  { id: 3473, name: "Elsa Johansson" }, // 79, Former artist, teaches painting to interested housemates
  { id: 3476, name: "Giovanni Marino" }, // 81, Retired tailor, still does alterations for his housemates
  { id: 3480, name: "Piotr Kowalski" }, // 79, Retired carpenter, helps with small repairs around the house
];

export const chats: Chat[] = [];
export const tasks: Task[] = [];
export const appointments: Appointment[] = [];
export const processes: Process[] = [];
export const IAmMember = true;
export const isPublic = true;