interface Message {
  sentBy: string;
  time: string;
  distance: number;
  content: string;
}

interface Chat {
  id: number;
  new: boolean;
  members: Member[];
  messages: Message[];
}

interface Member {
  name: string;
  commonGroups: string[];
}

interface Task {
  id: number;
  description: string;
  assignedBy: string;
  time: string;
  distance: number;
}

interface Appointment {
  id: number;
  description: string;
  time: string;
  distance: number;
  acceptedBy: string[];
  declinedBy: string[];
}

interface BaseModule {
  id: number;
  type: string;
  description: string;
  deadline: string;
}

interface DiscussionModule extends BaseModule {
  type: 'Discussion';
  arguments: string[];
}

interface VotingModule extends BaseModule {
  type: 'Voting';
  options: string[];
}

interface FeedbackModule extends BaseModule {
  type: 'Feedback';
  questions: string[];
}

type Module = DiscussionModule | VotingModule | FeedbackModule;

interface Process {
  description: string;
  creator: string;
  creationDate: string;
  deadline: string;
  active: boolean;
  modules: Module[];
}

interface Group {
  name: string;
  IAmMember: boolean;
  subgroups: Group[];
  members: Member[];
  processes: Process[];
  chats: Chat[];
  tasks: Task[];
  appointments: Appointment[];
}

export const mockData: Group[] = [
  {name: "Park Club",
    IAmMember: true,
    subgroups: [
      {name: "Executive Committee",
        IAmMember: true,
        subgroups: [],
        members: [],
        processes: [],
        chats: [],
        tasks: [],
        appointments: []
      },
      {name: "2nd Senior Team",
        IAmMember: true,
        subgroups: [],
        members: [],
        processes: [],
        chats: [],
        tasks: [],
        appointments: []
      },
      {name: "Construction Committee",
        IAmMember: true,
        subgroups: [],
        members: [],
        processes: [],
        chats: [],
        tasks: [],
        appointments: []
      },
      {name: "Training Organization",
        IAmMember: true,
        subgroups: [],
        members: [],
        processes: [],
        chats: [],
        tasks: [],
        appointments: []
      },
      {name: "Youth Team",
        IAmMember: false,
        subgroups: [],
        members: [],
        processes: [],
        chats: [],
        tasks: [],
        appointments: []
      },
      {name: "Masters of Disaster",
        IAmMember: false,
        subgroups: [],
        members: [],
        processes: [],
        chats: [],
        tasks: [],
        appointments: []
      },
      {name: "Coaches",
        IAmMember: false,
        subgroups: [],
        members: [],
        processes: [],
        chats: [],
        tasks: [],
        appointments: []
      },
      {name: "Just-For-Fun Crew",
        IAmMember: false,
        subgroups: [],
        members: [],
        processes: [],
        chats: [],
        tasks: [],
        appointments: []
      },
      {name: "Woodworking Workshop",
        IAmMember: false,
        subgroups: [],
        members: [],
        processes: [],
        chats: [],
        tasks: [],
        appointments: []
      },
    ],
    members: [
      {
        name: "You",
        commonGroups: []
      },
      {
        name: "Jane Smith",
        commonGroups: ["Park Club", "Executive Committee"]
      },
      {
        name: "Mike Johnson",
        commonGroups: ["Park Club", "2nd Senior Team"]
      }
    ],
    processes: [],
    chats: [
      {
        id: 1000,
        new: true,
        members: [
          { name: "Jane Smith", commonGroups: ["Park Club", "Executive Committee"] },
          { name: "Mike Johnson", commonGroups: ["Park Club", "2nd Senior Team"] }
        ],
        messages: [
          { sentBy: "You", time:"17:20", distance: -5, content: "Hello everyone! When is our next meeting?" },
          { sentBy: "Jane Smith", time:"18:20", distance: -5, content: "Hi John, it's scheduled for next Tuesday at 3 PM." },
          { sentBy: "Mike Johnson", time:"19:20", distance: -5, content: "Great, thanks for the info!" }
        ]
      }
    ],
    tasks: [],
    appointments: [
      {id: 1,
        description: "Annual General Meeting",
        time: "19:00",
        distance: 14,
        acceptedBy: ["You", "Jane Smith", "Mike Johnson"],
        declinedBy: []
      },
      {id: 2,
        description: "Summer BBQ Party",
        time: "15:00",
        distance: 30,
        acceptedBy: ["You", "Mike Johnson"],
        declinedBy: ["Jane Smith"]
      },
      {id: 3,
        description: "Club Maintenance Day",
        time: "09:00",
        distance: 7,
        acceptedBy: ["Jane Smith"],
        declinedBy: ["You", "Mike Johnson"]
      }
    ]
  },
  {name: "Rochefort",
    IAmMember: true,
    subgroups: [
      {name: "Parents of Rochefort",
        IAmMember: true,
        subgroups: [],
        members: [],
        processes: [],
        chats: [],
        tasks: [],
        appointments: []
      },
      {name: "Sports in Rochefort",
        IAmMember: true,
        subgroups: [],
        members: [],
        processes: [],
        chats: [],
        tasks: [],
        appointments: []
      },
      {name: "Council Members",
        IAmMember: false,
        subgroups: [],
        members: [],
        processes: [],
        chats: [],
        tasks: [],
        appointments: []
      },
      {name: "Gastronomy",
        IAmMember: false,
        subgroups: [],
        members: [],
        processes: [],
        chats: [],
        tasks: [],
        appointments: []
      },
      {name: "Communal Gardening",
        IAmMember: false,
        subgroups: [],
        members: [],
        processes: [],
        chats: [],
        tasks: [],
        appointments: []
      },
      {name: "Eldercare",
        IAmMember: false,
        subgroups: [],
        members: [],
        processes: [],
        chats: [],
        tasks: [],
        appointments: []
      },
      {name: "Inclusion",
        IAmMember: false,
        subgroups: [],
        members: [],
        processes: [],
        chats: [],
        tasks: [],
        appointments: []
      },
      {name: "Lopery Lake",
        IAmMember: false,
        subgroups: [],
        members: [],
        processes: [],
        chats: [],
        tasks: [],
        appointments: []
      },
    ],
    members: [],
    processes: [],
    chats: [],
    tasks: [],
    appointments: []
  },
  {name: "Marin Quarter",
    IAmMember: true,
    subgroups: [
      {name: "House 24",
        IAmMember: true,
        subgroups: [],
        members: [],
        processes: [],
        chats: [],
        tasks: [],
        appointments: []
      },
      {name: "Handcrafts Friday",
        IAmMember: true,
        subgroups: [],
        members: [],
        processes: [],
        chats: [],
        tasks: [],
        appointments: []
      },
      {name: "Shared Dinner",
        IAmMember: true,
        subgroups: [],
        members: [],
        processes: [],
        chats: [],
        tasks: [],
        appointments: []
      },
      {name: "Elder Meetings",
        IAmMember: false,
        subgroups: [],
        members: [],
        processes: [],
        chats: [],
        tasks: [],
        appointments: []
      },
      {name: "Garden Crew",
        IAmMember: false,
        subgroups: [],
        members: [],
        processes: [],
        chats: [],
        tasks: [],
        appointments: []
      },
      {name: "Tools and Equipment",
        IAmMember: false,
        subgroups: [],
        members: [],
        processes: [],
        chats: [],
        tasks: [],
        appointments: []
      },
      {name: "House 1",
        IAmMember: false,
        subgroups: [],
        members: [],
        processes: [],
        chats: [],
        tasks: [],
        appointments: []
      },
      {name: "House 2",
        IAmMember: false,
        subgroups: [],
        members: [],
        processes: [],
        chats: [],
        tasks: [],
        appointments: []
      },
      {name: "House 3",
        IAmMember: false,
        subgroups: [],
        members: [],
        processes: [],
        chats: [],
        tasks: [],
        appointments: []
      },
      {name: "House 10",
        IAmMember: false,
        subgroups: [],
        members: [],
        processes: [],
        chats: [],
        tasks: [],
        appointments: []
      },
      {name: "House 11",
        IAmMember: false,
        subgroups: [],
        members: [],
        processes: [],
        chats: [],
        tasks: [],
        appointments: []
      },
      {name: "House 12",
        IAmMember: false,
        subgroups: [],
        members: [],
        processes: [],
        chats: [],
        tasks: [],
        appointments: []
      },
      {name: "House 20",
        IAmMember: false,
        subgroups: [],
        members: [],
        processes: [],
        chats: [],
        tasks: [],
        appointments: []
      },
      {name: "House 21",
        IAmMember: false,
        subgroups: [],
        members: [],
        processes: [],
        chats: [],
        tasks: [],
        appointments: []
      },
      {name: "House 22",
        IAmMember: false,
        subgroups: [],
        members: [],
        processes: [],
        chats: [],
        tasks: [],
        appointments: []
      },
      {name: "House 23",
        IAmMember: false,
        subgroups: [],
        members: [],
        processes: [],
        chats: [],
        tasks: [],
        appointments: []
      },
    ],
    members: [],
    processes: [],
    chats: [],
    tasks: [],
    appointments: []
  }
];