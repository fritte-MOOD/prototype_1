"use client"

import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper"
import { GroupCheckboxes } from "@/components/ui/GroupCheckboxes"
import { useMemo } from "react"
import FormattedDate from "@/components/functions/FormattedDate"
import { useCheckbox } from "@/context/ContextFiles/CheckboxesContext"
import { CheckCircle, Circle } from "lucide-react"
import { Group, Task } from "@/data/interfaces"
import { CalculateDateTime } from "@/components/functions/CalculateDateTime"
import { useMockup } from "@/context/ContextFiles/MockupContext"

const TasksPage = () => {
  const { groups } = useCheckbox()
  const mockData = useMockup()

  const tasks = useMemo(() => {
    const allTasks = mockData.flatMap((group: Group) => {
      const isGroupChecked = groups.find(g => g.name === group.name)?.checked
      const groupTasks = isGroupChecked ? group.tasks.map(task => ({
        ...task,
        group: group.name,
        subgroup: group.name,
      })) : []
      const subgroupTasks = group.subgroups
        .filter(subgroup => groups.find(g => g.name === subgroup.name)?.checked)
        .flatMap(subgroup => subgroup.tasks.map(task => ({ ...task, group: group.name, subgroup: subgroup.name })))
      return [...groupTasks, ...subgroupTasks]
    })

    return allTasks.sort((a: Task, b: Task) => {
      if (a.done !== b.done) {
        return a.done ? 1 : -1
      }

      const dateA = CalculateDateTime(a.dueAt.time, a.dueAt.distance)
      const dateB = CalculateDateTime(b.dueAt.time, b.dueAt.distance)

      return dateB.getTime() - dateA.getTime() // Most recent first
    })
  }, [groups, mockData])

  return (
    <section className="bg-brand-25">
      <MaxWidthWrapper>
        <div className="flex w-full">
          <div className="w-1/4 pr-4">
            <GroupCheckboxes />
          </div>
          <div className="w-3/4">
            {tasks.map((task: Task & { group: string; subgroup: string }, index: number) => {
              const taskDate = CalculateDateTime(task.dueAt.time, task.dueAt.distance)

              return (
                <div key={index} className="mb-4 p-4 bg-white rounded shadow flex items-start">
                  <div className="mr-3 mt-1">
                    {task.done ? (
                      <CheckCircle className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Circle className="w-5 h-5 text-brand-300" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold">{task.description}</h3>
                    <p>Subgroup: {task.subgroup}</p>
                    <p>Due: <FormattedDate date={taskDate} /></p>
                    <p className="text-sm text-gray-600 mt-2">{task.content}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  )
}

export default TasksPage