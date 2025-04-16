"use client"

import { ReactNode } from "react"
import { Navbar_landing } from "@/components/navbar_landing"

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar_landing />
      {children}
    </>
  )
}

export default Layout