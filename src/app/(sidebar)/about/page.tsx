"use client"

import { useEffect, useState } from "react"
import { useGroup } from "@/context/ContextFiles/GroupContext"
import { useMockup } from "@/context/ContextFiles/MockupContext"
import { useCheckbox } from "@/context/ContextFiles/CheckboxesContext"
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper"
import { Heading } from "@/components/ui/heading"
import { Task, Group } from "@/data/interfaces"
import Link from "next/link"

const AboutPage = () => {
  const { groupName, setGroupName } = useGroup()
  const { activateOnlySub, activateMainAndSubs } = useCheckbox()
  const mockData = useMockup()
  const [currentGroup, setCurrentGroup] = useState<Group | null>(null)
  const [parentGroup, setParentGroup] = useState<Group | null>(null)
  const [stats, setStats] = useState({ debates: 0, appointments: 0, openTasks: 0, chats: 0 })

  useEffect(() => {
    const findGroupAndParent = (groups: Group[], targetName: string, parent: Group | null = null): [Group | null, Group | null] => {
      for (const group of groups) {
        if (group.name === targetName) return [group, parent]
        const [subgroup, subParent] = findGroupAndParent(group.subgroups, targetName, group)
        if (subgroup) return [subgroup, subParent]
      }
      return [null, null]
    }

    const [group, parent] = findGroupAndParent(mockData, groupName)
    if (group) {
      setCurrentGroup(group)
      setParentGroup(parent)
      const newStats = {
        debates: group.processes.filter(p => p.modules.some(m => m.type === "Debate")).length,
        appointments: group.appointments.length,
        openTasks: group.tasks.filter((t: Task) => !t.done).length,
        chats: group.chats.length
      }
      setStats(newStats)
    }
  }, [groupName, mockData])

  const handleGroupClick = (clickedGroupName: string, isMainGroup: boolean) => {
    setGroupName(clickedGroupName)
    if (isMainGroup) {
      activateMainAndSubs(clickedGroupName)
    } else {
      activateOnlySub(clickedGroupName)
    }
  }

  return (
    <MaxWidthWrapper>
      <section className="py-12">
        <div className="text-center mb-8">
          <Heading>About {currentGroup?.name}</Heading>
        </div>

        <div className="mt-8 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4"> {currentGroup?.description}</h2>
          {currentGroup?.content && (
            <div>
              <p className="text-gray-600 whitespace-pre-wrap">{currentGroup.content}</p>
            </div>
          )}
          {parentGroup && (
            <p className="text-gray-600 mt-4">
              Broader Group:{' '}
              <Link href="/about" onClick={() => handleGroupClick(parentGroup.name, true)}>
                <span className="text-blue-600 hover:underline cursor-pointer">
                  {parentGroup.name}
                </span>
              </Link>
            </p>
          )}
        </div>

        {currentGroup?.rules && (
          <div className="mt-8 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Group Rules</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{currentGroup.rules}</p>
          </div>
        )}

        <div className="mt-8 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Group Statistics</h2>
          <ul className="list-disc pl-5">
            <li>Number of members: {currentGroup?.members.length}</li>
            <li>Group type: {currentGroup?.isPublic ? 'Public' : 'Private'}</li>
            <li>Your membership: {currentGroup?.IAmMember ? 'Member' : 'Not a member'}</li>
            <li>Active debates: {stats.debates}</li>
            <li>Upcoming appointments: {stats.appointments}</li>
            <li>Open tasks: {stats.openTasks}</li>
            <li>Active chats: {stats.chats}</li>
          </ul>
        </div>

        {currentGroup?.subgroups && currentGroup.subgroups.length > 0 && (
          <div className="mt-8 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Subgroups</h2>
            <ul className="list-disc pl-5">
              {currentGroup.subgroups.map((subgroup, index) => (
                <li key={index}>
                  <Link href="/about" onClick={() => handleGroupClick(subgroup.name, false)}>
                    <span className="text-blue-600 hover:underline cursor-pointer">
                      {subgroup.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </MaxWidthWrapper>
  )
}

export default AboutPage