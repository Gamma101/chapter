import Link from "next/link"
import React from "react"
import { Button } from "./ui/button"
import ThemeToggle from "./ThemeToggle"
import { BookUser } from "lucide-react"

export default function Navbar() {
  return (
    <nav className="container pt-10 pb-5 flex justify-between items-center ">
      <Link href={"/"} className="flex items-center gap-2">
        <BookUser size={30} />
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
