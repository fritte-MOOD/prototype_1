import React from 'react';
import { BrainstormingModule } from '@/data/interfaces';

interface BrainstormingSectionProps {
  module: BrainstormingModule;
}

const BrainstormingSection: React.FC<BrainstormingSectionProps> = ({ module }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Brainstorming Module</h3>
      <p>{module.description}</p>
      {/* Add more brainstorming-specific content here */}
    </div>
  );
};

export default BrainstormingSection;