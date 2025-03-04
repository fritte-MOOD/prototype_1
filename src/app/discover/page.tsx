"use client"

import { Heading } from "@/components/heading"
import { SubmitButton } from "@/components/SubmitButton"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 


export default function NameForm() {

  const [name, setName] = useState("");
  const [defaultName, setDefaultName] = useState("");
  const router = useRouter();
  const Array = ["Alex", "Charlie", "Noa", "Sam", "Robin", "Sascha", "Toni"];

  //Randomize default Name from Array
  useEffect(() => {
    const randomName = Array[Math.floor(Math.random() * Array.length)];
    setDefaultName(randomName);
  }, []);
  
  //push Name to URL on Submit
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); 
    const nameToUse = name.trim() === "" ? defaultName : name;
    router.push(`/pages/dashboard?name=${encodeURIComponent(nameToUse)}`);
  };

  return (
  <>
    <section className="relative py-24 sm:py-32 bg-brand-25">
      <MaxWidthWrapper className="text-center">
        <div className="relative mx-auto text-center flex flex-col items-center  gap-10"> 
          <Heading>Demo Platform</Heading>
          <p className="text-base/7 text-gray-600 max-w-prose text-center text-pretty">
            Experience three groups: a Company, a Sportsclub and a Municipality. All content is exemplary and functions are not working! This is only a UI design.
          </p>

          <div className="px-7 py-2.5 ">
            <form onSubmit={handleSubmit} className="flex flex-col border:none " >
              <p className="text-base/7 text-gray-600 max-w-prose text-center text-pretty">
                Enter any firstname to get started with the experience:
              </p>
              <input
                className="text-center transform rounded-md bg-brand-25 text-base/7 font-medium text-brand-950 transition-all duration-300 hover:ring-2 hover:ring-brand-300 hover:ring-offset-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-300 z-10 h-14 w-full text-base shadow-lg transition-shadow duration-300 hover:shadow-xl " 
                type="text"
                id="nameInput"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={defaultName}
              />
              <div className="py-5"></div>
                <p className="text-base/7 text-gray-600 max-w-prose text-center text-pretty">
                  Or just click here to start with a random name:
                </p>

                <SubmitButton type="submit"
                  className ="relative z-10 h-14 w-full text-base shadow-lg transition-shadow duration-300 hover:shadow-xl"
                  >
                  Start Demo
                </SubmitButton>

            </form>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  </>
  );
}