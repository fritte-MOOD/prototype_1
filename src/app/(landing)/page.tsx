import { Heading } from "@/components/heading"
import { ButtonLandingPage } from "@/components/ButtonLandingPage"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { Check } from "lucide-react"

const Page = () => {
  return (
    <>
      <section className="relative py-24 sm:py-32 bg-brand-25">
        <MaxWidthWrapper className="text-center relative mx-auto text-center flex flex-col items-center gap-10">

          <Heading>Freedom entails Responsibility</Heading>

          <p className="text-base/7 text-gray-600 max-w-prose text-center text-pretty">
            Engage, Deliberate and Participate in your group and make decisions meaningful.
          </p>
          
          <p className="text-base/7 text-gray-600 max-w-prose text-center text-pretty">
            This tool will help you monitor your voted decisionmakers, give and recieve Feedback. Be constructive as a group, create trust and minimize effort for the discussion of goals or strategies.
          </p>

          <ul className="space-y-2 text-base/7 text-gray-600 text-left flex flex-col item-start">
            {[
              "Three Example Groups",
              "All Functions presented",
              "Expressive Decision Processes",
            ].map((item, index) => 
            (
              <li key={index} className="flex gap_1.5 items-center text-left">
                <Check className="size-5 shrink-0 text-brand-300"/>
                {item}
              </li>
            )
            )}
          </ul>

          <ButtonLandingPage 
          href="/discover"
          className ="relative z-10 h-14 w-80 text-base shadow-lg transition-shadow duration-300 hover:shadow-xl">
            Start Demo
          </ButtonLandingPage>

        </MaxWidthWrapper>
      </section>
    </>
  )
}

export default Page