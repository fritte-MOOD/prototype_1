"use client"

import { useEffect, useState } from "react"
import { useGroup } from "@/context/ContextFiles/GroupContext"
import { useMockup } from "@/context/ContextFiles/MockupContext"
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper"
import { Heading } from "@/components/ui/heading"
import { Task } from "@/data/interfaces"

const groupInfo = {
  "Marin Quarter": "to be added soon",
  "Park Club": "to be added soon",
  "Rochefort": "to be added soon",
}

const AboutPage = () => {
  const { groupName } = useGroup()
  const mockData = useMockup()
  const [mainGroupName, setMainGroupName] = useState("")

  useEffect(() => {
    const currentGroup = mockData.find(group => group.name === groupName)
    if (currentGroup) {
      setMainGroupName(currentGroup.name)
      const allGroups = [currentGroup, ...currentGroup.subgroups]
      const newStats = allGroups.reduce((acc, group) => {
        acc.debates += group.processes.filter(p => p.modules.some(m => m.type === "Debate")).length
        acc.appointments += group.appointments.length
        acc.openTasks += group.tasks.filter((t: Task) => !t.done).length
        acc.chats += group.chats.length
        return acc
      }, { debates: 0, appointments: 0, openTasks: 0, chats: 0 })
    }
  }, [groupName, mockData])

  return (
    <MaxWidthWrapper>
      <section className="py-12">
        <div className="text-center mb-8">
          <Heading>About {mainGroupName}</Heading>
        </div>

        <div className="mt-8 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">General Information</h2>
          <p className="text-gray-600">
            {groupInfo[mainGroupName as keyof typeof groupInfo] || "No information available for this group."}
          </p>
        </div>


      </section>
    </MaxWidthWrapper>
  )
}

export default AboutPage