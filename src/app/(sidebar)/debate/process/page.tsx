'use client'

import { useDebate } from "@/context/DebateContext"
import { useMockup } from "@/context/MockupContext"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import FormattedDate from "@/components/FormattedDate"
import { CalculateDateTime } from '@/components/CalculateDateTime'
import { useState } from 'react'

const ModuleContent = ({ module }: { module: any }) => {
  switch (module.type) {
    case 'Ideation':
      return (
        <div>
          <h3 className="text-xl font-semibold mb-2">Ideation Module</h3>
          <p>{module.description}</p>
          {/* Add more ideation-specific content here */}
        </div>
      )
    case 'Estimate':
      return (
        <div>
          <h3 className="text-xl font-semibold mb-2">Estimate Module</h3>
          <p>{module.description}</p>
          {/* Add more estimate-specific content here */}
        </div>
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

const DebatesPage = () => {
  const { debateId } = useDebate()
  const mockData = useMockup()
  const [selectedModule, setSelectedModule] = useState<number | null>(null)

  // Find the current process
  const currentProcess = mockData.flatMap(group =>
    [...group.processes, ...group.subgroups.flatMap(subgroup => subgroup.processes)]
  ).find(process => process.id === debateId)

  const getModuleStatus = (module: any) => {
    return module.status ? `(${module.status})` : '';
  };

  const getUsernameById = (userId: number): string => {
    for (const group of mockData) {
      const user = group.members.find(member => member.id === userId);
      if (user) return user.name;
      
      for (const subgroup of group.subgroups) {
        const subgroupUser = subgroup.members.find(member => member.id === userId);
        if (subgroupUser) return subgroupUser.name;
      }
    }
    return "Unknown User";
  };

  return (
    <section className="bg-brand-25 min-h-screen py-8">
      <MaxWidthWrapper>
        {currentProcess ? (
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-6">{currentProcess.description}</h1>

            <div className="mb-6">
              <p className="text-lg mb-2">{currentProcess.content}</p>
              <p className="text-sm text-gray-600">
                Status: <span className={`font-semibold ${currentProcess.active ? 'text-green-600' : 'text-red-600'}`}>
                  {currentProcess.active ? 'Active' : 'Inactive'}
                </span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <p>Created by: {getUsernameById(currentProcess.creator)}</p>
                <p>Created at: <FormattedDate date={CalculateDateTime(currentProcess.createdAt.time, currentProcess.createdAt.distance)} /></p>
              </div>
              <div>
                <p>Due date: <FormattedDate date={CalculateDateTime(currentProcess.dueAt.time, currentProcess.dueAt.distance)} /></p>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Modules:</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {currentProcess.modules.map((module: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedModule(index)}
                    className={`px-4 py-2 rounded-full text-sm ${selectedModule === index ? 'bg-brand-300 text-white' : 'bg-gray-200 text-gray-700'}`}
                  >
                    {module.type} {getModuleStatus(module)}
                  </button>
                ))}
              </div>
              {selectedModule !== null && (
                <ModuleContent module={currentProcess.modules[selectedModule]} />
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Debate Context</h1>
            <p className="text-lg">
              Current Debate ID: {debateId !== null ? debateId : 'No debate selected'}
            </p>
            <p className="text-red-600 mt-4">Process not found</p>
          </div>
        )}
      </MaxWidthWrapper>
    </section>
  )
}

export default DebatesPage