"use client"
import Link from "next/link"
import React from "react"
import { Button } from "./ui/button"
import ThemeToggle from "./ThemeToggle"

export default function Navbar() {
  return (
    <nav className="container pt-10 pb-5 flex justify-between items-center ">
      <Link href={"/"} className="flex items-center gap-2">
        <p className="text-4xl font-bold">§</p>
        <h1 className="text-3xl font-bold">Chapter</h1>
      </Link>
      <div className="flex gap-5">
        <ThemeToggle />
        <Button variant={"outline"}>Login</Button>
        <Button>Sign Up</Button>
      </div>
    </nav>
  )
}
