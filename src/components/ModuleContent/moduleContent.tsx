import React, { useEffect, useState } from 'react';
import { CalculateDateTime } from '@/components/CalculateDateTime';
import FormattedDate from '@/components/FormattedDate';
import { useMockup } from '@/context/ContextFiles/MockupContext';
import PrioritizeSection from "./PrioritizeSection"
import IdeationSection from "./IdeationSection"
import EstimateSection from "./EstimateSection"

import {
  IdeationModule,
  EstimateModule,
  PrioritizeModule,
  VoteModule,
  DebateModule,
  ExternalDecisionModule,
  BrainstormingModule,
  AnnouncementModule,
  RelativeTime
} from '@/data/interfaces';

type ModuleType =
  | IdeationModule
  | EstimateModule
  | PrioritizeModule
  | VoteModule
  | DebateModule
  | ExternalDecisionModule
  | BrainstormingModule
  | AnnouncementModule;

interface ModuleContentProps {
  module: ModuleType;
}

export const renderDateTime = (relativeTime: RelativeTime) => {
  const date = CalculateDateTime(relativeTime.time, relativeTime.distance);
  return <FormattedDate date={date} />;
};

export const ModuleContent: React.FC<ModuleContentProps> = ({ module }) => {
  const [preferences, setPreferences] = useState<{[key: number]: number}>({});

  useEffect(() => {
    if (module.type === 'Prioritize') {
      setPreferences(module.Ideas.reduce((acc, idea) => ({ ...acc, [idea.id]: 50 }), {}));
    }
  }, [module]);

  switch (module.type) {
    case 'Ideation':
      return <IdeationSection module={module} />;
    case 'Estimate':
      return <EstimateSection module={module} />;
    case 'Prioritize':
      return <PrioritizeSection module={module} />;
    case 'Vote':
    case 'Debate':
      return (
        <div>
          <h3 className="text-xl font-semibold mb-2">Debate Module</h3>
          <p>{module.description}</p>
          {/* Add more debate-specific content here */}
        </div>
      )
    case 'ExternalDecision':
      return (
        <div>
          <h3 className="text-xl font-semibold mb-2">External Decision Module</h3>
          <p>{module.description}</p>
          {/* Add more external decision-specific content here */}
        </div>
      )
    case 'Brainstorming':
      return (
        <div>
          <h3 className="text-xl font-semibold mb-2">Brainstorming Module</h3>
          <p>{module.description}</p>
          {/* Add more brainstorming-specific content here */}
        </div>
      )
    case 'Announcement':
      return (
        <div>
          <h3 className="text-xl font-semibold mb-2">Announcement Module</h3>
          <p>{module.description}</p>
          {/* Add more announcement-specific content here */}
        </div>
      )
    default:
      return <p>Unknown module type</p>
  }
}