import React from 'react';
import { ExternalDecisionModule } from '@/data/interfaces';

interface ExternalDecisionSectionProps {
  module: ExternalDecisionModule;
}

const ExternalDecisionSection: React.FC<ExternalDecisionSectionProps> = ({ module }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">External Decision Module</h3>
      <p>{module.description}</p>
      {/* Add more external decision-specific content here */}
    </div>
  );
};

export default ExternalDecisionSection;