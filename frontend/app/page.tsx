"use client"
import MainHome from "@/components/MainHome"
import PopularCatalog from "@/components/PopularCatalog"
import React from "react"

export default function Home() {
  return (
    <div className="flex items-center justify-center flex-col overflow-hidden">
      <div className="w-screen">
        <div className="h-[85vh] bg-[url('/lines-black.svg')] dark:bg-[url('/lines-white.svg')] bg-cover bg-center">
          <div className="container mx-auto">
            <MainHome />
          </div>
        </div>
      </div>
      <PopularCatalog />
    </div>
  )
}
