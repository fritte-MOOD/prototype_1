import { AnchorHTMLAttributes } from "react"

interface LoginFormProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}

export const LoginForm = ({
  className,
  children,
  href,
  ...props
}: LoginFormProps) => {
  return (
  
  <div className="px-7 py-2.5 ">
    <form className="flex flex-col border:none;">
      <input
        className="group relative flex transform items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-md border border-white bg-grey px-8 text-base/7 font-medium text-black transition-all duration-300 hover:ring-2 hover:ring-brand-300 hover:ring-offset-2 focus:outline-none focus:ring-2 focus:ring-offset-2" 
        id="inline-full-name" 
        type="text"
        placeholder = "Jules"
        name="name"
      />

    </form>
  </div>
  )
}