"use client"

import { Heading } from "@/components/heading"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { CalendarDays, Combine, MessageSquareText, Box, Shield, SquareCheckBig, Volleyball } from "lucide-react"
import { ButtonLandingPage } from "@/components/ButtonLandingPage"
import { useRouter } from "next/navigation";

function getFutureDate(weeks: number): string {
  const date = new Date();
  date.setDate(date.getDate() + weeks * 7);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

const Page = () => {
  const router = useRouter();
  const nextMeetingDate = getFutureDate(4);
  return (
    <>
      <section className="relative py-24 sm:py-32 ">
        <MaxWidthWrapper className="relative mx-auto items-center flex flex-col gap-10">
          <Heading>Park Club's Subgroups</Heading>
          <div className="w-full lg:w-[750px]">
            <p className="text-left text-2xl mb-4">Your Subgroups:</p>
            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-8">
                {/* Executive Committee */}
                <div className="h-[300px] p-6 border border-gray-300 rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl bg-white">
                    <div onClick={() => router.push("/pages/sportsclub/subgroups/ExecutiveCommittee")} className="cursor-pointer flex items-center justify-center text-lg gap-x-2 py-2 px-6 group w-full">
                      <Box className="text-brand-300" />
                      <span>Executive Committee</span>
                    </div>
                    <p className="text-base/7 text-gray-600 w-full text-center">
                      12 Members <br/>
                      7 active discussions <br/>
                      next meeting: {nextMeetingDate}, 19:00 <br/>
                      2 open Tasks

                    </p>
                    <p className="text-base/7 text-brand-300 w-full text-center">


                    </p>
                </div>

                {/* 2nd Senior Team */}
                <div className="h-[300px] p-6 border border-gray-300 rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl bg-white">
                  <div className="h-5/6">
                    <div className="flex items-center justify-center text-lg gap-x-2 py-2 px-6 group w-full">
                      <Box className="text-brand-300" />
                      <span>2nd Senior Team</span>
                    </div>
                    <p className="text-base/7 text-gray-600 w-full text-center">
                      12 Members <br/>
                      7 active discussions <br/>
                      next meeting: {nextMeetingDate}, 19:00 <br/>
                      2 open Tasks
                    </p>
                    <p className="text-base/7 text-brand-300 w-full text-center">
                      {/* Replace with actual content */}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Construction Committee */}
                <div className="h-[300px] p-6 border border-gray-300 rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl bg-white">
                  <div className="h-5/6">
                    <div className="flex items-center justify-center text-lg gap-x-2 py-2 px-6 group w-full">
                      <Box className="text-brand-300" />
                      <span>Construction Committee</span>
                    </div>
                    <p className="text-base/7 text-gray-600 w-full text-center">
                      12 Members <br/>
                      7 active discussions <br/>
                      next meeting: {nextMeetingDate}, 19:00 <br/>
                      2 open Tasks
                    </p>
                    <p className="text-base/7 text-brand-300 w-full text-center">
                      {/* Replace with actual content */}
                    </p>
                  </div>
                </div>

                {/* Training Organization */}
                <div className="h-[300px] p-6 border border-gray-300 rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl bg-white">
                  <div className="h-5/6">
                    <div className="flex items-center justify-center text-lg gap-x-2 py-2 px-6 group w-full">
                      <Box className="text-brand-300" />
                      <span>Training Organization</span>
                    </div>
                    <p className="text-base/7 text-gray-600 w-full text-center">
                      12 Members <br/>
                      7 active discussions <br/>
                      next meeting: {nextMeetingDate}, 19:00 <br/>
                      2 open Tasks
                    </p>
                    <p className="text-base/7 text-brand-300 w-full text-center">
                      {/* Replace with actual content */}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-left text-2xl pt-10 mb-4">Other Subgroups:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-8">
                {/* Your Debates */}
                <div className="h-[300px] p-6 border border-gray-300 rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl bg-white">
                  <div className="h-5/6">
                    <div className="flex items-center justify-center text-lg gap-x-2 py-2 px-6 group w-full">
                      <Box className="text-brand-300" />
                      <span>Your Debates</span>
                    </div>
                    <p className="text-base/7 text-gray-600 w-full text-center">

                    </p>
                    <p className="text-base/7 text-brand-300 w-full text-center">


                    </p>
                  </div>
                  <div className="h-1/6">
                    <ButtonLandingPage
                      href={`/pages/sportsclub/about`}
                      className="relative z-10 h-14 w-full text-base shadow-lg transition-shadow duration-300 hover:shadow-xl"
                    >
                      Explore Example
                    </ButtonLandingPage>
                  </div>
                </div>

                {/* Chats */}
                <div className="h-[300px] p-6 border border-gray-300 rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl bg-white">
                  <div className="h-5/6">
                    <div className="flex items-center justify-center text-lg gap-x-2 py-2 px-6 group w-full">
                      <Box className="text-brand-300" />
                      <span>Chats</span>
                    </div>
                    <p className="text-base/7 text-gray-600 w-full text-center">
                      {/* Replace with actual content */}
                    </p>
                    <p className="text-base/7 text-brand-300 w-full text-center">
                      {/* Replace with actual content */}
                    </p>
                  </div>
                  <div className="h-1/6">
                    <ButtonLandingPage
                      href={`/pages/sportsclub/chats`}
                      className="relative z-10 h-14 w-full text-base shadow-lg transition-shadow duration-300 hover:shadow-xl"
                    >
                      Go to Chats
                    </ButtonLandingPage>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Calendar */}
                <div className="h-[300px] p-6 border border-gray-300 rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl bg-white">
                  <div className="h-5/6">
                    <div className="flex items-center justify-center text-lg gap-x-2 py-2 px-6 group w-full">
                      <Box className="text-brand-300" />
                      <span>Calendar</span>
                    </div>
                    <p className="text-base/7 text-gray-600 w-full text-center">
                      {/* Replace with actual content */}
                    </p>
                    <p className="text-base/7 text-brand-300 w-full text-center">
                      {/* Replace with actual content */}
                    </p>
                  </div>
                  <div className="h-1/6">
                    <ButtonLandingPage
                      href={`/pages/sportsclub/calendar`}
                      className="relative z-10 h-14 w-full text-base shadow-lg transition-shadow duration-300 hover:shadow-xl"
                    >
                      View Calendar
                    </ButtonLandingPage>
                  </div>
                </div>

                {/* Park Club */}
                <div className="h-[300px] p-6 border border-gray-300 rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl bg-white">
                  <div className="h-5/6">
                    <div className="flex items-center justify-center text-lg gap-x-2 py-2 px-6 group w-full">
                      <Box className="text-brand-300" />
                      <span>Park Club</span>
                    </div>
                    <p className="text-base/7 text-gray-600 w-full text-center">
                      {/* Replace with actual content */}
                    </p>
                    <p className="text-base/7 text-brand-300 w-full text-center">
                      {/* Replace with actual content */}
                    </p>
                  </div>
                  <div className="h-1/6">
                    <ButtonLandingPage
                      href={`/pages/sportsclub/parkclub`}
                      className="relative z-10 h-14 w-full text-base shadow-lg transition-shadow duration-300 hover:shadow-xl"
                    >
                      Explore Park Club
                    </ButtonLandingPage>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  )
}

export default Page