"use client";

import { useName } from "@/context/NameContext";
import { Heading } from "@/components/heading";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { ButtonLandingPage } from "@/components/ButtonLandingPage";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Drama, Volleyball, Home } from "lucide-react";

export default function Dashboard() {
  const { name } = useName() || { name: "Alex" };
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <section className="relative py-24 sm:py-32 ">
      <MaxWidthWrapper className="text-center relative mx-auto flex flex-col items-center gap-10">
        <Heading>Welcome back, {name}</Heading>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="h-[300px] p-6 border border-gray-300 rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <div className="h-5/6">
              <div className="flex items-center justify-center text-lg gap-x-2 py-2 px-6 group w-full">
                <Volleyball className="text-brand-300" />
                <span>Park Sports Club RF</span>
              </div>
              <p className="text-base/7 text-gray-600 w-full text-center">
                174 Users, 12 Subgroups <br />
                You are an Admin and a Moderator.
              </p>
              <p className="text-base/7 text-brand-300 w-full text-center">
                <br />
                3 Messages <br />
                2 new contributions
              </p>
            </div>
            <div className="h-1/6">
              <ButtonLandingPage
                href={`/pages/sportsclub/about`}
                className="relative z-10 h-14 w-full text-base shadow-lg transition-shadow duration-300 hover:shadow-xl "
              >
                Explore Example
              </ButtonLandingPage>
            </div>
          </div>

          <div className="h-[300px] p-6 border border-gray-300 rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <div className="h-5/6">
              <div className="flex items-center justify-center text-lg gap-x-2 py-2 px-6 group w-full">
                <Drama className="text-brand-300" />
                <span>Municipality of Rochefort</span>
              </div>

              <p className="text-base/7 text-gray-600 w-full text-center">
                18,646 Users, 78 Subgroups <br />
                You are a User.
              </p>
              <p className="text-base/7 text-brand-300 w-full text-center">
                <br />
                1 new contribution
              </p>
            </div>
            <div className="h-1/6">
              <ButtonLandingPage
                href={`/pages/municipality/dashboard`}
                className="relative z-10 h-14 w-full text-base shadow-lg transition-shadow duration-300 hover:shadow-xl "
              >
                Explore Example
              </ButtonLandingPage>
            </div>
          </div>

          <div className="h-[300px] p-6 border border-gray-300 rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <div className="h-5/6">
              <div className="flex items-center justify-center text-lg gap-x-2 py-2 px-6 group w-full">
                <Home className="text-brand-300" />
                <span>Marin Quarter Community</span>
              </div>
              <p className="text-base/7 text-gray-600 w-full text-center">
                24 Users, 8 Subgroups <br />
                You are a Moderator.
              </p>
              <p className="text-base/7 text-brand-300 w-full text-center">
                <br />
                no Messages <br />
              </p>
            </div>
            <div className="h-1/6">
              <ButtonLandingPage
                href={`/pages/community/dashboard`}
                className="relative z-10 h-14 w-full text-base shadow-lg transition-shadow duration-300 hover:shadow-xl "
              >
                Explore Example
              </ButtonLandingPage>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}