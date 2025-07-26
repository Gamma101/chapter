"use client"
import MainHome from "@/components/MainHome"
import Navbar from "@/components/Navbar"
import PopularCatalog from "@/components/PopularCatalog"
import React from "react"

export default function Home() {
  return (
    <div className="flex items-center justify-center flex-col overflow-hidden">
      <div className="w-screen">
        <div className="h-[85vh] bg-[url('/lines-black.svg')] dark:bg-[url('/lines-white.svg')] bg-cover bg-center">
          <div className="container mx-auto">
            <Navbar className="fixed top-0 left-0 right-0 z-50 bg-secondary self-center" />
            <MainHome />
          </div>
        </div>
      </div>
      <PopularCatalog />
    </div>
  )
}
