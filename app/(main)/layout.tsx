import type React from "react"
import { HeaderNav } from "@/components/header-nav"
import { MainSearchBar } from "@/components/main-search-bar"
import { SiteFooter } from "@/components/site-footer"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <HeaderNav />
      <div className="bg-[#191919] py-3 px-8 flex">
        <MainSearchBar />
      </div>
      {children}
      <SiteFooter />
    </>
  )
}
