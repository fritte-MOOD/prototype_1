"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter } from 'next/navigation';
import { Heading } from "@/components/heading"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { CircleAlert } from "lucide-react"
import { useGroup } from "@/context/GroupContext"
import { useChat } from "@/context/ChatContext"
import { mockData } from "@/data/mockup"
import { GroupCheckboxes } from '@/components/GroupCheckboxes'

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

function calculateDateTime(time: string, distance: number): Date {
  const [hours, minutes] = time.split(':').map(Number);
  const date = new Date();
  date.setDate(date.getDate() + distance);
  date.setHours(hours, minutes, 0, 0);
  return date;
}

function formatDate(date: Date): string {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return `Today at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}`;
  } else if (diffDays === 1) {
    return date > now
      ? `Tomorrow at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}`
      : `Yesterday at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}`;
  } else if (diffDays < 7) {
    return date.toLocaleString('en-US', { weekday: 'long', hour: '2-digit', minute: '2-digit', hour12: false });
  } else {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  }
}

const Page = () => {
  const router = useRouter();
  const { groupName } = useGroup();
  const { setChatId } = useChat();
  const [isLoading, setIsLoading] = useState(true);
  const [checkedGroups, setCheckedGroups] = useState<{ [key: string]: boolean }>({});

  const allGroups = useMemo(() => {
    return mockData
      .filter(group => group.IAmMember)
      .map(group => ({
        name: group.name,
        subgroups: group.subgroups.filter(subgroup => subgroup.IAmMember).map(subgroup => subgroup.name)
      }))
  }, [])

  useEffect(() => {
    const initialState = Object.fromEntries(
      allGroups.flatMap(group => [
        [group.name, false],
        ...group.subgroups.map(subgroup => [subgroup, false])
      ])
    )
    const matchingGroup = allGroups.find(group => group.name === groupName)
    if (matchingGroup) {
      initialState[matchingGroup.name] = true
    }
    setCheckedGroups(initialState)
    setIsLoading(false)
  }, [groupName, allGroups])

  const sortedAndFilteredChats = useMemo(() => {
    return mockData
      .flatMap(group => {
        const groupChats = checkedGroups[group.name] ? group.chats.map(chat => ({ groupName: group.name, chat })) : [];
        const subgroupChats = group.subgroups
          .filter(subgroup => checkedGroups[subgroup.name])
          .flatMap(subgroup => subgroup.chats.map(chat => ({ groupName: subgroup.name, chat })));
        return [...groupChats, ...subgroupChats];
      })
      .map(({ groupName, chat }) => ({
        groupName,
        chat: {
          ...chat,
          messages: chat.messages.map(msg => ({
            ...msg,
            dateTime: calculateDateTime(msg.time, msg.distance)
          }))
        }
      }))
      .sort((a, b) => {
        const dateA = a.chat.messages[a.chat.messages.length - 1]?.dateTime || new Date(0);
        const dateB = b.chat.messages[b.chat.messages.length - 1]?.dateTime || new Date(0);
        return dateB.getTime() - dateA.getTime();
      });
  }, [checkedGroups]);

  const handleChatClick = (chatId: number) => {
    setChatId(chatId.toString());
    router.push('/messages/chat');
  };

  if (isLoading) {
    return (
      <section className="relative py-24 sm:py-32">
        <MaxWidthWrapper className="text-center">
          <div>Loading...</div>
        </MaxWidthWrapper>
      </section>
    );
  }

  return (
    <section className="relative py-24 sm:py-32">
      <MaxWidthWrapper>
        <div className="flex-1 flex flex-col md:flex-row">
          <div className="md:w-64 pr-4 flex-shrink-0">
            <div className="md:sticky md:top-16">
              <GroupCheckboxes 
                allGroups={allGroups}
                checkedGroups={checkedGroups}
                setCheckedGroups={setCheckedGroups}
              />
            </div>
          </div>
          <div className="flex-1 min-w-0">
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
                    <div className="w-6 mr-4">
                      {chat.new && <CircleAlert className="text-brand-300" />}
                    </div>
                    <div className="flex-grow text-left">
                      <h3 className="font-medium">{memberNames}</h3>
                      <p className="text-sm text-gray-500">
                        <span className="font-medium">{lastMessage?.sentBy}: </span>
                        {lastMessage?.content || "No messages"}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {lastMessage ? formatDate(lastMessage.dateTime) : "No date"}
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