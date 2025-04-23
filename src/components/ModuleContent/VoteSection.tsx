import React from 'react';
import { VoteModule } from '@/data/interfaces';

interface VoteSectionProps {
  module: VoteModule;
}

const VoteSection: React.FC<VoteSectionProps> = ({ module }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Vote Module</h3>
      <p>{module.description}</p>
      {/* Add more vote-specific content here */}
    </div>
  );
};

export default VoteSection;