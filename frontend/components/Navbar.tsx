"use client"
import Link from "next/link"
import React from "react"
import { Button } from "./ui/button"
import ThemeToggle from "./ThemeToggle"
import SearchBar from "./SearchBar"

export default function Navbar({ className = "" }: { className?: string }) {
  return (
    <nav
      className={`p-5 rounded-b-xl flex justify-between items-center ${className}`}
    >
      <Link href={"/"} className="flex items-center gap-2">
        <p className="text-4xl font-bold">§</p>
        <h1 className="text-3xl font-bold">Chapter</h1>
      </Link>
      <SearchBar />
      <div className="flex gap-5">
        <ThemeToggle />
        <Button variant={"outline"}>Login</Button>
        <Button>Sign Up</Button>
      </div>
    </nav>
  )
}
