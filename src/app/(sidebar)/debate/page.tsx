"use client"

import { useMemo } from "react"
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper"
import { GroupCheckboxes } from "@/components/ui/GroupCheckboxes"
import FormattedDate from "@/components/functions/FormattedDate"
import { useCheckbox } from "@/context/ContextFiles/CheckboxesContext"
import { Process } from "@/data/interfaces"
import { CalculateDateTime } from "@/components/functions/CalculateDateTime"
import { useMockup } from "@/context/ContextFiles/MockupContext"
import { useDebate } from "@/context/ContextFiles/DebateContext"
import { useRouter } from "next/navigation"

const DebatesPage = () => {
  const { groups } = useCheckbox()
  const mockData = useMockup()
  const { setDebateId } = useDebate()
  const router = useRouter()

  const getGroupColor = (groupName: string, isSubgroup: boolean): string => {
    switch (groupName) {
      case "Park Club":
        return "bg-group-park-club-500 border-group-park-club-500 text-brand-0";
      case "Marin Quarter":
        return "bg-group-marin-quarter-500 border-group-marin-quarter-500 text-brand-0";
      case "Rochefort":
        return "bg-group-rochefort-500 border-group-rochefort-500 text-brand-0";
      default:
        return "bg-gray-300 border-gray-300 text-gray-700";
    }
  };

  const processes = useMemo(() => {
    return mockData.flatMap(group => {
      const isGroupChecked = groups.find(g => g.name === group.name)?.checked

      const groupProcesses = isGroupChecked
        ? group.processes.map(process => ({ ...process, groupName: group.name, isSubgroup: false }))
        : []

      const subgroupProcesses = group.subgroups.flatMap(subgroup => {
        const isSubgroupChecked = groups.find(g => g.name === subgroup.name)?.checked
        return isSubgroupChecked
          ? subgroup.processes.map(process => ({ 
              ...process, 
              groupName: group.name,
              subgroupName: subgroup.name,
              isSubgroup: true 
            }))
          : []
      })

      return [...groupProcesses, ...subgroupProcesses]
    })
  }, [mockData, groups])

  const handleProcessClick = (processId: number) => {
    setDebateId(processId)
    router.push("/debate/process")
  }

  return (
    <section className="bg-brand-25">
      <MaxWidthWrapper>
        <div className="w-full mb-6">
          <GroupCheckboxes />
        </div>
        <div className="w-full">
          {processes.length === 0 ? (
            <p className="text-gray-600">No processes found in the selected groups.</p>
          ) : (
            processes.map((process: Process & { groupName: string, subgroupName?: string, isSubgroup: boolean }) => (
              <div
                key={process.id}
                className="mb-6 p-4 bg-white rounded shadow flex items-start cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                onClick={() => handleProcessClick(process.id)}
              >
                <div className="flex-grow">
                  <div className="flex mb-2 allign-top items-center">
                    <span className={`${getGroupColor(process.groupName, process.isSubgroup)}  text-l font-medium py-0.5 rounded min-w-[180px] text-center`}>
                      {process.isSubgroup ? `${process.subgroupName}` : process.groupName}
                    </span>
                    <h2 className="pl-6 text-xl font-semibold">{process.description}</h2>

                  </div>
                  <p className="text-gray-600 mb-3">{process.content}</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <p>
                      Created: <FormattedDate
                      date={CalculateDateTime(process.createdAt.time, process.createdAt.distance)} />
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
      </MaxWidthWrapper>
    </section>
  )
}

export default DebatesPage