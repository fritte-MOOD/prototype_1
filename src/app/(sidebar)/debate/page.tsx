'use client'

import { useState, useMemo, useEffect } from "react"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { GroupCheckboxes } from '@/components/GroupCheckboxes'
import FormattedDate from '@/components/FormattedDate';
import { useCheckbox } from '@/context/ContextFiles/CheckboxesContext'
import { Message, Chat, Member, Group, RelativeTime, Process } from "@/data/interfaces"
import { CalculateDateTime } from '@/components/CalculateDateTime';
import { useMockup } from "@/context/ContextFiles/MockupContext"
import { useDebate } from "@/context/ContextFiles/DebateContext"
import { useRouter } from 'next/navigation'

const DebatesPage = () => {
  const { groups } = useCheckbox()
  const mockData = useMockup()
  const { setDebateId } = useDebate()
  const router = useRouter()

  const processes = useMemo(() => {
    return mockData.flatMap(group => {
      const isGroupChecked = groups.find(g => g.name === group.name)?.checked

      const groupProcesses = isGroupChecked
        ? group.processes.map(process => ({ ...process, groupName: group.name }))
        : []

      const subgroupProcesses = group.subgroups.flatMap(subgroup => {
        const isSubgroupChecked = groups.find(g => g.name === subgroup.name)?.checked
        return isSubgroupChecked
          ? subgroup.processes.map(process => ({ ...process, groupName: subgroup.name }))
          : []
      })

      return [...groupProcesses, ...subgroupProcesses]
    })
  }, [mockData, groups])

  const handleProcessClick = (processId: number) => {
    setDebateId(processId)
    router.push('/debate/process')
  }

  return (
    <section className="bg-brand-25">
      <MaxWidthWrapper>
        <div className="flex w-full">
          <div className="w-1/4 pr-4">
            <GroupCheckboxes />
          </div>
          <div className="w-3/4">
            {processes.length === 0 ? (
              <p className="text-gray-600">No processes found in the selected groups.</p>
            ) : (
              processes.map((process: Process & { groupName: string }) => (
                <div 
                  key={process.id} 
                  className="mb-6 p-4 bg-white rounded shadow flex items-start cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => handleProcessClick(process.id)}
                >
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-xl font-semibold">{process.description}</h2>
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                        {process.groupName}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{process.content}</p>
                    <div className="flex justify-between text-sm text-gray-500">
                      <p>
                        Created: <FormattedDate date={CalculateDateTime(process.createdAt.time, process.createdAt.distance)} />
                      </p>
                      <p>
                        Due: <FormattedDate date={CalculateDateTime(process.dueAt.time, process.dueAt.distance)} />
                      </p>
                    </div>
                    <div className="mt-3">
                      {process.modules.map((module, index) => (
                        <span
                          key={index}
                          className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                        >
                          {module.type}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  )
}

export default DebatesPage