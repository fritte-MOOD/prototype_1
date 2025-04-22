import { Member, Chat, Task, Appointment, Process, Module, RelativeTime } from '../../interfaces';

export const members: Member[] = [
  { id: 1, name: "You" },
  { id: 1200, name: "Jane Smith" },
  { id: 1201, name: "Mike Johnson" },
  { id: 1202, name: "Mickey kruger" },
];

export const chats: Chat[] = [
  {
    id: 1200,
    members: [1, 1200],
    messages: [
      {
        new: false,
        at: { time: "10:30", distance: -1 },
        sentBy: 1,
        supportedBy: [],
        content: "Hey, when is our next match?"
      },
      {
        new: true,
        at: { time: "10:35", distance: -1 },
        sentBy: 1200,
        supportedBy: [],
        content: "It's this Saturday at 2 PM."
      }
    ]
  },
  {
    id: 1201,
    members: [1, 1200, 1201],
    messages: [
      {
        new: false,
        at: { time: "15:00", distance: -2 },
        sentBy: 1201,
        supportedBy: [],
        content: "Team meeting tomorrow at 6 PM."
      },
      {
        new: false,
        at: { time: "15:05", distance: -2 },
        sentBy: 1,
        supportedBy: [],
        content: "I'll be there!"
      },
      {
        new: false,
        at: { time: "15:10", distance: -2 },
        sentBy: 1200,
        supportedBy: [1],
        content: "See you all then."
      }
    ]
  }
];

export const tasks: Task[] = [
  {
    id: 1200,
    done: false,
    dueAt: { time: "18:00", distance: 2 },
    assignedBy: 1201,
    description: "Review match strategy",
    content: "Go through the new defensive formation we discussed last week."
  },
  {
    id: 1201,
    done: true,
    dueAt: { time: "12:00", distance: 0 },
    assignedBy: 1,
    description: "Submit player availability",
    content: "Send your availability for next month's matches to the coach."
  },
  {
    id: 1202,
    done: false,
    dueAt: { time: "20:00", distance: 5 },
    assignedBy: 1200,
    description: "Fitness check",
    content: "Complete the fitness assessment and submit your results."
  }
];

export const appointments: Appointment[] = [
  {
    id: 1200,
    at: { time: "14:00", distance: 3 },
    createdBy: 1201,
    invited: [1, 1200, 1201],
    accepted: [1, 1200, 1201],
    declined: [],
    description: "Match vs City Rangers",
    content: "Home game against City Rangers. Arrive at least an hour before for warm-up."
  },
  {
    id: 1201,
    at: { time: "18:00", distance: 1 },
    createdBy: 1200,
    invited: [1, 1200, 1201],
    accepted: [1, 1201],
    declined: [1200],
    description: "Team Strategy Meeting",
    content: "Discussing tactics for upcoming matches and reviewing last game's performance."
  },
  {
    id: 1202,
    at: { time: "09:00", distance: 7 },
    createdBy: 1,
    invited: [1, 1200, 1201],
    accepted: [],
    declined: [],
    description: "Morning Training Session",
    content: "Focus on improving stamina and ball control. Don't forget to bring your own water bottle."
  }
];

export const processes: Process[] = [
  {
    id: 1200,
    new: true,
    public: false,
    active: true,
    createdAt: { time: "09:00", distance: -5 },
    dueAt: { time: "18:00", distance: 90 },
    creator: 1201,
    description: "Team Performance Improvement",
    content: "A comprehensive process to enhance our team's performance over the next three months.",
    modules: [
      {
        id: 12001,
        type: 'Ideation',
        dueAt: { time: "18:00", distance: -10 },
        description: "Brainstorm defensive strategies",
        content: "Let's come up with new defensive formations and tactics.",
        Ideas: [
          {
            id: 120011,
            createdAt: { time: "10:00", distance: -4 },
            createdBy: 1200,
            content: "Implement a high-pressure defensive system",
            comments: [
              {
                id: 1200111,
                createdAt: { time: "10:30", distance: -4 },
                createdBy: 1203,
                content: "This could work well with our fast defenders.",
                comments: [
                  {
                    id: 12001111,
                    createdAt: { time: "11:00", distance: -4 },
                    createdBy: 1200,
                    content: "Agreed, but we need to improve our stamina for this.",
                    new: false,
                    supportedBy: [1202],
                    comments: [],
                  },
                ],
                new: false,
                supportedBy: [1201],
              },
              {
                id: 1200112,
                createdAt: { time: "11:15", distance: -4 },
                createdBy: 1201,
                content: "We should consider the risk of leaving spaces behind.",
                new: false,
                supportedBy: [1200, 1201],
                comments: [],
              },
            ],
            new: false,
            supportedBy: [1200, 1201],
            rank: 0,
            description: "",
          },
          {
            id: 120012,
            createdAt: { time: "12:00", distance: -4 },
            createdBy: 1201,
            content: "Adopt a zonal marking system",
            comments: [
              {
                id: 1200121,
                createdAt: { time: "12:30", distance: -4 },
                createdBy: 1202,
                content: "This could help us maintain our shape better.",
                comments: [
                  {
                    id: 12001211,
                    createdAt: { time: "13:00", distance: -4 },
                    createdBy: 1,
                    content: "We'll need to work on our communication for this to be effective.",
                    new: false,
                    supportedBy: [1200, 1201],
                    comments: [],
                  },
                ],
                new: false,
                supportedBy: [1200, 1201],
              },
            ],
            new: false,
            supportedBy: [1200, 1201],
            rank: 0,
            description: " is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
          },
          {
            id: 120013,
            createdAt: { time: "14:00", distance: -4 },
            createdBy: 1201,
            content: "Introduce a sweeper role",
            comments: [
              {
                id: 1200131,
                createdAt: { time: "14:30", distance: -4 },
                createdBy: 1,
                content: "This could provide extra cover against fast counterattacks.",
                new: false,
                supportedBy: [1200, 1201],
                comments: [],
              },
            ],
            new: false,
            supportedBy: [1200, 1201],
            rank: 0,
            description: "Description randommm",
          },
        ]
      },
      {
        id: 12002,
        type: 'Vote',
        dueAt: { time: "18:00", distance: 30 },
        description: "Select best defensive strategy",
        content: "Vote on the defensive strategy we'll implement in our next match.",
        options: []
      },
      {
        id: 12003,
        type: 'Announcement',
        dueAt: { time: "18:00", distance: 60 },
        description: "New strategy announcement",
        content: "Announce and explain the new defensive strategy to the team.",
        options: []
      },
      {
        id: 12004,
        type: 'Estimate',
        dueAt: { time: "18:00", distance: 20 },
        description: "Estimate impact of defensive strategies",
        content: "Let's estimate the potential consequences of implementing each defensive strategy.",
        Ideas: [
          {
            id: 120041,
            createdAt: { time: "15:00", distance: -3 },
            createdBy: 1200,
            content: "Implement a high-pressure defensive system",
            comments: [
              {
                id: 1200411,
                createdAt: { time: "15:30", distance: -3 },
                createdBy: 1203,
                content: "Estimated 20% increase in ball recoveries, but 15% higher risk of player fatigue.",
                new: false,
                supportedBy: [1201],
                comments: [],
              },
              {
                id: 1200412,
                createdAt: { time: "16:00", distance: -3 },
                createdBy: 1201,
                content: "Potential 30% reduction in opponent's possession time, but 25% increase in the risk of being caught out of position.",
                new: false,
                supportedBy: [1200],
                comments: [],
              },
            ],
            new: false,
            supportedBy: [1200, 1201],
            rank: 0,
            description: "Estimate the impact of implementing a high-pressure defensive system.",
          },
          {
            id: 120042,
            createdAt: { time: "16:30", distance: -3 },
            createdBy: 1201,
            content: "Adopt a zonal marking system",
            comments: [
              {
                id: 1200421,
                createdAt: { time: "17:00", distance: -3 },
                createdBy: 1202,
                content: "Estimated 25% improvement in defensive shape, but 10% increase in the risk of losing individual battles.",
                new: false,
                supportedBy: [1200],
                comments: [],
              },
              {
                id: 1200422,
                createdAt: { time: "17:30", distance: -3 },
                createdBy: 1,
                content: "Potential 15% reduction in goals conceded from set pieces, but 20% increase in the need for communication drills.",
                new: false,
                supportedBy: [1201],
                comments: [],
              },
            ],
            new: false,
            supportedBy: [1200, 1201],
            rank: 0,
            description: "Estimate the consequences of adopting a zonal marking system.",
          },
          {
            id: 120043,
            createdAt: { time: "18:00", distance: -3 },
            createdBy: 1201,
            content: "Introduce a sweeper role",
            comments: [
              {
                id: 1200431,
                createdAt: { time: "18:30", distance: -3 },
                createdBy: 1,
                content: "Estimated 30% reduction in successful counterattacks against us, but 15% decrease in our midfield presence.",
                new: false,
                supportedBy: [1200, 1201],
                comments: [],
              },
              {
                id: 1200432,
                createdAt: { time: "19:00", distance: -3 },
                createdBy: 1200,
                content: "Potential 20% improvement in defensive coverage, but 10% increase in the risk of offside traps failing.",
                new: false,
                supportedBy: [1201],
                comments: [],
              },
            ],
            new: false,
            supportedBy: [1200, 1201],
            rank: 0,
            description: "Estimate the impact of introducing a sweeper role to our defensive strategy.",
          },
        ]
      },
      {
        id: 12005,
        type: 'Prioritize',
        dueAt: { time: "18:00", distance: 40 },
        description: "Prioritize defensive strategies",
        content: "Rank the proposed defensive strategies based on their potential effectiveness and feasibility.",
        Ideas: [
          {
            id: 120051,
            createdAt: { time: "15:00", distance: -2 },
            createdBy: 1200,
            content: "Implement a high-pressure defensive system",
            comments: [],
            new: false,
            supportedBy: [1201,1,1202],
            rank: 92,
            description: "A system that focuses on pressuring opponents high up the pitch to regain possession quickly.",
          },
          {
            id: 120052,
            createdAt: { time: "15:05", distance: -2 },
            createdBy: 1201,
            content: "Adopt a zonal marking system",
            comments: [],
            new: false,
            supportedBy: [],
            rank: 19,
            description: "A defensive approach where players are responsible for specific areas rather than individual opponents.",
          },
          {
            id: 120053,
            createdAt: { time: "15:10", distance: -2 },
            createdBy: 1201,
            content: "Introduce a sweeper role",
            comments: [],
            new: false,
            supportedBy: [],
            rank: 38,
            description: "Adding a player behind the main defensive line to provide additional cover and support.",
          },
        ]
      },
    ]
  },
  {
    id: 1201,
    new: false,
    public: true,
    active: true,
    createdAt: { time: "14:00", distance: -10 },
    dueAt: { time: "20:00", distance: 120 },
    creator: 1200,
    description: "Fundraising Campaign",
    content: "Organize a fundraising campaign to support our team's activities for the upcoming season.",
    modules: [
      {
        id: 12011,
        type: 'Brainstorming',
        dueAt: { time: "18:00", distance: -5 },
        description: "Fundraising ideas",
        content: "Let's brainstorm creative fundraising ideas for our campaign.",
        options: []
      },
      {
        id: 12013,
        type: 'ExternalDecision',
        dueAt: { time: "18:00", distance: 40 },
        description: "Budget approval",
        content: "Get approval from the club's board for our fundraising budget.",
        options: []
      }
    ]
  },
  {
    id: 1202,
    new: false,
    public: false,
    active: false,
    createdAt: { time: "10:00", distance: -20 },
    dueAt: { time: "18:00", distance: 180 },
    creator: 1, // You
    description: "Youth Player Integration",
    content: "Develop a strategy to integrate promising youth players into our senior team.",
    modules: [
      {
        id: 12021,
        type: 'Debate',
        dueAt: { time: "18:00", distance: 30 },
        description: "Youth integration approach",
        content: "Debate the pros and cons of different approaches to integrating youth players.",
        options: []
      },
      {
        id: 12022,
        type: 'Vote',
        dueAt: { time: "18:00", distance: 60 },
        description: "Select integration strategy",
        content: "Vote on the best strategy for integrating youth players into our team.",
        options: []
      },
      {
        id: 12023,
        type: 'Estimate',
        dueAt: { time: "18:00", distance: 90 },
        description: "Resource allocation",
        content: "Estimate the resources needed to implement our youth integration strategy.",
        Ideas: []
      },

      {
        id: 12024,
        type: 'Prioritize',
        dueAt: { time: "18:00", distance: 120 },
        description: "Prioritize fundraising activities",
        content: "Rank the fundraising ideas based on feasibility and potential impact.",
        Ideas: []
      },
    ]
  }
];