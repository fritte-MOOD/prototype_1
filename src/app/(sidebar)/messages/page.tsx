"use client"

import { useState, useMemo, useEffect, useCallback } from "react"
import { useRouter } from 'next/navigation';
import { Heading } from "@/components/heading"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { CircleAlert } from "lucide-react"
import { useGroup } from "@/context/GroupContext"
import { useChat } from "@/context/ChatContext"
import { mockData } from "@/data/mockup"

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
  const [visibleGroups, setVisibleGroups] = useState<{ [key: string]: boolean }>({});
  const [allActivated, setAllActivated] = useState(false);

  useEffect(() => {
    const initialState = Object.fromEntries(
      mockData
        .filter(group => group.IAmMember)
        .flatMap(group => [
          [group.name, false],
          ...group.subgroups
            .filter(subgroup => subgroup.IAmMember)
            .map(subgroup => [subgroup.name, false])
        ])
    );
    const matchingGroup = mockData.find(group => group.name === groupName);
    if (matchingGroup && matchingGroup.IAmMember) {
      initialState[matchingGroup.name] = true;
    }
    setVisibleGroups(initialState);
    setIsLoading(false);
  }, [groupName]);

  const toggleGroupVisibility = (groupName: string) => {
    setVisibleGroups(prev => ({ ...prev, [groupName]: !prev[groupName] }));
  }

  const toggleAllInCategory = (category: string) => {
    const group = mockData.find(g => g.name === category && g.IAmMember);
    if (!group) return;

    const allChecked = [group.name, ...group.subgroups.filter(s => s.IAmMember).map(s => s.name)]
      .every(name => visibleGroups[name]);

    setVisibleGroups(prev => {
      const newState = { ...prev };
      newState[group.name] = !allChecked;
      group.subgroups.forEach(subgroup => {
        if (subgroup.IAmMember) {
          newState[subgroup.name] = !allChecked;
        }
      });
      return newState;
    });
  }

  const toggleAllGroups = () => {
    const newState = !allActivated;
    setAllActivated(newState);
    setVisibleGroups(prev => {
      const updatedState = { ...prev };
      mockData.forEach(group => {
        if (group.IAmMember) {
          updatedState[group.name] = newState;
          group.subgroups.forEach(subgroup => {
            if (subgroup.IAmMember) {
              updatedState[subgroup.name] = newState;
            }
          });
        }
      });
      return updatedState;
    });
  };

  const sortedAndFilteredChats = useMemo(() => {
    return mockData
      .flatMap(group => {
        const groupChats = visibleGroups[group.name] ? group.chats.map(chat => ({ groupName: group.name, chat })) : [];
        const subgroupChats = group.subgroups
          .filter(subgroup => visibleGroups[subgroup.name])
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
  }, [visibleGroups]);

  const categories = mockData.filter(group => group.IAmMember).map(group => group.name);

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
      <MaxWidthWrapper className="text-center">
        <div className="relative mx-auto text-center flex flex-col items-center gap-10">
          <div>
            <Heading>Chats</Heading>
          </div>

          {/* Activate All checkbox */}
          <div className="w-full max-w-3xl flex justify-start mb-4">
            <label className="flex items-center font-semibold">
              <input
                type="checkbox"
                checked={allActivated}
                onChange={toggleAllGroups}
                className="mr-2"
              />
              Activate All
            </label>
          </div>

          {/* Checkboxes for categories */}
          <div className="w-full max-w-3xl flex flex-row justify-between gap-4 mb-8">
            {categories.map(category => {
              const group = mockData.find(g => g.name === category && g.IAmMember);
              if (!group) return null;

              return (
                <div key={category} className="flex-1">
                  <label className="flex items-center font-semibold mb-2">
                    <input
                      type="checkbox"
                      checked={[group.name, ...group.subgroups.filter(s => s.IAmMember).map(s => s.name)]
                        .every(name => visibleGroups[name])}
                      onChange={() => toggleAllInCategory(category)}
                      className="mr-2"
                    />
                    All {category}
                  </label>
                  <div className="space-y-1">
                    <label className="flex items-center text-sm">
                      <input
                        type="checkbox"
                        checked={visibleGroups[group.name]}
                        onChange={() => toggleGroupVisibility(group.name)}
                        className="mr-2"
                      />
                      {group.name}
                    </label>
                    {group.subgroups
                      .filter(subgroup => subgroup.IAmMember)
                      .map(subgroup => (
                        <label key={subgroup.name} className="flex items-center text-sm">
                          <input
                            type="checkbox"
                            checked={visibleGroups[subgroup.name]}
                            onChange={() => toggleGroupVisibility(subgroup.name)}
                            className="mr-2"
                          />
                          {subgroup.name}
                        </label>
                      ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chats sorted by datetime */}
          <div className="w-full max-w-3xl space-y-4">
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
      </MaxWidthWrapper>
    </section>
  )
}

export default Page