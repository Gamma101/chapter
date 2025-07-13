import MainHome from "@/components/MainHome"
import Navbar from "@/components/Navbar"
import React from "react"

export default function Home() {
  return (
    <div className="flex items-center justify-center flex-col">
      <Navbar />
      <MainHome />
    </div>
  )
}
