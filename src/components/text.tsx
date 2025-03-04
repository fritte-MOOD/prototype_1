import { cn } from "@/utils"
import { HTMLAttributes, ReactNode } from "react"

interface TextProps extends HTMLAttributes<HTMLHeadingElement> {
    children?: ReactNode
}

export const Text = ({children, className, ...props}: TextProps) =>
{
    return ( 
        <h1 
            className={cn(
                "text-3xl sm:text-3xl text-pretty font-heading tracking-tight text-zinc-800", 
                className
            )}
            {...props}
        >
            {children}
        </h1>
    )
}