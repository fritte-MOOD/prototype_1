'use client'

import { useDebate } from "@/context/DebateContext"
import { useMockup } from "@/context/MockupContext"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import FormattedDate from "@/components/FormattedDate"
import { CalculateDateTime } from '@/components/CalculateDateTime'
import { useState } from 'react'
import { ModuleContent } from '@/components/moduleContent'

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
          <>
            <div className="bg-white p-8 rounded-lg shadow-md mb-8">
              <h1 className="text-3xl font-bold mb-6">{currentProcess.description}</h1>

              <div className="mb-6">
                <p className="text-lg mb-2">{currentProcess.content}</p>
                <div className="text-sm text-gray-600">
                  <p className="mb-1">
                    Status: <span className={`font-semibold ${currentProcess.active ? 'text-green-600' : 'text-red-600'}`}>
                    {currentProcess.active ? 'Active' : 'Inactive'}
                  </span>
                  </p>
                  <p>
                    Due date: <FormattedDate date={CalculateDateTime(currentProcess.dueAt.time, currentProcess.dueAt.distance)} />
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <p>Created by: {getUsernameById(currentProcess.creator)}</p>
                  <p>Created at: <FormattedDate date={CalculateDateTime(currentProcess.createdAt.time, currentProcess.createdAt.distance)} /></p>
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center mb-8 overflow-x-auto py-4">
              {currentProcess.modules.map((module: any, index: number) => (
                <div key={index} className="flex items-center">
                  <button
                    onClick={() => setSelectedModule(index)}
                    className={`flex items-center justify-center h-16 px-6 text-lg font-bold transition-colors duration-200 shadow-md rounded-md ${
                      selectedModule === index
                        ? 'bg-brand-300 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    style={{
                      clipPath: 'polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)',
                      width: '200px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingLeft: '20px',
                      paddingRight: '40px',
                    }}
                  >
                    <span className="text-center ml-[-10px]">{module.type}</span>
                  </button>
                  {index < currentProcess.modules.length - 1 && (
                    <div className="w-8 h-1 bg-gray-300"></div>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              {selectedModule !== null && (
                  <ModuleContent module={currentProcess.modules[selectedModule]} />
              )}
            </div>
          </>
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