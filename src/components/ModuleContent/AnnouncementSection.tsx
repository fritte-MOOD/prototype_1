import React from 'react';
import { AnnouncementModule } from '@/data/interfaces';

interface AnnouncementSectionProps {
  module: AnnouncementModule;
}

const AnnouncementSection: React.FC<AnnouncementSectionProps> = ({ module }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Announcement Module</h3>
      <p>{module.description}</p>
      {/* Add more announcement-specific content here */}
    </div>
  );
};

export default AnnouncementSection;