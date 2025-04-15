"use client"

import { useState, useMemo, useEffect } from "react"
import { Heading } from "@/components/heading"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { MessageSquare } from "lucide-react"
import { useGroup } from "@/context/GroupContext"

type Chat = {
  id: string
  name: string
  lastMessage: string
  datetime: string
  groupId: string
  groupName: string
}

type Group = {
  id: string
  name: string
  category: "Park Club" | "Rochefort" | "Marin Quarter"
}

const chatGroups: Group[] = [
  { id: "group1", name: "Park Club", category: "Park Club" },
  { id: "group2", name: "Executive Committee", category: "Park Club" },
  { id: "group3", name: "2nd Senior Team", category: "Park Club" },
  { id: "group4", name: "Construction Committee", category: "Park Club" },
  { id: "group5", name: "Training Organization", category: "Park Club" },
  { id: "group6", name: "Rochefort", category: "Rochefort" },
  { id: "group7", name: "Parents of Rochefort", category: "Rochefort" },
  { id: "group8", name: "Sports in Rochefort", category: "Rochefort" },
  { id: "group9", name: "Marin Quarter", category: "Marin Quarter" },
  { id: "group10", name: "House 24", category: "Marin Quarter" },
  { id: "group11", name: "Handcrafts Friday", category: "Marin Quarter" },
  { id: "group12", name: "Shared Dinner", category: "Marin Quarter" },
]

const chats: Chat[] = [
  { id: "chat1", name: "Park Club General", lastMessage: "Welcome to Park Club!", datetime: "2023-06-20T09:00:00", groupId: "group1", groupName: "Park Club" },
  { id: "chat2", name: "Executive Discussion", lastMessage: "Meeting at 3 PM", datetime: "2023-06-20T14:30:00", groupId: "group2", groupName: "Executive Committee" },
  { id: "chat3", name: "Team Chat", lastMessage: "Great game yesterday, team!", datetime: "2023-06-20T10:00:00", groupId: "group3", groupName: "2nd Senior Team" },
  { id: "chat4", name: "Construction Updates", lastMessage: "New gym construction starts next week", datetime: "2023-06-20T11:15:00", groupId: "group4", groupName: "Construction Committee" },
  { id: "chat5", name: "Training Schedule", lastMessage: "Extra practice this Saturday", datetime: "2023-06-20T08:45:00", groupId: "group5", groupName: "Training Organization" },
  { id: "chat6", name: "Rochefort Community", lastMessage: "Town hall meeting next Monday", datetime: "2023-06-20T16:00:00", groupId: "group6", groupName: "Rochefort" },
  { id: "chat7", name: "Parent Meeting", lastMessage: "Don't forget the PTA meeting next week", datetime: "2023-06-20T13:30:00", groupId: "group7", groupName: "Parents of Rochefort" },
  { id: "chat8", name: "Local Tournament", lastMessage: "Sign-ups for the summer tournament are open", datetime: "2023-06-20T15:45:00", groupId: "group8", groupName: "Sports in Rochefort" },
  { id: "chat9", name: "Marin Quarter News", lastMessage: "Community garden opening next month", datetime: "2023-06-20T17:20:00", groupId: "group9", groupName: "Marin Quarter" },
  { id: "chat10", name: "House Maintenance", lastMessage: "Plumber coming on Monday", datetime: "2023-06-20T12:00:00", groupId: "group10", groupName: "House 24" },
  { id: "chat11", name: "Craft Ideas", lastMessage: "Bringing materials for origami this week", datetime: "2023-06-20T18:30:00", groupId: "group11", groupName: "Handcrafts Friday" },
  { id: "chat12", name: "Menu Planning", lastMessage: "Vegetarian option needed for Saturday", datetime: "2023-06-20T19:45:00", groupId: "group12", groupName: "Shared Dinner" },
]

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

const Page = () => {
  const { groupName } = useGroup();
  const [isLoading, setIsLoading] = useState(true);
  const [visibleGroups, setVisibleGroups] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const initialState = Object.fromEntries(chatGroups.map(group => [group.id, false]));
    const matchingGroup = chatGroups.find(group => group.name === groupName);
    if (matchingGroup) {
      initialState[matchingGroup.id] = true;
    }
    setVisibleGroups(initialState);
    setIsLoading(false);
  }, [groupName]);

  useEffect(() => {
    if (!isLoading) {
      setVisibleGroups(prev => {
        const newState = { ...prev };
        chatGroups.forEach(group => {
          newState[group.id] = group.name === groupName;
        });
        return newState;
      });
    }
  }, [groupName, isLoading]);

  const toggleGroupVisibility = (groupId: string) => {
    setVisibleGroups(prev => ({ ...prev, [groupId]: !prev[groupId] }));
  }

  const toggleAllInCategory = (category: string) => {
    const groupsInCategory = chatGroups.filter(group => group.category === category);
    const allChecked = groupsInCategory.every(group => visibleGroups[group.id]);
    setVisibleGroups(prev => {
      const newState = { ...prev };
      groupsInCategory.forEach(group => {
        newState[group.id] = !allChecked;
      });
      return newState;
    });
  }

  const sortedAndFilteredChats = useMemo(() => {
    return chats
      .filter(chat => visibleGroups[chat.groupId])
      .sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime());
  }, [visibleGroups]);

  const categories = ["Park Club", "Rochefort", "Marin Quarter"];

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
    <>
      <section className="relative py-24 sm:py-32">
        <MaxWidthWrapper className="text-center">
          <div className="relative mx-auto text-center flex flex-col items-center gap-10">
            {/* Display the active group name */}
            <div className="mb-4 text-lg font-semibold">
              Active Group: {groupName || "No group selected"}
            </div>

            <div>
              <Heading>Chats</Heading>
            </div>
            
            {/* Checkboxes at the top */}
            <div className="w-full max-w-3xl flex flex-row justify-between gap-4 mb-8">
              {categories.map(category => (
                <div key={category} className="flex-1">
                  <label className="flex items-center font-semibold mb-2">
                    <input
                      type="checkbox"
                      checked={chatGroups.filter(group => group.category === category).every(group => visibleGroups[group.id])}
                      onChange={() => toggleAllInCategory(category)}
                      className="mr-2"
                    />
                    All {category}
                  </label>
                  <div className="space-y-1">
                    {chatGroups.filter(group => group.category === category).map(group => (
                      <label key={group.id} className="flex items-center text-sm">
                        <input
                          type="checkbox"
                          checked={visibleGroups[group.id]}
                          onChange={() => toggleGroupVisibility(group.id)}
                          className="mr-2"
                        />
                        {group.name}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Chats sorted by datetime */}
            <div className="w-full max-w-3xl space-y-4">
              {sortedAndFilteredChats.map(chat => (
                <div key={chat.id} className="flex items-center p-4 bg-white rounded-lg shadow">
                  <MessageSquare className="text-brand-300 mr-4" />
                  <div className="flex-grow text-left">
                    <h3 className="font-medium">{chat.name}</h3>
                    <p className="text-sm text-gray-500">{chat.lastMessage}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {chat.groupName} - {formatDate(chat.datetime)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  )
}

export default Page