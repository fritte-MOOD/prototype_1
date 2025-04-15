"use client"

import { Heading } from "@/components/heading"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { Box } from "lucide-react"
import { useRouter } from "next/navigation";
import { useGroup } from "@/context/GroupContext";

function getFutureDate(weeks: number): string {
  const date = new Date();
  date.setDate(date.getDate() + weeks * 7);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

interface SubgroupItem {
  name: string;
  members: number;
  discussions: number;
  tasks: number;
  href: string;
}

const subgroups: Record<string, SubgroupItem[]> = {
  "Park Club": [
    { name: "Executive Committee", members: 12, discussions: 7, tasks: 2, href: "/pages/sportsclub/subgroups/ExecutiveCommittee" },
    { name: "2nd Senior Team", members: 15, discussions: 5, tasks: 3, href: "/pages/sportsclub/subgroups/2ndSeniorTeam" },
    { name: "Construction Committee", members: 8, discussions: 3, tasks: 1, href: "/pages/sportsclub/subgroups/ConstructionCommittee" },
    { name: "Training Organization", members: 10, discussions: 6, tasks: 4, href: "/pages/sportsclub/subgroups/TrainingOrganization" },
  ],
  "Rochefort": [
    { name: "Parents of Rochefort", members: 20, discussions: 10, tasks: 5, href: "/pages/rochefort/subgroups/ParentsOfRochefort" },
    { name: "Sports in Rochefort", members: 15, discussions: 8, tasks: 3, href: "/pages/rochefort/subgroups/SportsInRochefort" },
  ],
  "Marin Quarter": [
    { name: "House 24", members: 25, discussions: 5, tasks: 2, href: "/pages/marinquarter/subgroups/House24" },
    { name: "Handcrafts Friday", members: 18, discussions: 4, tasks: 3, href: "/pages/marinquarter/subgroups/HandcraftsFriday" },
    { name: "Shared Dinner", members: 30, discussions: 8, tasks: 4, href: "/pages/marinquarter/subgroups/SharedDinner" },
  ],
};

const otherSubgroups: Record<string, SubgroupItem[]> = {
  "Park Club": [
    { name: "Your Debates", members: 50, discussions: 15, tasks: 5, href: "/pages/sportsclub/about" },
    { name: "Chats", members: 100, discussions: 30, tasks: 0, href: "/pages/sportsclub/chats" },
    { name: "Calendar", members: 80, discussions: 5, tasks: 10, href: "/pages/sportsclub/calendar" },
    { name: "Park Club", members: 200, discussions: 20, tasks: 15, href: "/pages/sportsclub/parkclub" },
  ],
  "Rochefort": [
    { name: "City Events", members: 150, discussions: 12, tasks: 8, href: "/pages/rochefort/events" },
    { name: "Local News", members: 80, discussions: 25, tasks: 3, href: "/pages/rochefort/news" },
    { name: "Rochefort", members: 300, discussions: 30, tasks: 20, href: "/pages/rochefort/main" },
  ],
  "Marin Quarter": [
    { name: "Neighborhood Watch", members: 50, discussions: 8, tasks: 5, href: "/pages/marinquarter/watch" },
    { name: "Community Garden", members: 40, discussions: 6, tasks: 12, href: "/pages/marinquarter/garden" },
    { name: "Marin Quarter", members: 250, discussions: 18, tasks: 15, href: "/pages/marinquarter/main" },
  ],
};

const Page = () => {
  const router = useRouter();
  const { groupName } = useGroup();
  const nextMeetingDate = getFutureDate(4);

  const findMainGroup = (subgroupName: string): string => {
    for (const [mainGroup, subgroupList] of Object.entries(subgroups)) {
      if (subgroupList.some(subgroup => subgroup.name === subgroupName)) {
        return mainGroup;
      }
    }
    return subgroupName;
  };

  const mainGroupName = findMainGroup(groupName);

  const SubgroupCard = ({ subgroup }: { subgroup: SubgroupItem }) => (
    <div className="w-[360px] h-[300px] p-6 border border-gray-300 rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl bg-white">
      <div onClick={() => router.push(subgroup.href)} className="cursor-pointer flex items-center justify-center text-lg gap-x-2 py-2 px-6 group w-full">
        <Box className="text-brand-300" />
        <span>{subgroup.name}</span>
      </div>
      <p className="text-base/7 text-gray-600 w-full text-center">
        {subgroup.members} Members <br/>
        {subgroup.discussions} active discussions <br/>
        next meeting: {nextMeetingDate}, 19:00 <br/>
        {subgroup.tasks} open Tasks
      </p>
    </div>
  );

  return (
    <>
      <section className="relative py-24 sm:py-32">
        <MaxWidthWrapper className="relative mx-auto items-center flex flex-col gap-10">
          <Heading>{mainGroupName} Subgroups</Heading>
          <div className="w-full flex flex-col items-center gap-8">
            <p className="text-left text-2xl mb-4 w-full">Your Subgroups:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
              {subgroups[mainGroupName].map((subgroup, index) => (
                <SubgroupCard key={index} subgroup={subgroup} />
              ))}
            </div>

            <p className="text-left text-2xl pt-10 mb-4 w-full">Other {mainGroupName} Subgroups:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
              {otherSubgroups[mainGroupName].map((subgroup, index) => (
                <SubgroupCard key={index} subgroup={subgroup} />
              ))}
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  )
}

export default Page