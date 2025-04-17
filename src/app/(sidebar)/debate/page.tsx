'use client'

import { useState, useMemo, useEffect } from "react"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { GroupCheckboxes } from '@/components/GroupCheckboxes'
import FormattedDate from '@/components/FormattedDate';
import { useCheckbox } from '@/context/CheckboxesContext'
import { Message, Chat, Member, Group, RelativeTime, Process } from "@/data/interfaces"
import { CalculateDateTime } from '@/components/CalculateDateTime';
import { useMockup } from "@/context/MockupContext"

const DebatesPage = () => {
  const { groups } = useCheckbox()
  const mockData = useMockup()

  const debates = useMemo(() => {
    return mockData.flatMap(group => {
      const isGroupChecked = groups.find(g => g.name === group.name)?.checked

      const groupDebates = isGroupChecked
        ? group.processes.filter(process =>
            process.modules.some(module =>
              ['Debate', 'Vote', 'Ideation'].includes(module.type)
            )
          ).map(process => ({ ...process, groupName: group.name }))
        : []

      const subgroupDebates = group.subgroups.flatMap(subgroup => {
        const isSubgroupChecked = groups.find(g => g.name === subgroup.name)?.checked
        return isSubgroupChecked // Only check if the subgroup is checked, not the main group
          ? subgroup.processes.filter(process =>
              process.modules.some(module =>
                ['Debate', 'Vote', 'Ideation'].includes(module.type)
              )
            ).map(process => ({ ...process, groupName: subgroup.name }))
          : []
      })

      return [...groupDebates, ...subgroupDebates]
    })
  }, [mockData, groups])

  return (
    <section className="bg-brand-25">
      <MaxWidthWrapper>
        <div className="flex w-full">
          <div className="w-1/4 pr-4">
            <GroupCheckboxes />
          </div>
          <div className="w-3/4">
            {debates.length === 0 ? (
              <p className="text-gray-600">No debates found in the selected groups.</p>
            ) : (
              debates.map((debate: Process & { groupName: string }) => (
                <div key={debate.id} className="mb-6 p-4 bg-white rounded shadow flex items-start">
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-xl font-semibold">{debate.description}</h2>
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                        {debate.groupName}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{debate.content}</p>
                    <div className="flex justify-between text-sm text-gray-500">
                      <p>
                        Created: <FormattedDate date={CalculateDateTime(debate.createdAt.time, debate.createdAt.distance)} />
                      </p>
                      <p>
                        Due: <FormattedDate date={CalculateDateTime(debate.dueAt.time, debate.dueAt.distance)} />
                      </p>
                    </div>
                    <div className="mt-3">
                      {debate.modules.map((module, index) => (
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