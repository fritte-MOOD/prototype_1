export interface Message {
  sentBy: string;
  time: string;
  distance: number;
  content: string;
}

export interface Chat {
  id: number;
  new: boolean;
  members: Member[];
  messages: Message[];
}

export interface Member {
  name: string;
  commonGroups: string[];
}

export interface Task {
  id: number;
  done: boolean;
  description: string;
  assignedBy: string;
  time: string;
  distance: number;
}

export interface Appointment {
  id: number;
  description: string;
  time: string;
  distance: number;
  acceptedBy: string[];
  declinedBy: string[];
}

export interface BaseModule {
  id: number;
  type: string;
  description: string;
  deadline: string;
}

export interface DiscussionModule extends BaseModule {
  type: 'Discussion';
  arguments: string[];
}

export interface VotingModule extends BaseModule {
  type: 'Voting';
  options: string[];
}

export interface FeedbackModule extends BaseModule {
  type: 'Feedback';
  questions: string[];
}

export type Module = DiscussionModule | VotingModule | FeedbackModule;

export interface Process {
  description: string;
  creator: string;
  creationDate: string;
  deadline: string;
  active: boolean;
  modules: Module[];
}

export interface Group {
  name: string;
  IAmMember: boolean;
  subgroups: Group[];
  members: Member[];
  processes: Process[];
  chats: Chat[];
  tasks: Task[];
  appointments: Appointment[];
}