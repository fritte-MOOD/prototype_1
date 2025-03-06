import { Heading } from "@/components/heading"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"

const Page = () => {
  return (
    <>
      <section className="relative py-24 sm:py-32">
        <MaxWidthWrapper className="text-center relative mx-auto text-center flex flex-col items-center gap-10">
              <Heading>calendar</Heading>
        </MaxWidthWrapper>
      </section>
    </>
  )
}

export default Page