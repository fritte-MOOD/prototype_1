"use client"

import { ReactNode } from "react"
import { Navbar } from "@/components/navbar"
import { NameProvider } from "@/context/nameContext";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
            <Navbar />
          <NameProvider>
            {children}
        </NameProvider>
    </>
  )
}

export default Layout