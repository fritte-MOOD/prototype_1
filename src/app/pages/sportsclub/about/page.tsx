import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { MessageCircle, Calendar,MessageSquareText, Shield,Gem, Home, Users, Pickaxe, UserRoundPen, CalendarDays, MessagesSquare, Globe, Key, LucideIcon,SquareCheckBig, Menu, Settings,Volleyball, X, Boxes, Box, Combine, File, BookOpenText, ChartNoAxesCombined, MessageCircleOff, BookKey } from "lucide-react";
import { ButtonLandingPage } from "@/components/ButtonLandingPage"
import { Heading } from "@/components/heading"

const Page = () => {
  return (
    <>
      <section className="relative py-24 sm:py-32">
        <MaxWidthWrapper className="relative mx-auto text-center flex flex-col items-center gap-10">
          <Heading>About Park Club</Heading>
          <div className="w-full lg:w-[750px]">
            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-8">
                {/* Your Debates */}
                <div className="h-[300px] p-6 border border-gray-300 rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl bg-white">
                  <div className="h-5/6">
                    <div className="flex items-center justify-center text-lg gap-x-2 py-2 px-6 group w-full">
                      <Combine className="text-brand-300" />
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
                      <MessageSquareText className="text-brand-300" />
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





                {/* Your Tasks */}
                <div className="h-[300px] p-6 border border-gray-300 rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl bg-white">
                  <div className="h-5/6">
                    <div className="flex items-center justify-center text-lg gap-x-2 py-2 px-6 group w-full">
                      <SquareCheckBig className="text-brand-300" />
                      <span>Your Tasks</span>
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
                      href={`/pages/sportsclub/tasks`}
                      className="relative z-10 h-14 w-full text-base shadow-lg transition-shadow duration-300 hover:shadow-xl"
                    >
                      View Tasks
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
                      <CalendarDays className="text-brand-300" />
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
                      <Volleyball className="text-brand-300" />
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





                {/* Moderation */}
                <div className="h-[300px] p-6 border border-gray-300 rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl bg-white">
                  <div className="h-5/6">
                    <div className="flex items-center justify-center text-lg gap-x-2 py-2 px-6 group w-full">
                      <Shield className="text-brand-300" />
                      <span>Moderation</span>
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
                      href={`/pages/sportsclub/moderation`}
                      className="relative z-10 h-14 w-full text-base shadow-lg transition-shadow duration-300 hover:shadow-xl"
                    >
                      Manage Moderation
                    </ButtonLandingPage>
                  </div>
                </div>



              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
};

export default Page;