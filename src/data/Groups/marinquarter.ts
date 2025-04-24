
// Storyline:
//   Marin Quarter:
//   You are living in a chilled community with families, youngsters, students, adults and elders.
//   There are 7 houses, a communal area with a kitchen, a communal workshop for wood, bike repairs and metalworks and a Van, that everyone can use.
//   The decisionmaking is done by the board, which consists of one person from each house plus three executive members. so the platform is being used to let tenants participate and deliberate about decisions, and organize events, make reservations for the van or the workshop.
//
//
//   Subgroups:
// House 1: Students, in total 7. mostly young men studying mechanics or engineering, mathematics, physics etc. They like to have parties from time to time and dont have a lot of money. They love to use the workshop, but not so much the communal kitchen. They also have small businesses for goods that they produce in the workshop.
//   House 2: Also students, mixed with languages, philosophy, law, social science. 12 tenants in total. They keep it calm an like social gatherings
// House 11: two families share this house: 4 adults, 5 children and one elder person
// House 12: three families share this house: 6 adults and 5 children
// House 13: your house. you live with employed adults, some are couples, some with kids, some are singles. In total,17 people live in the house.
//   House 21: mostly employed adults, one single mother with a baby. in total 15
// House 22: similar to house 21
// House 23: only elders. Caretakers come daily, but some tenants also help in the house.
//   You are a Member of: House 13, handcrafts and shared dinner
//
//   Childcare: some of each house, topics are: guidelines for the discipline of kids in common spaces, birthday parties, shared childcare, doing their homework together on the afternoons, going to the park together etc...
//   Handcrafts: some of each house: make reservation for the workshop, buying new material, helping each other with machines and skills. Organization: one gets elected as the boss (currently Elisa Moretti) and makes the rules.
//   Shared Dinner: once a month there is a shared dinner and everyone who wants to parttake can be in this group and here its organized, who brings what.
//   Board: consists of on representative of each house, that get elected inside the houses subgroup and 3 executive members, that get elected by the whole Main group. They take care of communal money and how to spend it. They decide next steps in building and how the maintenance is done. They also publish policies and penaltys for everyone.
//   Building: planing and executing the boards decisions for contructions
//   Garden: free to decide how to use and form the green areas. anyone with or without ideas can come into this group and share the work.
//
//
//   Processes:
// 1. Are we allowed to throw parties in the communal area? Modules: Debate (yes/no), Ideation (of new rules), Priorization (of the ideas from Ideation) 4. Announcement (result from meeting)
// People are discussing, what counts as a party. House 2 wants to still have their gatherings and gamenights there, and most of the others agree.
//   in the end, the decision is, that parties are not allowed anymore.
//
// 2. budgeting
//
// 3. parking
//
// 4. pet policies
//
// 5. General Policies
//
// 6. misbehaviour of "name". Someone did not follow the rules and gets thrown out of the community during this process.



import { Member, Chat, Task, Appointment, Process } from '../interfaces';

export const members: Member[] = [
  { id: 1, name: "You" }, // Your character: 32, Political activist, welcoming, collaborative and empathetic, but assertive, concerned and strict.

  //House 13
  { id: 3101, name: "Sophie Dubois" }, // 28, nurse, single, loves yoga and reading
  { id: 3102, name: "Markus Schmidt" }, // 35, teacher, married to Lena (3103), has a 5-year-old son
  { id: 3103, name: "Lena Schmidt" }, // 33, graphic designer, married to Markus (3102), passionate about art
  { id: 3104, name: "Giovanni Rossi" }, // 40, accountant, divorced, enjoys playing guitar
  { id: 3105, name: "Elin Andersson" }, // 29, marketing manager, single, fitness enthusiast
  { id: 3106, name: "Nikolai Ivanov" }, // 37, architect, married, has twins (age 3)
  { id: 3107, name: "Isabel Fernández" }, // 31, veterinarian, single, volunteers at animal shelters
  { id: 3108, name: "Mateo Kovač" }, // 26, grad student in environmental science, passionate about sustainability
  { id: 3109, name: "Amelia Nowak" }, // 34, freelance writer, single mom with a 7-year-old daughter
  { id: 3110, name: "Lukas Peeters" }, // 39, IT consultant, married to Olivia (3111), loves board games
  { id: 3111, name: "Olivia Peeters" }, // 36, psychologist, married to Lukas (3110), practices meditation
  { id: 3112, name: "Andreas Papadopoulos" }, // 30, chef, single, organizes community dinners
  { id: 3113, name: "Emilia Virtanen" }, // 27, elementary school teacher, engaged, enjoys painting
  { id: 3114, name: "Henri Lefebvre" }, // 42, lawyer, divorced with two teenagers, cycling enthusiast
  { id: 3115, name: "Catalina Popescu" }, // 32, social worker, single, active in community outreach
  { id: 3116, name: "Willem van der Meer" }, // 45, small business owner, married, has a 10-year-old son, amateur photographer

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
  { id: 3409, name: "Lukas Novak" }, // 22, Philosophy major, always ready for deep discussions, yoga enthusiast
  { id: 3410, name: "Sofia Garcia" }, // 24, Law student, passionate about human rights, volunteers at legal aid clinic
  { id: 3411, name: "Oliver Schmidt" }, // 21, Sociology freshman, interested in urban cultures, amateur DJ
  { id: 3412, name: "Zoe Anderson" }, // 25, Psychology graduate student, mindfulness practitioner, peer counselor
  { id: 3413, name: "Matteo Bianchi" }, // 23, Political science student, active in student government, loves debate
  { id: 3414, name: "Nadia Petrov" }, // 22, Linguistics major, polyglot, organizes language exchange meetups
  { id: 3415, name: "Thomas Jansen" }, // 24, Anthropology student, passionate about indigenous cultures, documentary filmmaker
  { id: 3416, name: "Yuki Tanaka" }, // 21, International relations student, model UN participant, tea ceremony enthusiast
  { id: 3417, name: "Lena Kowalski" }, // 23, Gender studies major, activist for LGBTQ+ rights, runs a feminist book club
  { id: 3418, name: "Hassan Al-Farsi" }, // 25, Middle Eastern studies graduate student, calligraphy artist, organizes cultural events
  { id: 3419, name: "Chloe Bennett" }, // 22, Environmental ethics student, zero-waste lifestyle advocate, community garden volunteer

  //House 11
  { id: 3420, name: "Martin Eriksen" }, // 38, IT consultant, father of three, enjoys cooking for the whole house
  { id: 3421, name: "Astrid Eriksen" }, // 36, Pediatrician, mother of three, organizes family game nights
  { id: 3422, name: "Liam Eriksen" }, // 12, Eldest Eriksen child, passionate about science experiments
  { id: 3423, name: "Sophia Eriksen" }, // 9, Middle Eriksen child, aspiring artist, loves painting
  { id: 3424, name: "Oscar Eriksen" }, // 6, Youngest Eriksen child, energetic and always curious
  { id: 3425, name: "Elena Rossi" }, // 41, University professor, single mother of two, yoga enthusiast
  { id: 3426, name: "Marco Rossi" }, // 14, Eldest Rossi child, talented musician, plays guitar in a local youth band
  { id: 3427, name: "Giulia Rossi" }, // 11, Youngest Rossi child, bookworm, dreams of becoming a writer
  { id: 3428, name: "Isabella Rossi" }, // 72, Elena's mother, retired teacher, loves gardening and storytelling

  //House 12
  { id: 3429, name: "Clara Bergmann" }, // 29, Environmental scientist, passionate about sustainable living
  { id: 3430, name: "Finn Larsson" }, // 34, Architect specializing in eco-friendly design, avid rock climber
  { id: 3431, name: "Amelia Nowak" }, // 31, Freelance graphic designer, organizes community art projects
  { id: 3432, name: "Hugo Dubois" }, // 27, Chef at a local vegetarian restaurant, loves experimenting with urban gardening
  { id: 3433, name: "Zoe Chen" }, // 33, Software engineer working remotely, yoga instructor in her free time
  { id: 3434, name: "Luca Rossi" }, // 30, Journalist focusing on social issues, amateur photographer
  { id: 3435, name: "Emilia Kowalski" }, // 28, Primary school teacher, volunteers at the local animal shelter
  { id: 3436, name: "Mateo Santos" }, // 35, Social worker specializing in youth programs, passionate about community building

  //House 13 in the ID's 3100-3199

  //House 21
  { id: 3437, name: "Olivia Andersson" }, // 32, Marketing executive, single mother with a 1-year-old baby
  { id: 3438, name: "Erik Svensson" }, // 41, Software engineer, married, enjoys weekend hiking
  { id: 3439, name: "Maria Svensson" }, // 39, High school teacher, married to Erik, passionate about literature
  { id: 3440, name: "Lukas Novotny" }, // 35, Freelance photographer, single, travels frequently for work
  { id: 3441, name: "Sophie Dubois" }, // 29, Nurse at the local hospital, volunteers at community health clinics
  { id: 3442, name: "Markus Weber" }, // 45, University professor, divorced, active in local politics
  { id: 3443, name: "Elena Rossi" }, // 33, Architect, newly married, passionate about sustainable urban planning
  { id: 3444, name: "Thomas Jansen" }, // 37, Financial analyst, single, amateur chef who loves hosting dinner parties
  { id: 3445, name: "Ava Kowalski" }, // 31, Environmental lawyer, engaged, organizes community clean-up events
  { id: 3446, name: "Nikolai Petrov" }, // 40, Physiotherapist, married with two children, coaches a youth soccer team
  { id: 3447, name: "Ingrid Larsson" }, // 36, Psychologist, single, practices mindfulness and leads meditation groups
  { id: 3448, name: "Carlos Fernandez" }, // 34, Graphic designer, married, passionate about urban sketching
  { id: 3449, name: "Lena Schmidt" }, // 38, Human resources manager, divorced with a teenage son, yoga enthusiast
  { id: 3450, name: "Matteo Bianchi" }, // 42, Restaurant owner, married, organizes community food festivals
  { id: 3451, name: "Sophia Chen" }, // 30, Data scientist, single, volunteers teaching coding to underprivileged youth

  //House 22
  { id: 3452, name: "Viktor Pettersson" }, // 36, Civil engineer, married, passionate about urban development
  { id: 3453, name: "Nora Lindholm" }, // 31, Pediatric nurse, single, volunteers at children's hospitals
  { id: 3454, name: "Adrian Kovacs" }, // 40, University lecturer in economics, divorced, avid chess player
  { id: 3455, name: "Camille Laurent" }, // 28, Environmental consultant, engaged, organizes local sustainability workshops
  { id: 3456, name: "Tobias Hoffmann" }, // 33, Startup founder, married with a toddler, tech enthusiast
  { id: 3457, name: "Elisa Moretti" }, // 37, Art gallery curator, single, passionate about promoting local artists
  { id: 3458, name: "Magnus Olsen" }, // 42, High school principal, married with two teenagers, community leader
  { id: 3459, name: "Yara Al-Rashid" }, // 29, Pharmacist, newly married, enjoys cooking Middle Eastern cuisine
  { id: 3460, name: "Florian Weber" }, // 35, Renewable energy engineer, single, avid cyclist and environmentalist
  { id: 3461, name: "Anastasia Kuznetsova" }, // 32, Ballet dancer and instructor, single, organizes community dance events
  { id: 3462, name: "Rafael Santos" }, // 39, Corporate lawyer, married, wine enthusiast and amateur sommelier
  { id: 3463, name: "Linnea Bergström" }, // 34, Veterinarian, divorced with a young daughter, animal rights activist
  { id: 3464, name: "Dimitri Antonopoulos" }, // 41, Restaurant owner, married, passionate about Mediterranean cuisine
  { id: 3465, name: "Freya Nielsen" }, // 30, Journalist, single, focuses on investigative reporting on social issues
  { id: 3466, name: "Tomas Novák" }, // 38, Architect, married with twins, specializes in sustainable building design

  //House 23
  { id: 3467, name: "Helga Müller" }, // 78, Retired schoolteacher, organizes book club for the house
  { id: 3468, name: "Gunnar Svensson" }, // 82, Former engineer, still tinkers with small inventions
  { id: 3469, name: "Margherita Rossi" }, // 75, Retired chef, loves to cook for her housemates
  { id: 3470, name: "Bernard Dupont" }, // 80, Retired diplomat, fluent in five languages
  { id: 3471, name: "Ingrid Larsen" }, // 73, Former librarian, maintains the house's mini-library
  { id: 3472, name: "Klaus Weber" }, // 85, Retired doctor, offers health advice to his neighbors
  { id: 3473, name: "Elsa Johansson" }, // 79, Former artist, teaches painting to interested housemates
  { id: 3474, name: "Yuri Popov" }, // 76, Retired musician, organizes weekly classical music evenings
  { id: 3475, name: "Annika Bergman" }, // 72, Former social worker, coordinates volunteer activities
  { id: 3476, name: "Giovanni Marino" }, // 81, Retired tailor, still does alterations for his housemates
  { id: 3477, name: "Beatrice Lefèvre" }, // 77, Former botanist, maintains a beautiful balcony garden
  { id: 3478, name: "Hans Schröder" }, // 83, Retired history professor, gives lectures on European history
  { id: 3479, name: "Ester Lindström" }, // 74, Former nurse, helps organize health check-ups for the house
  { id: 3480, name: "Piotr Kowalski" }, // 79, Retired carpenter, helps with small repairs around the house
  { id: 3481, name: "Marianne Nielsen" }, // 76, Former travel agent, organizes virtual travel nights
];