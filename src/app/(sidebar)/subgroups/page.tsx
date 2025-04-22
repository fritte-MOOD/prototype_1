"use client"

import { Heading } from "@/components/heading"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { Box } from "lucide-react"
import { useRouter } from "next/navigation";
import { useGroup } from "@/context/ContextFiles/GroupContext";
import { mockData } from "@/data/mockup";

function getFutureDate(weeks: number): string {
  const date = new Date();
  date.setDate(date.getDate() + weeks * 7);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// Define the interface for a subgroup
interface Subgroup {
  name: string;
  IAmMember: boolean;
  members: any[]; // Replace 'any' with a more specific type if available
  chats: any[]; // Replace 'any' with a more specific type if available
}

const Page = () => {
  const router = useRouter();
  const { groupName, setGroupName } = useGroup();
  const nextMeetingDate = getFutureDate(4);

  const mainGroups = mockData.map(group => group.name);

  const SubgroupCard = ({ subgroup }: { subgroup: Subgroup }) => (
    <div className="w-[360px] h-[300px] p-6 border border-gray-300 rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl bg-white">
      <div onClick={() => router.push(`/subgroups/${subgroup.name}`)} className="cursor-pointer flex items-center justify-center text-lg gap-x-2 py-2 px-6 group w-full">
        <Box className="text-brand-300" />
        <span>{subgroup.name}</span>
      </div>
      <p className="text-base/7 text-gray-600 w-full text-center">
        {subgroup.members.length} Members <br/>
        {subgroup.chats.length} Chats <br/>
        next meeting: {nextMeetingDate}, 19:00 <br/>
      </p>
    </div>
  );

  // Function to get the correct group name
  const getValidGroupName = (name: string): string => {
    return mainGroups.includes(name) ? name : mainGroups[0];
  };

  // Use the valid group name
  const validGroupName = getValidGroupName(groupName);

  // Get the current group data
  const currentGroup = mockData.find(group => group.name === validGroupName);

  // Separate subgroups into "Your Subgroups" and "Other Subgroups"
  const yourSubgroups = currentGroup?.subgroups.filter(subgroup => subgroup.IAmMember) || [];
  const otherSubgroups = currentGroup?.subgroups.filter(subgroup => !subgroup.IAmMember) || [];

  return (
    <>
      <section className="relative py-24 sm:py-32">
        <MaxWidthWrapper className="relative mx-auto items-center flex flex-col gap-10">
          {/* Group Picker */}
          <div className="w-full max-w-xs mb-6">
            <label htmlFor="group-select" className="block text-sm font-medium text-gray-700 mb-2">
              Select Group:
            </label>
            <select
              id="group-select"
              value={validGroupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-500 focus:border-brand-500"
            >
              {mainGroups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>

          <Heading>{validGroupName} Subgroups</Heading>

          <div className="w-full flex flex-col items-center gap-8">
            <p className="text-left text-2xl mb-4 w-full">Your Subgroups:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
              {yourSubgroups.map((subgroup, index) => (
                <SubgroupCard key={index} subgroup={subgroup} />
              ))}
            </div>

            <p className="text-left text-2xl pt-10 mb-4 w-full">Other {validGroupName} Subgroups:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
              {otherSubgroups.map((subgroup, index) => (
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