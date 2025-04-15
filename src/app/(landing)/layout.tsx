"use client"

import { ReactNode } from "react"
import { Navbar_landing } from "@/components/navbar_landing"
import { ContextProvider } from "@/context/ContextProvider";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar_landing />
      <ContextProvider>
        {children}
      </ContextProvider>
    </>
  )
}

export default Layout