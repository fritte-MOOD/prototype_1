"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter } from 'next/navigation';
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { useChat } from "@/context/ContextFiles/ChatContext"
import { GroupCheckboxes } from '@/components/GroupCheckboxes'
import FormattedDate from '@/components/FormattedDate';
import { useCheckbox } from '@/context/ContextFiles/CheckboxesContext'
import { Message, Chat, Member, Group, RelativeTime } from "@/data/interfaces"
import { CalculateDateTime } from '@/components/CalculateDateTime';
import { useMockup } from "@/context/ContextFiles/MockupContext"

const ChatsPage = () => {
  const router = useRouter();
  const { setChatId } = useChat();
  const { groups, toggleGroup } = useCheckbox();
  const [isLoading, setIsLoading] = useState(true);
  const mockData = useMockup();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const getDateFromRelativeTime = (relativeTime: RelativeTime | undefined): Date => {
    if (!relativeTime) return new Date(0);
    return CalculateDateTime(relativeTime.time, relativeTime.distance);
  };

  const sortedAndFilteredChats = useMemo(() => {
    const filteredChats = mockData
      .flatMap((group: Group) => {
        const isGroupChecked = groups.find(g => g.name === group.name)?.checked;
        const groupChats = isGroupChecked ? group.chats.map((chat: Chat) => ({ groupName: group.name, chat })) : [];
        const subgroupChats = group.subgroups
          .filter((subgroup: Group) => groups.find(g => g.name === subgroup.name)?.checked)
          .flatMap((subgroup: Group) => subgroup.chats.map((chat: Chat) => ({ groupName: subgroup.name, chat })));
        return [...groupChats, ...subgroupChats];
      })
      .sort((a: { groupName: string; chat: Chat }, b: { groupName: string; chat: Chat }) => {
        const dateA = getDateFromRelativeTime(a.chat.messages[a.chat.messages.length - 1]?.at);
        const dateB = getDateFromRelativeTime(b.chat.messages[b.chat.messages.length - 1]?.at);
        return dateB.getTime() - dateA.getTime();
      });

    return filteredChats;
  }, [groups, mockData]);

  const handleChatClick = (chatId: number) => {
    setChatId(chatId.toString());
    router.push('/messages/chat');
  };

  if (isLoading) {
    return (
      <section className="bg-brand-25">
        <MaxWidthWrapper className="text-center py-8">
          <div>Loading...</div>
        </MaxWidthWrapper>
      </section>
    );
  }

  return (
    <section className="bg-brand-25">
      <MaxWidthWrapper>
        <div className="flex">
          <div className="w-1/4 pr-4">
            <GroupCheckboxes />
          </div>
          <div className="w-3/4">
            <div className="space-y-4">
              {sortedAndFilteredChats.map(({ groupName, chat }, index) => {
                const lastMessage = chat.messages[chat.messages.length - 1];
                const chatMembers = mockData
                  .flatMap(group => [...group.members, ...group.subgroups.flatMap(subgroup => subgroup.members)])
                  .filter(member => chat.members.includes(member.id));
                const memberNames = chatMembers.map(member => member.name).join(', ');
                const hasNewMessages = chat.messages.some(message => message.new);
                return (
                  <div 
                    key={index} 
                    className="flex items-center p-4 bg-white rounded-lg shadow cursor-pointer hover:bg-gray-50"
                    onClick={() => handleChatClick(chat.id)}
                  >
                    <div className="w-6 mr-4 flex items-center justify-center">
                      {hasNewMessages && (
                        <div className="w-3 h-3 bg-brand-300 rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-grow text-left">
                      <h3 className="font-medium">{memberNames}</h3>
                      <p className="text-sm text-gray-500">
                        <span className="font-medium">{chatMembers.find(member => member.id === lastMessage?.sentBy)?.name}: </span>
                        {lastMessage?.content || "No messages"}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {lastMessage ? <FormattedDate date={getDateFromRelativeTime(lastMessage.at)} /> : "No date"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  )
}

export default ChatsPage