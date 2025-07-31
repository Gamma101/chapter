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
      className={`p-5 rounded-b-xl grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 fixed z-10 w-full bg-background/80 backdrop-blur-md items-center ${className}`}
    >
      <Link href={"/"} className="flex items-center gap-2 justify-self-start">
        <p className="text-4xl font-bold">§</p>
        <h1 className=" text-3xl font-bold">Chapter</h1>
      </Link>

      <div className="m-auto hidden xs:hidden sm:flex md:flex lg:flex xl:flex gap-5 justify-self-center">
        <Link
          href={"/"}
          className={cn(
            "text-xl",
            currentPage === ""
              ? "text-white dark:text-black px-2 bg-secondary-foreground  rounded-full transition-all"
              : ""
          )}
        >
          home
        </Link>
        <Link
          href={"/search"}
          className={cn(
            "text-xl",
            currentPage === "search"
              ? "text-white dark:text-black px-2 bg-secondary-foreground  rounded-full transition-all"
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
              ? "text-white dark:text-black px-2 bg-secondary-foreground  rounded-full transition-all"
              : ""
          )}
        >
          collection
        </Link>
      </div>

      <NavbarAccount currentPage={currentPage} className="justify-self-end" />
    </nav>
  )
}
