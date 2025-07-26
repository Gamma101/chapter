"use client"
import Link from "next/link"
import React from "react"
import NavbarAccount from "./NavbarAccount"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export default function Navbar({ className = "" }: { className?: string }) {
  const pathName = usePathname()
  const currentPage = pathName.replace("/", "")
  return (
    <nav
      className={`p-5 rounded-b-xl grid grid-cols-3 items-center ${className}`}
    >
      <Link href={"/"} className="flex items-center gap-2 justify-self-start">
        <p className="text-4xl font-bold">§</p>
        <h1 className="text-3xl font-bold">Chapter</h1>
      </Link>

      <div className="flex gap-5 justify-self-center">
        <Link
          href={"/search"}
          className={cn(
            "text-xl",
            currentPage === "search"
              ? "font-bold text-white dark:text-black px-2 bg-secondary-foreground  rounded-full transition-all"
              : ""
          )}
        >
          search
        </Link>
        <Link
          href="/collection"
          className={cn(
            "text-xl",
            currentPage === "collection"
              ? "font-bold text-white dark:text-black px-2 bg-secondary-foreground  rounded-full transition-all"
              : ""
          )}
        >
          collection
        </Link>
      </div>

      <NavbarAccount className="justify-self-end" />
    </nav>
  )
}
