import React from 'react';
import { DebateModule } from '@/data/interfaces';

interface DebateSectionProps {
  module: DebateModule;
}

const DebateSection: React.FC<DebateSectionProps> = ({ module }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Debate Module</h3>
      <p>{module.description}</p>
      {/* Add more debate-specific content here */}
    </div>
  );
};

export default DebateSection;