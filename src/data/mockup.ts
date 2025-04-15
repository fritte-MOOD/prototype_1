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

interface Group {
  name: string;
  IAmMember: boolean;
  subgroups: Group[];
  members: Member[];
  chats: Chat[];
}







export const mockData: Group[] = [
  {
    name: "Park Club",
    IAmMember: true,
    subgroups: [
      {
        name: "Executive Committee",
        IAmMember: true,
        subgroups: [],
        members: [],
        chats: []
      },
      {
        name: "2nd Senior Team",
        IAmMember: true,
        subgroups: [],
        members: [],
        chats: []
      },
      {
        name: "Construction Committee",
        IAmMember: true,
        subgroups: [],
        members: [],
        chats: []
      },
      {
        name: "Training Organization",
        IAmMember: true,
        subgroups: [],
        members: [],
        chats: []
      },
      {
        name: "Youth Team",
        IAmMember: false,
        subgroups: [],
        members: [],
        chats: []
      },
      {
        name: "The Elders",
        IAmMember: false,
        subgroups: [],
        members: [],
        chats: []
      },
      {
        name: "Coaches",
        IAmMember: false,
        subgroups: [],
        members: [],
        chats: []
      },
      {
        name: "Just-For-Fun Crew",
        IAmMember: false,
        subgroups: [],
        members: [],
        chats: []
      },      {
        name: "Woodworking Workshop",
        IAmMember: false,
        subgroups: [],
        members: [],
        chats: []
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

]
  },
  {
    name: "Rochefort",
    IAmMember: true,
    subgroups: [
      {
        name: "Parents of Rochefort",
        IAmMember: true,
        subgroups: [],
        members: [],
        chats: []
      },
      {
        name: "Sports in Rochefort",
        IAmMember: true,
        subgroups: [],
        members: [],
        chats: []
      },
      {
        name: "Councilmembers",
        IAmMember: false,
        subgroups: [],
        members: [],
        chats: []
      },
      {
        name: "Gastronomy",
        IAmMember: false,
        subgroups: [],
        members: [],
        chats: []
      },
      {
        name: "Communal Gardening",
        IAmMember: false,
        subgroups: [],
        members: [],
        chats: []
      },
      {
        name: "Eldercare",
        IAmMember: false,
        subgroups: [],
        members: [],
        chats: []
      },
      {
        name: "Inclusion",
        IAmMember: false,
        subgroups: [],
        members: [],
        chats: []
      },
      {
        name: "RF Commercial Interests",
        IAmMember: false,
        subgroups: [],
        members: [],
        chats: []
      },
    ],
    members: [],
    chats: []
  },
  {
    name: "Marin Quarter",
    IAmMember: true,
    subgroups: [
      {
        name: "House 24",
        IAmMember: true,
        subgroups: [],
        members: [],
        chats: []
      },
      {
        name: "Handcrafts Friday",
        IAmMember: true,
        subgroups: [],
        members: [],
        chats: []
      },
      {
        name: "Shared Dinner",
        IAmMember: true,
        subgroups: [],
        members: [],
        chats: []
      },
      {
        name: "Elder Meetings",
        IAmMember: false,
        subgroups: [],
        members: [],
        chats: []
      },
      {
        name: "Garden Crew",
        IAmMember: false,
        subgroups: [],
        members: [],
        chats: []
      },
      {
        name: "Tools and Equipment",
        IAmMember: false,
        subgroups: [],
        members: [],
        chats: []
      },
      {
        name: "House 1",
        IAmMember: false,
        subgroups: [],
        members: [],
        chats: []
      },
      {
        name: "House 2",
        IAmMember: false,
        subgroups: [],
        members: [],
        chats: []
      },
      {
        name: "House 3",
        IAmMember: false,
        subgroups: [],
        members: [],
        chats: []
      },
      {
        name: "House 10",
        IAmMember: false,
        subgroups: [],
        members: [],
        chats: []
      },
      {
        name: "House 11",
        IAmMember: false,
        subgroups: [],
        members: [],
        chats: []
      },
      {
        name: "House 12",
        IAmMember: false,
        subgroups: [],
        members: [],
        chats: []
      },
      {
        name: "House 20",
        IAmMember: false,
        subgroups: [],
        members: [],
        chats: []
      },
      {
        name: "House 21",
        IAmMember: false,
        subgroups: [],
        members: [],
        chats: []
      },
      {
        name: "House 22",
        IAmMember: false,
        subgroups: [],
        members: [],
        chats: []
      },
      {
        name: "House 23",
        IAmMember: false,
        subgroups: [],
        members: [],
        chats: []
      },

    ],
    members: [],
    chats: []
  }
];