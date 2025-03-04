"use client"
import { Heading } from "@/components/heading"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { useSearchParams } from "next/navigation"
import { ButtonLandingPage } from "@/components/ButtonLandingPage"





const Page = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Gast";
  
  return (
    <>
      <section className="relative py-24 sm:py-32 ">
        <MaxWidthWrapper className="text-center relative mx-auto text-center flex flex-col items-center gap-10">
          <Heading>Welcome, {name}</Heading>
          <div>
            <ButtonLandingPage href= {`/pages/sportsclub/dashboard?name=${name}`}
            className ="relative z-10 h-14 w-80 text-base shadow-lg transition-shadow duration-300 hover:shadow-xl">
              Explore Sports Club
            </ButtonLandingPage>
          </div>
           
          
        </MaxWidthWrapper>
      </section>
    </>
  )
}

export default Page