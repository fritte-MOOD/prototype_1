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
        dueAt: { time: "", distance: 0 },
        description: "",
        content: "",
        options: [
          {
            id: 120031,
            new: false,
            createdAt: { time: "09:00", distance: 0 },
            createdBy: 1200,
            supportedBy: [1201, 1202],
            rank: 0,
            description: "High-pressure defensive system implementation",
            content: "After careful consideration and team voting, we have decided to implement a high-pressure defensive system for our upcoming matches. This strategy aligns well with our team's high energy style and is expected to increase ball recoveries by 20%. However, it may also increase the risk of player fatigue by 15%, so we'll be adjusting our training regimen accordingly. All players are expected to familiarize themselves with this new system before our next training session.",
            comments: [
              {
                id: 1200311,
                createdAt: { time: "10:30", distance: 0 },
                createdBy: 1201,
                content: "Great decision! When can we expect detailed instructions on our individual roles in this new system?",
                new: true,
                supportedBy: [1200, 1202],
                comments: [],
              },
              {
                id: 1200312,
                createdAt: { time: "11:15", distance: 0 },
                createdBy: 1,
                content: "This is exciting! I suggest we have extra stamina training to prepare for the increased physical demands.",
                new: true,
                supportedBy: [1201],
                comments: [],
              }
            ]
          }
        ]
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
        options: [
          {
            id: 120111,
            createdAt: { time: "15:00", distance: -8 },
            createdBy: 1200,
            content: "Organize a charity football match",
            comments: [
              {
                id: 1201111,
                createdAt: { time: "15:30", distance: -8 },
                createdBy: 1201,
                content: "Great idea! We could invite local celebrities to participate.",
                new: false,
                supportedBy: [1, 1202],
                comments: [],
              },
              {
                id: 1201112,
                createdAt: { time: "16:00", distance: -8 },
                createdBy: 1,
                content: "We should consider the costs of organizing such an event.",
                new: false,
                supportedBy: [1200],
                comments: [],
              },
            ],
            new: false,
            supportedBy: [1200, 1201, 1202],
            rank: 0,
            description: "A charity match could attract a lot of attention and donations.",
          },
          {
            id: 120112,
            createdAt: { time: "16:30", distance: -7 },
            createdBy: 1201,
            content: "Launch a crowdfunding campaign",
            comments: [
              {
                id: 1201121,
                createdAt: { time: "17:00", distance: -7 },
                createdBy: 1202,
                content: "We could offer unique rewards for different donation levels.",
                new: false,
                supportedBy: [1200, 1],
                comments: [],
              },
            ],
            new: false,
            supportedBy: [1200, 1],
            rank: 0,
            description: "Online crowdfunding could help us reach a wider audience.",
          },
          {
            id: 120113,
            createdAt: { time: "18:00", distance: -6 },
            createdBy: 1,
            content: "Host a sports equipment sale",
            comments: [
              {
                id: 1201131,
                createdAt: { time: "18:30", distance: -6 },
                createdBy: 1200,
                content: "We could ask for donations of used equipment from local sports shops.",
                new: false,
                supportedBy: [1201, 1202],
                comments: [],
              },
              {
                id: 1201132,
                createdAt: { time: "19:00", distance: -6 },
                createdBy: 1201,
                content: "This could also help promote our club in the community.",
                new: false,
                supportedBy: [1, 1202],
                comments: [],
              },
            ],
            new: false,
            supportedBy: [1200, 1201, 1202],
            rank: 0,
            description: "Selling sports equipment could attract both donations and potential new members.",
          },
        ]
      },
      {
        id: 12013,
        type: 'ExternalDecision',
        dueAt: { time: "18:00", distance: 40 },
        description: "Budget approval",
        content: "The club's board has reviewed our fundraising proposals and made decisions on budget allocations. Please review the options below for details on approved and rejected ideas, along with explanations for each decision.",
        options: [
          {
            id: 120131,
            new: false,
            createdAt: { time: "14:00", distance: 0 },
            createdBy: 1203, // Assuming 1203 is the ID for a board member
            supportedBy: [1203, 1204, 1205], // Assuming these are other board members
            rank: 1,
            description: "Organize a charity football match",
            content: "Approved with a budget of $5,000",
            comments: [
              {
                id: 1201311,
                createdAt: { time: "14:30", distance: 0 },
                createdBy: 1203,
                content: "This idea has great potential for both fundraising and community engagement. The celebrity angle could attract significant attention and donations. However, we need to carefully manage costs to ensure profitability.",
                new: false,
                supportedBy: [1204, 1205],
                comments: [],
              }
            ]
          },
          {
            id: 120132,
            new: false,
            createdAt: { time: "14:05", distance: 0 },
            createdBy: 1203,
            supportedBy: [1203, 1204],
            rank: 2,
            description: "Launch a crowdfunding campaign",
            content: "Approved with a budget of $1,000 for marketing and rewards",
            comments: [
              {
                id: 1201321,
                createdAt: { time: "14:35", distance: 0 },
                createdBy: 1203,
                content: "A crowdfunding campaign is a cost-effective way to reach a wide audience. The budget will cover marketing efforts and the creation of unique rewards. We expect this to have a good return on investment.",
                new: false,
                supportedBy: [1204],
                comments: [],
              }
            ]
          },
          {
            id: 120133,
            new: false,
            createdAt: { time: "14:10", distance: 0 },
            createdBy: 1203,
            supportedBy: [],
            rank: 3,
            description: "Host a sports equipment sale",
            content: "Not approved at this time",
            comments: [
              {
                id: 1201331,
                createdAt: { time: "14:40", distance: 0 },
                createdBy: 1203,
                content: "While this idea has merit for community engagement, we believe the logistical challenges and potential low profit margin make it less suitable for our current fundraising needs. We may reconsider this for future community events rather than as a primary fundraising activity.",
                new: false,
                supportedBy: [1204, 1205],
                comments: [],
              }
            ]
          }
        ]
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
        description: "Capacity for New Players",
        content: "Is there enough capacity to welcome new players into our senior team?",
        options: [
          {
            id: 120211,
            new: false,
            createdAt: { time: "11:00", distance: -19 },
            createdBy: 1200,
            supportedBy: [1200, 1],
            rank: 0,
            description: "Yes",
            content: "We have the resources and space to integrate new players into our senior team.",
            comments: [
              {
                id: 1202111,
                createdAt: { time: "11:30", distance: -19 },
                createdBy: 1200,
                content: "Our training facilities can accommodate more players without significant strain.",
                new: false,
                supportedBy: [1],
                comments: [
                  {
                    id: 12021111,
                    createdAt: { time: "12:00", distance: -19 },
                    createdBy: 1,
                    content: "We should consider expanding training hours to ensure quality time for all players.",
                    new: false,
                    supportedBy: [1200],
                    comments: [],
                  }
                ],
              },
              {
                id: 1202112,
                createdAt: { time: "13:00", distance: -19 },
                createdBy: 1,
                content: "Integrating youth players can bring fresh energy and competition to the team.",
                new: false,
                supportedBy: [1201],
                comments: [
                  {
                    id: 12021121,
                    createdAt: { time: "13:30", distance: -19 },
                    createdBy: 1201,
                    content: "It could also help us develop a long-term strategy for team growth.",
                    new: false,
                    supportedBy: [1, 1200],
                    comments: [],
                  }
                ],
              }
            ]
          },
          {
            id: 120212,
            new: false,
            createdAt: { time: "11:15", distance: -19 },
            createdBy: 1201,
            supportedBy: [1201, 1202],
            rank: 0,
            description: "No",
            content: "We currently don't have enough resources to properly integrate new players into the senior team.",
            comments: [
              {
                id: 1202121,
                createdAt: { time: "11:45", distance: -19 },
                createdBy: 1201,
                content: "Our coaching staff is already at full capacity with the current team size.",
                new: false,
                supportedBy: [1202],
                comments: [
                  {
                    id: 12021211,
                    createdAt: { time: "12:15", distance: -19 },
                    createdBy: 1202,
                    content: "We might need to hire additional coaching staff to properly support new players.",
                    new: false,
                    supportedBy: [1201],
                    comments: [],
                  }
                ],
              },
              {
                id: 1202122,
                createdAt: { time: "13:15", distance: -19 },
                createdBy: 1202,
                content: "Integrating new players might disrupt the current team dynamics and chemistry.",
                new: false,
                supportedBy: [1201],
                comments: [
                  {
                    id: 12021221,
                    createdAt: { time: "13:45", distance: -19 },
                    createdBy: 1,
                    content: "While this is a concern, it's also an opportunity for the team to adapt and grow.",
                    new: false,
                    supportedBy: [1200],
                    comments: [],
                  }
                ],
              }
            ]
          }
        ]
      }

    ]
  }
];
