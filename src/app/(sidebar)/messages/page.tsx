"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter } from 'next/navigation';
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { useGroup } from "@/context/GroupContext"
import { useChat } from "@/context/ChatContext"
import { mockData } from "@/data/mockup"
import { GroupCheckboxes } from '@/components/GroupCheckboxes'
import FormattedDate from '@/components/FormattedDate';
import { CalculateDateTime } from '@/components/CalculateDateTime';
import { useCheckbox } from '@/context/CheckboxesContext'

interface Message {
  sentBy: string;
  time: string;
  distance: number;
  content: string;
}

interface Chat {
  id: number; // Added id to Chat interface
  members: Member[];
  messages: Message[];
  new?: boolean; // Added new property to Chat interface
}

interface Member {
  name: string;
  commonGroups: string[];
}

interface Group {
  name: string;
  IAmMember: boolean;
  subgroups: Group[];
  members: Member[];
  chats: Chat[];
}

const Page = () => {
  const router = useRouter();
  const { groupName } = useGroup();
  const { setChatId } = useChat();
  const { groups, toggleGroup } = useCheckbox();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('Page component mounted. mockData:', mockData);
    setIsLoading(false);
  }, []);

  const sortedAndFilteredChats = useMemo(() => {
    console.log('Processing chats. mockData:', mockData);
    console.log('Current groups state:', groups);

    const filteredChats = mockData
      .flatMap(group => {
        const isGroupChecked = groups.find(g => g.name === group.name)?.checked;
        const groupChats = isGroupChecked ? group.chats.map(chat => ({ groupName: group.name, chat })) : [];
        const subgroupChats = group.subgroups
          .filter(subgroup => groups.find(g => g.name === subgroup.name)?.checked)
          .flatMap(subgroup => subgroup.chats.map(chat => ({ groupName: subgroup.name, chat })));
        return [...groupChats, ...subgroupChats];
      })
      .map(({ groupName, chat }) => ({
        groupName,
        chat: {
          ...chat,
          messages: chat.messages.map(msg => ({
            ...msg,
            dateTime: CalculateDateTime(msg.time, msg.distance)
          }))
        }
      }))
      .sort((a, b) => {
        const dateA = a.chat.messages[a.chat.messages.length - 1]?.dateTime || new Date(0);
        const dateB = b.chat.messages[b.chat.messages.length - 1]?.dateTime || new Date(0);
        return dateB.getTime() - dateA.getTime();
      });
    
    console.log('Processed and filtered chats:', filteredChats);
    return filteredChats;
  }, [groups]);

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

  console.log('Rendering chat list. sortedAndFilteredChats:', sortedAndFilteredChats);

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
                const memberNames = chat.members.map(member => member.name).join(', ');
                return (
                  <div 
                    key={index} 
                    className="flex items-center p-4 bg-white rounded-lg shadow cursor-pointer hover:bg-gray-50"
                    onClick={() => handleChatClick(chat.id)}
                  >
                    <div className="w-6 mr-4 flex items-center justify-center">
                      {chat.new && (
                        <div className="w-3 h-3 bg-brand-300 rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-grow text-left">
                      <h3 className="font-medium">{memberNames}</h3>
                      <p className="text-sm text-gray-500">
                        <span className="font-medium">{lastMessage?.sentBy}: </span>
                        {lastMessage?.content || "No messages"}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {lastMessage ? <FormattedDate date={lastMessage.dateTime} /> : "No date"}
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

export default Page