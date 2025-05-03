"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper"
import { useChat } from "@/context/ContextFiles/ChatContext"
import { GroupCheckboxes } from "@/components/ui/GroupCheckboxes"
import FormattedDate from "@/components/functions/FormattedDate"
import { useCheckbox } from "@/context/ContextFiles/CheckboxesContext"
import { Chat, Group, Member, RelativeTime } from "@/data/interfaces"
import { CalculateDateTime } from "@/components/functions/CalculateDateTime"
import { useMockup } from "@/context/ContextFiles/MockupContext"

const ChatsPage = () => {
  const router = useRouter()
  const { setChatId } = useChat()
  const { groups} = useCheckbox()
  const [isLoading, setIsLoading] = useState(true)
  const mockData = useMockup()

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const getDateFromRelativeTime = (relativeTime: RelativeTime | undefined): Date => {
    if (!relativeTime) return new Date(0)
    return CalculateDateTime(relativeTime.time, relativeTime.distance)
  }

  const chatMembersMap = useMemo(() => {
    const membersMap = new Map<number, Member[]>()
    mockData.forEach(group => {
      group.chats.forEach(chat => {
        const chatMembers = group.members.filter(member => chat.members.includes(member.id))
        membersMap.set(chat.id, chatMembers)
      })
      group.subgroups.forEach(subgroup => {
        subgroup.chats.forEach(chat => {
          const chatMembers = subgroup.members.filter(member => chat.members.includes(member.id))
          if (membersMap.has(chat.id)) {
            const existingMembers = membersMap.get(chat.id)!
            const newMembers = chatMembers.filter(member =>
              !existingMembers.some(existingMember => existingMember.id === member.id),
            )
            membersMap.set(chat.id, existingMembers.concat(newMembers))
          } else {
            membersMap.set(chat.id, chatMembers)
          }
        })
      })
    })
    return membersMap
  }, [mockData])

  const sortedAndFilteredChats = useMemo(() => {
    const filteredChats = mockData
      .flatMap((group: Group) => {
        const isGroupChecked = groups.find(g => g.name === group.name)?.checked
        const groupChats = isGroupChecked ? group.chats.map((chat: Chat) => ({ groupName: group.name, chat })) : []
        const subgroupChats = group.subgroups
          .filter((subgroup: Group) => groups.find(g => g.name === subgroup.name)?.checked)
          .flatMap((subgroup: Group) => subgroup.chats.map((chat: Chat) => ({ groupName: subgroup.name, chat })))
        return [...groupChats, ...subgroupChats]
      })
      .sort((a: { groupName: string; chat: Chat }, b: { groupName: string; chat: Chat }) => {
        const dateA = getDateFromRelativeTime(a.chat.messages[a.chat.messages.length - 1]?.at)
        const dateB = getDateFromRelativeTime(b.chat.messages[b.chat.messages.length - 1]?.at)
        return dateB.getTime() - dateA.getTime()
      })

    return filteredChats
  }, [groups, mockData])

  const handleChatClick = (chatId: number) => {
    setChatId(chatId.toString())
    router.push("/messages/chat")
  }

  if (isLoading) {
    return (
      <section className="bg-brand-25">
        <MaxWidthWrapper className="text-center py-8">
          <div>Loading...</div>
        </MaxWidthWrapper>
      </section>
    )
  }

  return (
    <section className="bg-brand-25">
      <MaxWidthWrapper>
        <div className="flex">
          <div className="w-1/4 pr-4">
            <GroupCheckboxes />
          </div>
          <div className="w-3/4">
            <div className="space-y-6">
              {sortedAndFilteredChats.map(({ groupName, chat }, index) => {
                const lastMessage = chat.messages[chat.messages.length - 1]
                const chatMembers = chatMembersMap.get(chat.id) || []

                let memberNames
                if (chatMembers.length <= 3) {
                  memberNames = chatMembers.map(member => member.name).join(", ")
                } else {
                  const firstThreeNames = chatMembers.slice(0, 3).map(member => member.name).join(", ")
                  memberNames = `${firstThreeNames} + ${chatMembers.length - 3} more`
                }

                const hasNewMessages = chat.messages.some(message => message.new)
                return (
                  <div
                    key={index}
                    className="p-6 bg-white rounded-md shadow cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => handleChatClick(chat.id)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-md">
                        {groupName}
                      </span>
                      {hasNewMessages && (
                        <div className="w-4 h-4 bg-brand-300 rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-grow text-left">
                      <h3 className="font-medium text-base text-gray-700 mb-2">{memberNames}</h3>
                      <p className="text-base text-gray-800 mb-2">
                        <span
                          className="font-medium">{chatMembers.find(member => member.id === lastMessage?.sentBy)?.name}: </span>
                        {lastMessage?.content || "No messages"}
                      </p>
                      <p className="text-sm text-gray-400">
                        {lastMessage ? <FormattedDate date={getDateFromRelativeTime(lastMessage.at)} /> : "No date"}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  )
}

export default ChatsPage