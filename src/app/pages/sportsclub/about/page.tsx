import { Heading } from "@/components/heading"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"

const Page = () => {
  return (
    <>
      <section className="relative py-24 sm:py-32">
        <MaxWidthWrapper className="text-center relative mx-auto text-center flex flex-col items-center gap-10">




        <div className="p-6 max-w-6xl mx-auto ">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Info Section */}
          <div className="p-5 bg-brand-25 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800">Your Progress</h2>
            <div className="bg-gray-200 h-3 rounded-full overflow-hidden mt-2">
              <div className="bg-brand-500 h-full w-[75%]"></div>
            </div>
            <p className="text-sm text-gray-600 mt-1">75% completed</p>
          </div>

          {/* Current Courses */}
          <div className="p-5 bg-gray-100 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800">Current Courses</h2>
            <ul className="mt-2 space-y-2">
              <li className="p-3 bg-white shadow rounded-lg flex justify-between items-center">
                <span>React Fundamentals</span>
                <span className="text-sm text-gray-500">50% done</span>
              </li>
              <li className="p-3 bg-white shadow rounded-lg flex justify-between items-center">
                <span>Advanced JavaScript</span>
                <span className="text-sm text-gray-500">30% done</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Calendar */}
          <div className="p-5 bg-gray-100 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800">Upcoming Lessons</h2>
            <ul className="mt-2 space-y-2">
              <li className="p-3 bg-white shadow rounded-lg flex justify-between items-center">
                <span>Node.js Basics</span>
                <span className="text-sm text-gray-500">Tomorrow</span>
              </li>
              <li className="p-3 bg-white shadow rounded-lg flex justify-between items-center">
                <span>CSS Animations</span>
                <span className="text-sm text-gray-500">In 2 Days</span>
              </li>
            </ul>
          </div>

          {/* Task List */}
          <div className="p-5 bg-gray-100 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800">Your Tasks</h2>
            <ul className="mt-2 space-y-2">
              <li className="p-3 bg-white shadow rounded-lg flex items-center gap-2">
                <input type="checkbox" className="form-checkbox text-brand-500" />
                <span>Finish React Project</span>
              </li>
              <li className="p-3 bg-white shadow rounded-lg flex items-center gap-2">
                <input type="checkbox" className="form-checkbox text-brand-500" />
                <span>Watch JavaScript Course</span>
              </li>
            </ul>
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