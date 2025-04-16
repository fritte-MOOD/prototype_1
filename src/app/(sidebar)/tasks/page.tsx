"use client";

import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { GroupCheckboxes } from "@/components/GroupCheckboxes"
import { mockData } from "@/data/mockup"
import { useMemo } from "react"
import FormattedDate from "@/components/FormattedDate"
import { useCheckbox } from '@/context/CheckboxesContext'
import { Circle, CheckCircle } from 'lucide-react'

const Page = () => {
  const { groups } = useCheckbox();

  const tasks = useMemo(() => {
    const allTasks = mockData.flatMap(group => {
      const isGroupChecked = groups.find(g => g.name === group.name)?.checked;
      const groupTasks = isGroupChecked ? group.tasks.map(task => ({ ...task, group: group.name, subgroup: group.name })) : [];
      const subgroupTasks = group.subgroups
        .filter(subgroup => groups.find(g => g.name === subgroup.name)?.checked)
        .flatMap(subgroup => subgroup.tasks.map(task => ({ ...task, group: group.name, subgroup: subgroup.name })));
      return [...groupTasks, ...subgroupTasks];
    });

    return allTasks.sort((a, b) => {
      // First, sort by 'done' status (false first)
      if (a.done !== b.done) {
        return a.done ? 1 : -1;
      }
      
      // If 'done' status is the same, sort by due date
      const dateA = new Date();
      dateA.setDate(dateA.getDate() + a.distance);
      const [hoursA, minutesA] = a.time.split(':');
      dateA.setHours(parseInt(hoursA), parseInt(minutesA));

      const dateB = new Date();
      dateB.setDate(dateB.getDate() + b.distance);
      const [hoursB, minutesB] = b.time.split(':');
      dateB.setHours(parseInt(hoursB), parseInt(minutesB));

      return dateA.getTime() - dateB.getTime();
    });
  }, [groups]);

  return (
    <section className="bg-brand-25">
      <MaxWidthWrapper>
        <div className="flex w-full">
          <div className="w-1/4 pr-4">
            <GroupCheckboxes />
          </div>
          <div className="w-3/4">
            {tasks.map((task, index) => {
              const taskDate = new Date();
              taskDate.setDate(taskDate.getDate() + task.distance);
              const [hours, minutes] = task.time.split(':');
              taskDate.setHours(parseInt(hours), parseInt(minutes));

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
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  )
}

export default Page