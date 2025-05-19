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
    <div className="min-h-screen overflow-y-auto">
      <MaxWidthWrapper>
        <section className="py-8">
          <div className="lg:flex lg:space-x-8 space-y-8 lg:space-y-0">
            {/* Left column */}
            <div className="lg:w-2/3 space-y-8">
              <div className="bg-brand-50 shadow-md rounded-lg p-6">
                <h2 className="text-2xl text-brand-1 font-semibold mb-4">{currentGroup?.description}</h2>
                {currentGroup?.content && (
                  <div>
                    <p className="text-brand-950 whitespace-pre-wrap">{currentGroup.content}</p>
                  </div>
                )}
              </div>

              {currentGroup?.rules && (
                <div className="bg-brand-50 shadow-md rounded-lg p-6">
                  <h2 className="text-2xl text-brand-1 font-semibold mb-4">Group Rules</h2>
                  <p className="text-brand-950 whitespace-pre-wrap">{currentGroup.rules}</p>
                </div>
              )}

              {parentGroup && (
                <div className="bg-brand-50 shadow-md rounded-lg p-6">
                  <h2 className="text-2xl text-brand-1 font-semibold mb-4">Is Subgroup of:</h2>
                  <p className="text-brand-950">
                    <Link href="/about" onClick={() => handleGroupClick(parentGroup.name, true)}>
                      <span className="text-brand-900 hover:underline cursor-pointer">
                        {parentGroup.name}
                      </span>
                    </Link>
                  </p>
                </div>
              )}
            </div>

            {/* Right column */}
            <div className="lg:w-1/3 space-y-8">
              <div className="bg-brand-50 shadow-md rounded-lg p-6">
                <h2 className="text-2xl text-brand-1 font-semibold mb-4">Go to....</h2>
                <ul className="list-disc text-brand-950 pl-5">
                  <li>
                    <Link href="/debate">
                      <span className="text-brand-700 hover:underline cursor-pointer">Debate</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/calendar">
                      <span className="text-brand-700 hover:underline cursor-pointer">Calendar</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/tasks">
                      <span className="text-brand-700 hover:underline cursor-pointer">Tasks</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/messages">
                      <span className="text-brand-700 hover:underline cursor-pointer">Messages</span>
                    </Link>
                  </li>
                </ul>
              </div>

              {currentGroup?.subgroups && currentGroup.subgroups.length > 0 && (
                <div className="bg-brand-50 shadow-md rounded-lg p-6">
                  <h2 className="text-2xl text-brand-1 font-semibold mb-4">Subgroups</h2>
                  <ul className="list-disc text-brand-950 pl-5">
                    {currentGroup.subgroups
                      .sort((a, b) => {
                        if (a.IAmMember === b.IAmMember) return 0;
                        return a.IAmMember ? -1 : 1;
                      })
                      .map((subgroup, index) => (
                        <li key={index}>
                          {subgroup.IAmMember ? (
                            <Link href="/about" onClick={() => handleGroupClick(subgroup.name, false)}>
                              <span className="text-brand-700 hover:underline cursor-pointer">
                                {subgroup.name} (Member)
                              </span>
                            </Link>
                          ) : (
                            <span className="text-gray-500">
                              {subgroup.name} (Private)
                            </span>
                          )}
                        </li>
                      ))}
                  </ul>
                </div>
              )}

              <div className="bg-brand-50 shadow-md rounded-lg p-6">
                <h2 className="text-2xl text-brand-1 font-semibold mb-4">Group Statistics</h2>
                <ul className="list-disc text-brand-950 pl-5">
                  <li>Number of members: {
                    currentGroup?.name === "Rochefort" ? 14840 :
                    currentGroup?.name === "Sports in Rochefort" ? 247 :
                    currentGroup?.name === "Parents of Rochefort" ? 736 :
                    currentGroup?.members.length
                  }</li>
                  <li>Group type: {currentGroup?.isPublic ? 'Public' : 'Private'}</li>
                  <li>Your membership: {currentGroup?.IAmMember ? 'Member' : 'Not a member'}</li>
                  <li>Active debates: {stats.debates}</li>
                  <li>Upcoming appointments: {stats.appointments}</li>
                  <li>Open tasks: {stats.openTasks}</li>
                  <li>Active chats: {stats.chats}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </MaxWidthWrapper>
    </div>
  )
}

export default AboutPage