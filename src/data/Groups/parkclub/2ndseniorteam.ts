import { Member, Chat, Task, Appointment, Process, Module, RelativeTime } from '../../interfaces';

export const members: Member[] = [
  { id: 1, name: "You" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Mike Johnson" },
];

export const chats: Chat[] = [
  {
    id: 1,
    members: [1, 2],
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
        sentBy: 2,
        supportedBy: [],
        content: "It's this Saturday at 2 PM."
      }
    ]
  },
  {
    id: 2,
    members: [1, 2, 3],
    messages: [
      {
        new: false,
        at: { time: "15:00", distance: -2 },
        sentBy: 3,
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
        sentBy: 2,
        supportedBy: [1],
        content: "See you all then."
      }
    ]
  }
];

export const tasks: Task[] = [
  {
    id: 1,
    done: false,
    dueAt: { time: "18:00", distance: 2 },
    assignedBy: 3,
    description: "Review match strategy",
    content: "Go through the new defensive formation we discussed last week."
  },
  {
    id: 2,
    done: true,
    dueAt: { time: "12:00", distance: 0 },
    assignedBy: 1,
    description: "Submit player availability",
    content: "Send your availability for next month's matches to the coach."
  },
  {
    id: 3,
    done: false,
    dueAt: { time: "20:00", distance: 5 },
    assignedBy: 2,
    description: "Fitness check",
    content: "Complete the fitness assessment and submit your results."
  }
];

export const appointments: Appointment[] = [
  {
    id: 1,
    at: { time: "14:00", distance: 3 },
    createdBy: 3,
    invited: [0, 1, 2, 3],
    accepted: [0, 1, 3],
    declined: [],
    description: "Match vs City Rangers",
    content: "Home game against City Rangers. Arrive at least an hour before for warm-up."
  },
  {
    id: 2,
    at: { time: "18:00", distance: 1 },
    createdBy: 2,
    invited: [0, 1, 2, 3],
    accepted: [0, 2],
    declined: [1],
    description: "Team Strategy Meeting",
    content: "Discussing tactics for upcoming matches and reviewing last game's performance."
  },
  {
    id: 3,
    at: { time: "09:00", distance: 7 },
    createdBy: 1,
    invited: [0, 1, 2, 3],
    accepted: [],
    declined: [],
    description: "Morning Training Session",
    content: "Focus on improving stamina and ball control. Don't forget to bring your own water bottle."
  }
];

export const processes: Process[] = [
  {
    id: 1,
    new: true,
    public: false,
    active: true,
    createdAt: { time: "09:00", distance: -5 },
    dueAt: { time: "18:00", distance: 90 },
    creator: 3, // Mike Johnson
    description: "Team Performance Improvement",
    content: "A comprehensive process to enhance our team's performance over the next three months.",
    modules: [
      {
        id: 1,
        type: 'Ideation',
        dueAt: { time: "18:00", distance: 10 },
        description: "Brainstorm defensive strategies",
        content: "Let's come up with new defensive formations and tactics.",
        Ideas: []
      },
      {
        id: 2,
        type: 'Vote',
        dueAt: { time: "18:00", distance: 30 },
        description: "Select best defensive strategy",
        content: "Vote on the defensive strategy we'll implement in our next match.",
        options: []
      },
      {
        id: 3,
        type: 'Announcement',
        dueAt: { time: "18:00", distance: 60 },
        description: "New strategy announcement",
        content: "Announce and explain the new defensive strategy to the team.",
        options: []
      }
    ]
  },
  {
    id: 2,
    new: false,
    public: true,
    active: true,
    createdAt: { time: "14:00", distance: -10 },
    dueAt: { time: "20:00", distance: 120 },
    creator: 2, // Jane Smith
    description: "Fundraising Campaign",
    content: "Organize a fundraising campaign to support our team's activities for the upcoming season.",
    modules: [
      {
        id: 1,
        type: 'Brainstorming',
        dueAt: { time: "18:00", distance: 5 },
        description: "Fundraising ideas",
        content: "Let's brainstorm creative fundraising ideas for our campaign.",
        options: []
      },
      {
        id: 2,
        type: 'Prioritize',
        dueAt: { time: "18:00", distance: 20 },
        description: "Prioritize fundraising activities",
        content: "Rank the fundraising ideas based on feasibility and potential impact.",
        Ideas: []
      },
      {
        id: 3,
        type: 'ExternalDecision',
        dueAt: { time: "18:00", distance: 40 },
        description: "Budget approval",
        content: "Get approval from the club's board for our fundraising budget.",
        options: []
      }
    ]
  },
  {
    id: 3,
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
        id: 1,
        type: 'Debate',
        dueAt: { time: "18:00", distance: 30 },
        description: "Youth integration approach",
        content: "Debate the pros and cons of different approaches to integrating youth players.",
        options: []
      },
      {
        id: 2,
        type: 'Vote',
        dueAt: { time: "18:00", distance: 60 },
        description: "Select integration strategy",
        content: "Vote on the best strategy for integrating youth players into our team.",
        options: []
      },
      {
        id: 3,
        type: 'Estimate',
        dueAt: { time: "18:00", distance: 90 },
        description: "Resource allocation",
        content: "Estimate the resources needed to implement our youth integration strategy.",
        Ideas: []
      }
    ]
  }
];