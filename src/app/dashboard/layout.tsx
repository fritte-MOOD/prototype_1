"use client"

import { ReactNode } from "react"
import { Navbar } from "@/components/navbar"
import { ContextProvider } from "@/context/ContextProvider";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <ContextProvider>
        {children}
      </ContextProvider>
    </>
  )
}

export default Layout