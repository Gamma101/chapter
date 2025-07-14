import MainHome from "@/components/MainHome"
import Navbar from "@/components/Navbar"
import PopularCatalog from "@/components/PopularCatalog"
import React from "react"

export default function Home() {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="h-[85vh]">
        <Navbar />
        <MainHome />
      </div>
      <PopularCatalog />
    </div>
  )
}
