"use client"

import { buttonVariants } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { cn } from "@/utils"
import { Gem, Home, MessageSquareText, Users, Pickaxe, Shield, UserRoundPen, CalendarDays, MessagesSquare, Globe, Key, LucideIcon,SquareCheckBig, Menu, Settings,Volleyball, X, Boxes, Box, Combine, File, BookOpenText, ChartNoAxesCombined, MessageCircleOff, BookKey} from "lucide-react"
import Link from "next/link"
import { PropsWithChildren, useState } from "react"
import { Navbar } from "@/components/navbar_sidebar"

interface SidebarItem {
  href: string
  icon: LucideIcon
  text: string
}

interface SidebarCategory {
  category: string
  items: SidebarItem[]
}

const SIDEBAR_ITEMS: SidebarCategory[] = [
  {
    category: "Main",
    items: [
      { href: "/about", icon: Volleyball, text: "About Park Club" },
      { href: "/subgroups", icon: Boxes, text: "Subgroups" },
      { href: "/debate", icon: Combine, text: "Debate" },
    ],
  },

  {
    category: "Organize",
    items: [
      { href: "/calendar", icon: CalendarDays, text: "Calendar" },
      { href: "/tasks", icon: SquareCheckBig, text: "Tasks" },
      { href: "/messages", icon: MessageSquareText, text: "Messages" },
      { href: "", icon: File, text: "Documents" }
    ],
  },


  {
    category: "Components",
    items: [
      { href: "", icon: BookOpenText, text: "Knowledge Hub" },
      { href: "", icon: ChartNoAxesCombined, text: "Analyze Tools" },
      { href: "", icon: Shield, text: "Moderate" },
      { href: "", icon: BookKey, text: "Administrate" },
    ],
  },


  {
    category: "",
    items: [
      { href: "", icon: UserRoundPen, text: "Profile" },
    ],
  },
]

const Sidebar = ({ onClose }: { onClose?: () => void }) => {
  return (
    <div className="space-y-4 md:space-y-6 relative z-20 flex flex-col flex-1">
  {/* Navigation Items */}
  <div className="flex-grow">
    <ul>
      {SIDEBAR_ITEMS.map(({ category, items }) => (
        <li key={category} className="mb-4 md:mb-8">
          <p className="text-xs font-medium leading-6 text-zinc-500">
            {category}
          </p>
          <div className="-mx-2 flex flex-1 flex-col">
            {items.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "w-full justify-start group flex items-center gap-x-2.5 rounded-md px-2 py-1.5 text-sm font-medium leading-6  hover:bg-brand-300 transition"
                )}
                onClick={onClose}
              >
                <item.icon className="size-4 text-zinc-500 group-hover:text-white transition" />
                {item.text}
              </Link>
            ))}
          </div>
        </li>
      ))}
    </ul>
  </div>
</div>

  )
}

const Layout = ({ children }: PropsWithChildren) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        {/* sidebar for desktop */}
        <div className="hidden sm:block w-45 lg:w-64 flex-shrink-0">
          <div className="fixed top-14 bottom-0 w-45 lg:w-64 overflow-y-auto border-r border-gray-100 p-6">
            <Sidebar />
          </div>
        </div>

        <div className="flex-1 flex flex-col min-h-0">
          {/* mobile header */}
          <div className="sm:hidden h-14 flex items-center justify-between px-[26px] width-full border-b border-gray-200">
            <Link href="/" className="flex z-40 font-bold text-lg">
              <span className="text-brand-300">/</span>MOOD
            </Link>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="text-gray-500 hover:text-gray-600"
            >
              <Menu className="size-6" />
            </button>
          </div>

          {/* main content area */}
          <div className="flex-1 overflow-y-auto bg-brand-25 shadow-md p-4 md:p-6">
            {children}
          </div>

          <Modal
            className="p-4"
            showModal={isDrawerOpen}
            setShowModal={setIsDrawerOpen}
          >
            <div className="flex justify-between items-center mb-4">
              <button
                aria-label="Close modal"
                onClick={() => setIsDrawerOpen(false)}
              >
                <X className="size-6" />
              </button>
            </div>

            <div>
              <Sidebar />
            </div>
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default Layout