"use client"

import { useState, useEffect } from "react"
import { useChat } from "@/context/ChatContext"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { mockData } from "@/data/mockup"
import FormattedDate from "@/components/FormattedDate"
import { CalculateDateTime } from '@/components/CalculateDateTime'

const ChatPage = () => {
  const { chatId } = useChat()
  const [currentChat, setCurrentChat] = useState<any>(null)
  const [chatGroup, setChatGroup] = useState<string>("")

  useEffect(() => {
    if (chatId) {
      let foundChat: any = null;
      let foundGroup: string = "";

      mockData.some(group => {
        foundChat = group.chats.find(chat => chat.id.toString() === chatId);
        if (foundChat) {
          foundGroup = group.name;
          return true;
        }
        return group.subgroups.some(subgroup => {
          foundChat = subgroup.chats.find(chat => chat.id.toString() === chatId);
          if (foundChat) {
            foundGroup = subgroup.name;
            return true;
          }
          return false;
        });
      });

      if (foundChat) {
        foundChat = {
          ...foundChat,
          messages: foundChat.messages.map((msg: any) => ({
            ...msg,
            dateTime: CalculateDateTime(msg.time, msg.distance)
          }))
        };
      }

      setCurrentChat(foundChat);
      setChatGroup(foundGroup);
    }
  }, [chatId])

  return (
    <section className="relative py-24 sm:py-32">
      <MaxWidthWrapper>
        <div className="relative mx-auto flex flex-col items-center gap-10">
          {currentChat ? (
            <div className="w-full flex flex-col md:flex-row">
              {/* Left side - Chat info (visible from md viewport) */}
              <div className="hidden md:block w-1/4 pr-4 border-r">
                <h2 className="text-xl font-semibold mb-4">Chat Info</h2>
                <h3 className="font-medium">Group:</h3>
                <p className="mb-4">{chatGroup}</p>
                <h3 className="font-medium">Members:</h3>
                <ul className="list-disc list-inside mb-4">
                  {currentChat.members.map((member: any, index: number) => (
                    <li key={index}>{member.name}</li>
                  ))}
                </ul>
              </div>

              {/* Right side - Chat messages */}
              <div className="w-full md:w-3/4 md:pl-4 flex flex-col h-[600px]">
                <div className="flex-grow overflow-y-auto mb-4 space-y-4">
                  {currentChat.messages.map((message: any, index: number) => (
                    <div key={index} className={`flex ${message.sentBy === "You" ? "justify-end" : "justify-start"}`}>
                      <div className={`flex items-start space-x-2 max-w-[70%] ${message.sentBy === "You" ? "flex-row-reverse space-x-reverse" : ""}`}>
                        <div className={`p-3 rounded-lg ${message.sentBy === "You" ? "bg-brand-100 text-right" : "bg-gray-100"}`}>
                          <p className="font-medium">{message.sentBy}</p>
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            <FormattedDate date={message.dateTime} />
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-auto">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-300"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="text-xl font-semibold">
              No chat selected (ID: {chatId || "None"})
            </div>
          )}
        </div>
      </MaxWidthWrapper>
    </section>
  )
}

export default ChatPage