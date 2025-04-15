"use client"

import { Heading } from "@/components/heading"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { useSearchParams } from "next/navigation"

const Page = () => {
  
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Gast";
  return (
    <>
      <section className="relative py-24 sm:py-32 ">
        <MaxWidthWrapper className="text-center relative mx-auto text-center flex flex-col items-center gap-10">
            <Heading>copy full group when finished</Heading>
        </MaxWidthWrapper>
      </section>
    </>
  )
}

export default Page