"use client"

import { useState, useEffect } from "react";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { MessageCircle, Calendar, MessageSquareText, Shield, Gem, Home, Users, Pickaxe, UserRoundPen, CalendarDays, MessagesSquare, Globe, Key, LucideIcon, SquareCheckBig, Menu, Settings, Volleyball, X, Boxes, Box, Combine, File, BookOpenText, ChartNoAxesCombined, MessageCircleOff, BookKey } from "lucide-react";
import { ButtonLandingPage } from "@/components/ButtonLandingPage"
import { Heading } from "@/components/heading"
import { useGroup } from "@/context/ContextFiles/GroupContext";

type ItemType = {
  title: string;
  icon: LucideIcon;
  href: string;
  buttonText: string;
  content: string;
};

const defaultContent: { [key: string]: ItemType[] } = {
  "Park Club": [
    {
      title: "Your Debates",
      icon: Combine,
      href: "/pages/parkclub/debates",
      buttonText: "Explore Debates",
      content: "Engage in club policy discussions and future planning"
    },
    {
      title: "Chats",
      icon: MessageSquareText,
      href: "/pages/parkclub/chats",
      buttonText: "Go to Chats",
      content: "Connect with fellow club members"
    },
    {
      title: "Your Tasks",
      icon: SquareCheckBig,
      href: "/pages/parkclub/tasks",
      buttonText: "View Tasks",
      content: "Manage your club responsibilities and volunteer work"
    },
    {
      title: "Calendar",
      icon: CalendarDays,
      href: "/pages/parkclub/calendar",
      buttonText: "View Calendar",
      content: "Stay updated on club events and matches"
    },
    {
      title: "Park Club",
      icon: Volleyball,
      href: "/pages/parkclub/info",
      buttonText: "Explore Park Club",
      content: "Learn about our club's history and achievements"
    },
    {
      title: "Moderation",
      icon: Shield,
      href: "/pages/parkclub/moderation",
      buttonText: "Manage Moderation",
      content: "Help maintain a positive club environment"
    },
    {
      title: "Club Finances",
      icon: Gem,
      href: "/pages/parkclub/finances",
      buttonText: "View Finances",
      content: "Track club budget and expenses"
    },
    {
      title: "Member Directory",
      icon: Users,
      href: "/pages/parkclub/members",
      buttonText: "View Members",
      content: "Access the club's member list and profiles"
    }
  ],
  "Rochefort": [
    {
      title: "Town Debates",
      icon: Combine,
      href: "/pages/rochefort/debates",
      buttonText: "Join Debates",
      content: "Participate in local community discussions"
    },
    {
      title: "Neighborhood Chat",
      icon: MessageSquareText,
      href: "/pages/rochefort/chats",
      buttonText: "Chat Now",
      content: "Connect with your Rochefort neighbors"
    },
    {
      title: "Community Tasks",
      icon: SquareCheckBig,
      href: "/pages/rochefort/tasks",
      buttonText: "View Tasks",
      content: "Contribute to local projects and initiatives"
    },
    {
      title: "Town Events",
      icon: CalendarDays,
      href: "/pages/rochefort/calendar",
      buttonText: "Check Events",
      content: "Stay informed about Rochefort's upcoming events"
    },
    {
      title: "About Rochefort",
      icon: Home,
      href: "/pages/rochefort/info",
      buttonText: "Discover Rochefort",
      content: "Explore the rich history and culture of Rochefort"
    },
    {
      title: "Town Moderation",
      icon: Shield,
      href: "/pages/rochefort/moderation",
      buttonText: "Community Guidelines",
      content: "Help maintain a respectful community dialogue"
    },
    {
      title: "Local Economy",
      icon: Gem,
      href: "/pages/rochefort/economy",
      buttonText: "Economic Insights",
      content: "Understand Rochefort's economic landscape"
    },
    {
      title: "Resident Directory",
      icon: Users,
      href: "/pages/rochefort/residents",
      buttonText: "View Residents",
      content: "Connect with fellow Rochefort residents"
    }
  ],
  "Marin Quarter": [
    {
      title: "Quarter Debates",
      icon: Combine,
      href: "/pages/marinquarter/debates",
      buttonText: "Join Discussions",
      content: "Engage in Marin Quarter community dialogues"
    },
    {
      title: "Neighbor Chat",
      icon: MessageSquareText,
      href: "/pages/marinquarter/chats",
      buttonText: "Start Chatting",
      content: "Connect with your Marin Quarter neighbors"
    },
    {
      title: "Local Tasks",
      icon: SquareCheckBig,
      href: "/pages/marinquarter/tasks",
      buttonText: "View Tasks",
      content: "Participate in Marin Quarter improvement projects"
    },
    {
      title: "Quarter Events",
      icon: CalendarDays,
      href: "/pages/marinquarter/calendar",
      buttonText: "See Events",
      content: "Stay updated on Marin Quarter happenings"
    },
    {
      title: "About Marin Quarter",
      icon: Home,
      href: "/pages/marinquarter/info",
      buttonText: "Explore Marin",
      content: "Discover the unique charm of Marin Quarter"
    },
    {
      title: "Community Watch",
      icon: Shield,
      href: "/pages/marinquarter/watch",
      buttonText: "Join Watch",
      content: "Contribute to Marin Quarter's safety initiatives"
    },
    {
      title: "Local Businesses",
      icon: Gem,
      href: "/pages/marinquarter/businesses",
      buttonText: "Support Local",
      content: "Explore and support Marin Quarter businesses"
    },
    {
      title: "Neighbor Directory",
      icon: Users,
      href: "/pages/marinquarter/neighbors",
      buttonText: "Meet Neighbors",
      content: "Get to know your Marin Quarter community"
    }
  ],
  "Executive Committee": [
    {
      title: "Committee Debates",
      icon: Combine,
      href: "/pages/executive/debates",
      buttonText: "Join Debates",
      content: "Engage in high-level club policy discussions"
    },
    {
      title: "Committee Chat",
      icon: MessageSquareText,
      href: "/pages/executive/chats",
      buttonText: "Committee Chat",
      content: "Secure communication channel for committee members"
    },
    {
      title: "Executive Tasks",
      icon: SquareCheckBig,
      href: "/pages/executive/tasks",
      buttonText: "View Tasks",
      content: "Manage and oversee club-wide responsibilities"
    },
    {
      title: "Committee Meetings",
      icon: CalendarDays,
      href: "/pages/executive/calendar",
      buttonText: "Schedule",
      content: "View and schedule important committee meetings"
    },
    {
      title: "Club Overview",
      icon: ChartNoAxesCombined,
      href: "/pages/executive/overview",
      buttonText: "Club Stats",
      content: "Access comprehensive club statistics and reports"
    },
    {
      title: "Policy Making",
      icon: BookKey,
      href: "/pages/executive/policies",
      buttonText: "Manage Policies",
      content: "Create and update club policies and guidelines"
    },
    {
      title: "Financial Overview",
      icon: Gem,
      href: "/pages/executive/finances",
      buttonText: "Financial Dashboard",
      content: "Monitor and manage club's financial health"
    },
    {
      title: "Committee Members",
      icon: Users,
      href: "/pages/executive/members",
      buttonText: "View Members",
      content: "Directory of executive committee members"
    }
  ],
  "2nd Senior Team": [
    {
      title: "Team Discussions",
      icon: Combine,
      href: "/pages/2ndsenior/discussions",
      buttonText: "Team Talk",
      content: "Engage in team strategy and performance discussions"
    },
    {
      title: "Team Chat",
      icon: MessageSquareText,
      href: "/pages/2ndsenior/chat",
      buttonText: "Team Chat",
      content: "Quick communication channel for team members"
    },
    {
      title: "Training Schedule",
      icon: CalendarDays,
      href: "/pages/2ndsenior/schedule",
      buttonText: "View Schedule",
      content: "Access team training and match schedules"
    },
    {
      title: "Performance Tracker",
      icon: ChartNoAxesCombined,
      href: "/pages/2ndsenior/performance",
      buttonText: "Stats",
      content: "Track individual and team performance metrics"
    },
    {
      title: "Team Tactics",
      icon: Boxes,
      href: "/pages/2ndsenior/tactics",
      buttonText: "View Tactics",
      content: "Review and discuss team strategies and formations"
    },
    {
      title: "Injury Reports",
      icon: UserRoundPen,
      href: "/pages/2ndsenior/injuries",
      buttonText: "Health Status",
      content: "Update and view team injury reports"
    },
    {
      title: "Team Events",
      icon: Calendar,
      href: "/pages/2ndsenior/events",
      buttonText: "Team Events",
      content: "Organize and view team bonding events"
    },
    {
      title: "Player Profiles",
      icon: Users,
      href: "/pages/2ndsenior/players",
      buttonText: "View Players",
      content: "Access profiles of all team members"
    }
  ],
  "Construction Committee": [
    {
      title: "Project Discussions",
      icon: Combine,
      href: "/pages/construction/discussions",
      buttonText: "Project Talk",
      content: "Engage in discussions about ongoing construction projects"
    },
    {
      title: "Committee Chat",
      icon: MessageSquareText,
      href: "/pages/construction/chat",
      buttonText: "Quick Chat",
      content: "Rapid communication for urgent construction matters"
    },
    {
      title: "Project Timeline",
      icon: CalendarDays,
      href: "/pages/construction/timeline",
      buttonText: "View Timeline",
      content: "Track progress and deadlines of construction projects"
    },
    {
      title: "Budget Tracker",
      icon: Gem,
      href: "/pages/construction/budget",
      buttonText: "Budget Overview",
      content: "Monitor and manage construction project budgets"
    },
    {
      title: "Blueprint Repository",
      icon: File,
      href: "/pages/construction/blueprints",
      buttonText: "View Blueprints",
      content: "Access and manage construction blueprints and plans"
    },
    {
      title: "Safety Protocols",
      icon: Shield,
      href: "/pages/construction/safety",
      buttonText: "Safety Guidelines",
      content: "Review and update construction safety measures"
    },
    {
      title: "Equipment Inventory",
      icon: Box,
      href: "/pages/construction/inventory",
      buttonText: "View Inventory",
      content: "Manage and track construction equipment"
    },
    {
      title: "Committee Members",
      icon: Users,
      href: "/pages/construction/members",
      buttonText: "View Members",
      content: "Directory of construction committee members"
    }
  ],
  "Training Organization": [
    {
      title: "Training Discussions",
      icon: Combine,
      href: "/pages/training/discussions",
      buttonText: "Discuss",
      content: "Engage in discussions about training methods and schedules"
    },
    {
      title: "Trainer Chat",
      icon: MessageSquareText,
      href: "/pages/training/chat",
      buttonText: "Trainer Chat",
      content: "Quick communication channel for trainers"
    },
    {
      title: "Training Schedule",
      icon: CalendarDays,
      href: "/pages/training/schedule",
      buttonText: "View Schedule",
      content: "Access and manage club-wide training schedules"
    },
    {
      title: "Performance Metrics",
      icon: ChartNoAxesCombined,
      href: "/pages/training/metrics",
      buttonText: "View Metrics",
      content: "Track and analyze training performance data"
    },
    {
      title: "Training Resources",
      icon: BookOpenText,
      href: "/pages/training/resources",
      buttonText: "Resources",
      content: "Access training manuals, videos, and other materials"
    },
    {
      title: "Equipment Management",
      icon: Box,
      href: "/pages/training/equipment",
      buttonText: "Manage Equipment",
      content: "Track and maintain training equipment inventory"
    },
    {
      title: "Certification Tracking",
      icon: Shield,
      href: "/pages/training/certifications",
      buttonText: "Certifications",
      content: "Manage trainer certifications and qualifications"
    },
    {
      title: "Trainer Directory",
      icon: Users,
      href: "/pages/training/trainers",
      buttonText: "View Trainers",
      content: "Access profiles of all club trainers"
    }
  ],
  "Parents of Rochefort": [
    {
      title: "Parent Forum",
      icon: Combine,
      href: "/pages/parents/forum",
      buttonText: "Join Forum",
      content: "Engage in discussions about children's activities and education"
    },
    {
      title: "Parent Chat",
      icon: MessageSquareText,
      href: "/pages/parents/chat",
      buttonText: "Chat Now",
      content: "Connect with other parents in Rochefort"
    },
    {
      title: "School Events",
      icon: CalendarDays,
      href: "/pages/parents/events",
      buttonText: "View Events",
      content: "Stay updated on school and community events for children"
    },
    {
      title: "Resource Sharing",
      icon: BookOpenText,
      href: "/pages/parents/resources",
      buttonText: "Share Resources",
      content: "Share and access parenting tips and educational resources"
    },
    {
      title: "Childcare Network",
      icon: Users,
      href: "/pages/parents/childcare",
      buttonText: "Find Childcare",
      content: "Connect with local childcare providers and babysitters"
    },
    {
      title: "Safety Alerts",
      icon: Shield,
      href: "/pages/parents/safety",
      buttonText: "Safety Info",
      content: "Receive important safety notifications for the community"
    },
    {
      title: "Parent Volunteers",
      icon: UserRoundPen,
      href: "/pages/parents/volunteers",
      buttonText: "Volunteer",
      content: "Sign up for school and community volunteer opportunities"
    },
    {
      title: "Family Directory",
      icon: BookKey,
      href: "/pages/parents/directory",
      buttonText: "View Directory",
      content: "Access the directory of Rochefort families"
    }
  ],
  "Sports in Rochefort": [
    {
      title: "Sports Forum",
      icon: Combine,
      href: "/pages/sports/forum",
      buttonText: "Join Forum",
      content: "Discuss local sports events and activities in Rochefort"
    },
    {
      title: "Team Chat",
      icon: MessageSquareText,
      href: "/pages/sports/chat",
      buttonText: "Team Chat",
      content: "Connect with local sports teams and enthusiasts"
    },
    {
      title: "Event Calendar",
      icon: CalendarDays,
      href: "/pages/sports/calendar",
      buttonText: "View Events",
      content: "Stay updated on local sports events and tournaments"
    },
    {
      title: "Facility Booking",
      icon: CalendarDays,
      href: "/pages/sports/facilities",
      buttonText: "Book Facility",
      content: "Reserve sports facilities in Rochefort"
    },
    {
      title: "Team Directory",
      icon: Users,
      href: "/pages/sports/teams",
      buttonText: "View Teams",
      content: "Access a directory of local sports teams"
    },
    {
      title: "Equipment Exchange",
      icon: Boxes,
      href: "/pages/sports/equipment",
      buttonText: "Exchange Gear",
      content: "Buy, sell, or exchange sports equipment"
    },
    {
      title: "Coaching Corner",
      icon: UserRoundPen,
      href: "/pages/sports/coaching",
      buttonText: "Coaching Resources",
      content: "Access resources for coaches and trainers"
    },
    {
      title: "Sports News",
      icon: Globe,
      href: "/pages/sports/news",
      buttonText: "Local Sports News",
      content: "Stay informed about Rochefort's sports scene"
    }
  ],
  "House 24": [
    {
      title: "House Forum",
      icon: Combine,
      href: "/pages/house24/forum",
      buttonText: "Join Forum",
      content: "Engage in discussions with your House 24 neighbors"
    },
    {
      title: "Neighbor Chat",
      icon: MessageSquareText,
      href: "/pages/house24/chat",
      buttonText: "Chat Now",
      content: "Quick communication channel for House 24 residents"
    },
    {
      title: "Maintenance Requests",
      icon: Pickaxe,
      href: "/pages/house24/maintenance",
      buttonText: "Request Maintenance",
      content: "Submit maintenance requests for common areas"
    },
    {
      title: "Event Calendar",
      icon: CalendarDays,
      href: "/pages/house24/calendar",
      buttonText: "View Events",
      content: "Stay informed about House 24 events and activities"
    },
    {
      title: "Community Resources",
      icon: BookOpenText,
      href: "/pages/house24/resources",
      buttonText: "Access Resources",
      content: "Find useful information and resources for House 24 residents"
    },
    {
      title: "Safety Information",
      icon: Shield,
      href: "/pages/house24/safety",
      buttonText: "Safety Tips",
      content: "Read and share safety tips for House 24"
    },
    {
      title: "Volunteer Opportunities",
      icon: UserRoundPen,
      href: "/pages/house24/volunteer",
      buttonText: "Volunteer",
      content: "Sign up for volunteer opportunities in House 24"
    },
    {
      title: "Resident Directory",
      icon: Users,
      href: "/pages/house24/directory",
      buttonText: "View Residents",
      content: "Access the directory of House 24 residents"
    }
  ],
  "Handcrafts Friday": [ /* ... */ ],
  "Shared Dinner": [ /* ... */ ]
};

const Page = () => {
  const [isClient, setIsClient] = useState(false);
  const { groupName } = useGroup();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const items = defaultContent[groupName] || defaultContent["Park Club"];

  return (
    <>
      <section className="relative py-24 sm:py-32">
        <MaxWidthWrapper className="relative mx-auto text-center flex flex-col items-center gap-10">
          <Heading>About {groupName || 'Park Club'}</Heading>
          <div className="w-full lg:w-[1000px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {items.map((item, index) => (
                <div key={index} className="h-[300px] p-6 border border-gray-300 rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl bg-white">
                  <div className="h-5/6">
                    <div className="flex items-center justify-center text-lg gap-x-2 py-2 px-6 group w-full">
                      <item.icon className="text-brand-300" />
                      <span>{item.title}</span>
                    </div>
                    <p className="text-base/7 text-gray-600 w-full text-center mt-4">
                      {item.content}
                    </p>
                  </div>
                  <div className="h-1/6">
                    <ButtonLandingPage
                      href={item.href}
                      className="relative z-10 h-14 w-full text-base shadow-lg transition-shadow duration-300 hover:shadow-xl"
                    >
                      {item.buttonText}
                    </ButtonLandingPage>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
};

export default Page;