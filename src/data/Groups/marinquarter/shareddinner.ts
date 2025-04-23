import { Member, Chat, Task, Appointment, Process } from '../../interfaces';

export const members: Member[] = [
  { id: 1, name: "You" }, // Your character: 32, Political activist, welcoming, collaborative and empathetic, but assertive, concerned and strict.

  //House 1
  { id: 3401, name: "Alex Chen" }, // 22, Engineering student, loves tinkering with electronics, organizes house parties
  { id: 3403, name: "Marco Rossi" }, // 21, Mechanical engineering student, passionate about motorcycles, runs a small repair business

  //House 2
  { id: 3408, name: "Emma Dubois" }, // 23, French literature student, organizes poetry nights, loves cooking
  { id: 3411, name: "Oliver Schmidt" }, // 21, Sociology freshman, interested in urban cultures, amateur DJ
  { id: 3419, name: "Chloe Bennett" }, // 22, Environmental ethics student, zero-waste lifestyle advocate, community garden volunteer

  //House 11
  { id: 3420, name: "Martin Eriksen" }, // 38, IT consultant, father of three, enjoys cooking for the whole house
  { id: 3421, name: "Astrid Eriksen" }, // 36, Pediatrician, mother of three, organizes family game nights
  { id: 3428, name: "Isabella Rossi" }, // 72, Elena's mother, retired teacher, loves gardening and storytelling

  //House 12
  { id: 3429, name: "Clara Bergmann" }, // 29, Environmental scientist, passionate about sustainable living
  { id: 3432, name: "Hugo Dubois" }, // 27, Chef at a local vegetarian restaurant, loves experimenting with urban gardening
  { id: 3436, name: "Mateo Santos" }, // 35, Social worker specializing in youth programs, passionate about community building

  //House 13
  { id: 3101, name: "Sophie Dubois" }, // 28, nurse, single, loves yoga and reading
  { id: 3112, name: "Andreas Papadopoulos" }, // 30, chef, single, organizes community dinners
  { id: 3115, name: "Catalina Popescu" }, // 32, social worker, single, active in community outreach

  //House 21
  { id: 3437, name: "Olivia Andersson" }, // 32, Marketing executive, single mother with a 1-year-old baby
  { id: 3444, name: "Thomas Jansen" }, // 37, Financial analyst, single, amateur chef who loves hosting dinner parties
  { id: 3450, name: "Matteo Bianchi" }, // 42, Restaurant owner, married, organizes community food festivals

  //House 22
  { id: 3459, name: "Yara Al-Rashid" }, // 29, Pharmacist, newly married, enjoys cooking Middle Eastern cuisine
  { id: 3464, name: "Dimitri Antonopoulos" }, // 41, Restaurant owner, married, passionate about Mediterranean cuisine

  //House 23
  { id: 3469, name: "Margherita Rossi" }, // 75, Retired chef, loves to cook for her housemates
  { id: 3475, name: "Annika Bergman" }, // 72, Former social worker, coordinates volunteer activities
  { id: 3477, name: "Beatrice Lefèvre" }, // 77, Former botanist, maintains a beautiful balcony garden
];

export const chats: Chat[] = [];
export const tasks: Task[] = [];
export const appointments: Appointment[] = [];
export const processes: Process[] = [];

export const IAmMember = true;
export const isPublic = true;