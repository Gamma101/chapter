import React from "react"
import ThemeToggle from "./ThemeToggle"
import Link from "next/link"
import { Button } from "./ui/button"
import { User } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover"

export default function NavbarAccount() {
  const { isAuthenticated, user, logout } = useAuth()
  return (
    <div className="">
      <div className="flex gap-5 items-center">
        <ThemeToggle />
        {isAuthenticated ? (
          <Popover>
            <PopoverTrigger className="p-2 transition-all duration-100 rounded-full cursor-pointer">
              <User className="dark:text-white text-black" />
            </PopoverTrigger>
            <PopoverContent>
              <p>Username: {user?.userName}</p>
              <p>Email: {user?.email}</p>
              <div className="flex items-center justify-between mt-5 gap-4">
                <Link href={"/account"}>
                  <Button variant={"secondary"}>Profile</Button>
                </Link>
                <Button onClick={logout} variant={"destructive"}>
                  Logout
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <div className="flex gap-4">
            <Link href={"/auth"}>
              <Button variant={"outline"}>Login</Button>
            </Link>
            <Link href={"/auth?isSignUp=true"}>
              <Button>Sign Up</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
