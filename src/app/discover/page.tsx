"use client";

import { Heading } from "@/components/heading";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { useName } from "@/context/nameContext";
import { SubmitButton } from "@/components/SubmitButton";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NameForm() {
  const router = useRouter();
  const defaultNames = ["Alex", "Charlie", "Noa", "Sam", "Robin", "Sascha", "Toni"];

  const [localName, setLocalName] = useState<string>(""); // Aktuelle Eingabe
  const { name, setName } = useName(); // Name im Kontext
  const [randomName, setRandomName] = useState<string>(""); // Zufälliger Name
  const [isClient, setIsClient] = useState<boolean>(false); // Zustand, um sicherzustellen, dass es auf dem Client läuft

  // Dieser Effekt läuft nur auf dem Client nach dem ersten Render
  useEffect(() => {
    setRandomName(defaultNames[Math.floor(Math.random() * defaultNames.length)]);
    setIsClient(true); // Setzt `isClient` auf true, nachdem der Client geladen wurde
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalName(event.target.value); // Lokale Eingabe aktualisieren
  };

  const formSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (localName === "") {
      setName(randomName);
    } else {
      setName(localName);
    }
    router.push("/pages/dashboard");
  };

  return (
    <>
      <section className="relative py-24 sm:py-32 bg-brand-25">
        <MaxWidthWrapper className="text-center">
          <div className="relative mx-auto text-center flex flex-col items-center gap-10">
            <Heading>Demo Platform</Heading>
            <p className="text-base/7 text-gray-600 max-w-prose text-center text-pretty">
              Experience three groups: a Company, a Sportsclub and a Municipality. All content is exemplary and functions are not working! This is only a UI design.
            </p>

            <div className="px-7 py-2.5">
              <form onSubmit={formSubmit} className="flex flex-col border:none">
                <p className="text-base/7 text-gray-600 max-w-prose text-center text-pretty">
                  Enter any firstname to get started with the experience:
                </p>
                <input
                  className="text-center transform rounded-md bg-brand-25 text-base/7 font-medium text-brand-950 transition-all duration-300 hover:ring-2 hover:ring-brand-300 hover:ring-offset-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-300 z-10 h-14 w-full text-base shadow-lg transition-shadow duration-300 hover:shadow-xl"
                  onChange={handleChange}
                  type="text"
                  value={localName}
                  // Wenn es der erste Render ist, gebe den default `randomName` aus, ansonsten benutze den Wert der Eingabe
                  placeholder={isClient ? (localName === "" ? randomName : "") : "Loading..."}
                />
                <div className="py-5"></div>
                <p className="text-base/7 text-gray-600 max-w-prose text-center text-pretty">
                  Or just click here to start with a random name:
                </p>

                <SubmitButton
                  className="relative z-10 h-14 w-full text-base shadow-lg transition-shadow duration-300 hover:shadow-xl"
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
