import React, { useState } from 'react';
import { CalculateDateTime } from '@/components/CalculateDateTime';
import FormattedDate from '@/components/FormattedDate';
import { useMockup } from '@/context/MockupContext';
import { ThumbsUp } from 'lucide-react'; // Import the ThumbsUp icon
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

export const ModuleContent: React.FC<ModuleContentProps> = ({ module }) => {
  const [expandedIdeas, setExpandedIdeas] = useState<number[]>([]);
  const mockupData = useMockup();

  const toggleIdea = (ideaId: number) => {
    setExpandedIdeas(prev =>
      prev.includes(ideaId)
        ? prev.filter(id => id !== ideaId)
        : [...prev, ideaId]
    );
  };

  const getUsernameById = (userId: number): string => {
    for (const group of mockupData) {
      const user = group.members.find(member => member.id === userId);
      if (user) return user.name;

      for (const subgroup of group.subgroups) {
        const subgroupUser = subgroup.members.find(member => member.id === userId);
        if (subgroupUser) return subgroupUser.name;
      }
    }
    return "Unknown User";
  };

  const renderDateTime = (relativeTime: RelativeTime) => {
    const date = CalculateDateTime(relativeTime.time, relativeTime.distance);
    return <FormattedDate date={date} />;
  };

  switch (module.type) {
case 'Ideation':
  return (
    <>
      <h3 className="text-2xl font-semibold mb-2">Ideation Module</h3>
      <p className="mb-4 text-gray-600">{module.description}</p>
      <p className="mb-6 text-gray-600">{module.content}</p>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setExpandedIdeas(expandedIdeas.length === module.Ideas.length ? [] : module.Ideas.map(idea => idea.id))}
          className="bg-brand-300 text-white px-4 py-2 rounded hover:bg-brand-400 transition-colors"
        >
          {expandedIdeas.length === module.Ideas.length ? 'Collapse All' : 'Expand All'}
        </button>
      </div>
      <h3 className="text-2xl font-semibold mb-2">Collect Ideas:</h3>
      {module.Ideas.map((idea) => (
        <div
          key={idea.id}
          className="bg-white border border-brand-300 shadow-md rounded-lg mb-6"
        >
          <div
            className="p-4 cursor-pointer"
            onClick={() => toggleIdea(idea.id)}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center">
                <span className="bg-brand-100 text-brand-700 font-semibold px-3 py-1 rounded-full mr-3 flex items-center">
                  <ThumbsUp size={16} className="mr-1" /> {idea.supportedBy.length}
                </span>
                <div>
                  <p className="text-lg font-semibold">
                    {getUsernameById(idea.createdBy)}: <span className="font-normal">{idea.content}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    {renderDateTime(idea.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {expandedIdeas.includes(idea.id) && (
            <div className="mt-4 p-4 border-t border-gray-200">
              <div className="flex items-center">
                <span className="bg-brand-100 text-brand-700 font-semibold px-3 py-1 rounded-full mr-3 flex items-center invisible">
                  <ThumbsUp size={16} className="mr-1" /> {idea.supportedBy.length}
                </span>
                <div>
                <p className="text-gray-700 mb-2">{idea.description}</p>
                <p className="text-sm text-gray-600 mb-4">
                  Supported by: {idea.supportedBy.map(id => getUsernameById(id)).join(', ')}
                </p>
                </div>
              </div>

              <h4 className="font-semibold mb-2">Comments:</h4>
              <ul className="space-y-4 pl-6">
                {idea.comments.map((comment) => (
                  <li key={comment.id} className="bg-gray-50 p-4 rounded">
                    <div className="flex items-center mb-2">
                      <span className="bg-brand-100 text-brand-700 font-semibold px-3 py-1 rounded-full mr-3 flex items-center">
                        <ThumbsUp size={16} className="mr-1" /> {comment.supportedBy.length}
                      </span>
                      <p className="font-semibold">
                        {getUsernameById(comment.createdBy)}: <span className="font-normal">{comment.content}</span>
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      {renderDateTime(comment.createdAt)}
                    </p>
                    <div className="space-x-2 mb-4">
                      <button className="text-brand-300 hover:underline">support</button>
                      <button className="text-brand-300 hover:underline">comment</button>
                      <button className="text-brand-300 hover:underline">report</button>
                    </div>
                    {comment.comments && comment.comments.length > 0 && (
                      <ul className="mt-2 space-y-2 pl-4">
                        {comment.comments.map((subComment) => (
                          <li key={subComment.id} className="bg-gray-100 p-2 rounded">
                            <div className="flex items-center mb-1">
                              <span className="bg-brand-100 text-brand-700 font-semibold px-2 py-0.5 rounded-full mr-2 flex items-center text-xs">
                                <ThumbsUp size={12} className="mr-1" /> {subComment.supportedBy.length}
                              </span>
                              <p className="font-semibold">
                                {getUsernameById(subComment.createdBy)}: <span className="font-normal">{subComment.content}</span>
                              </p>
                            </div>
                            <p className="text-xs text-gray-600">
                              {renderDateTime(subComment.createdAt)}
                            </p>
                            {/* New: Leave comment input field for subcomments */}
                            <div className="mt-2 space-x-2">
                              <button className="text-brand-300 hover:underline">support</button>
                              <button className="text-brand-300 hover:underline">comment</button>
                              <button className="text-brand-300 hover:underline">report</button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}

                  </li>
                ))}
              </ul>
              {/* New: Leave comment input field for the idea */}
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Leave a comment on this idea..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-500 focus:border-brand-500"
                />
              </div>
            </div>
          )}
        </div>
      ))}

      {/* New Idea Submission Form */}
      <h3 className="text-xl font-semibold mb-4">Submit New Idea</h3>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-500 focus:border-brand-500"
            placeholder="Enter idea description"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-500 focus:border-brand-500"
            placeholder="Enter idea content"
          ></textarea>
        </div>
        <button
          type="button"
          className="bg-brand-300 text-white px-4 py-2 rounded hover:bg-brand-400 transition-colors"
          onClick={(e) => e.preventDefault()}
        >
          Submit Idea
        </button>
      </form>
    </>
  )

    case 'Estimate':
  return (
    <>
      <h3 className="text-2xl font-semibold mb-2">Estimate Module</h3>
      <p className="mb-4 text-gray-600">{module.description}</p>
      <p className="mb-6 text-gray-600">{module.content}</p>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setExpandedIdeas(expandedIdeas.length === module.Ideas.length ? [] : module.Ideas.map(idea => idea.id))}
          className="bg-brand-300 text-white px-4 py-2 rounded hover:bg-brand-400 transition-colors"
        >
          {expandedIdeas.length === module.Ideas.length ? 'Collapse All' : 'Expand All'}
        </button>
      </div>
      <h3 className="text-2xl font-semibold mb-2">Estimate potential Consequences:</h3>
      {module.Ideas.map((idea) => (
        <div
          key={idea.id}
          className="bg-white border border-brand-300 shadow-md rounded-lg mb-6"
        >
          <div
            className="p-4 cursor-pointer"
            onClick={() => toggleIdea(idea.id)}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center">
                <div>
                  <p className="text-lg font-semibold">
                    <span className="font-normal">{idea.content}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          {expandedIdeas.includes(idea.id) && (
            <div className="mt-4 p-4 border-t border-gray-200">
              <div className="flex items-center">
                <div>
                <p className="text-gray-700 mb-2">{idea.description}</p>
                </div>
              </div>

              <h4 className="font-semibold mb-2">Consequences:</h4>
              <ul className="space-y-4 pl-6">
                {idea.comments.map((comment) => (
                  <li key={comment.id} className="bg-gray-50 p-4 rounded">
                    <div className="flex items-center mb-2">
                      <p className="font-semibold">
                        {getUsernameById(comment.createdBy)}: <span className="font-normal">{comment.content}</span>
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      {renderDateTime(comment.createdAt)}
                    </p>
                    <div className="space-x-2 mb-4">
                      <button className="text-brand-300 hover:underline">support</button>
                      <button className="text-brand-300 hover:underline">comment</button>
                      <button className="text-brand-300 hover:underline">report</button>
                    </div>
                    {comment.comments && comment.comments.length > 0 && (
                      <ul className="mt-2 space-y-2 pl-4">
                        {comment.comments.map((subComment) => (
                          <li key={subComment.id} className="bg-gray-100 p-2 rounded">
                            <div className="flex items-center mb-1">
                              <p className="font-semibold">
                                {getUsernameById(subComment.createdBy)}: <span className="font-normal">{subComment.content}</span>
                              </p>
                            </div>
                            <p className="text-xs text-gray-600">
                              {renderDateTime(subComment.createdAt)}
                            </p>
                            <div className="mt-2 space-x-2">
                              <button className="text-brand-300 hover:underline">support</button>
                              <button className="text-brand-300 hover:underline">comment</button>
                              <button className="text-brand-300 hover:underline">report</button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Leave a comment on this estimate..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-500 focus:border-brand-500"
                />
              </div>
            </div>
          )}
        </div>
      ))}

    </>
  )
    case 'Prioritize':
      return (
        <div>
          <h3 className="text-xl font-semibold mb-2">Prioritize Module</h3>
          <p>{module.description}</p>
          {/* Add more prioritize-specific content here */}
        </div>
      )
    case 'Vote':
      return (
        <div>
          <h3 className="text-xl font-semibold mb-2">Vote Module</h3>
          <p>{module.description}</p>
          {/* Add more vote-specific content here */}
        </div>
      )
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