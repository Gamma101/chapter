import React from "react"
import ThemeToggle from "./ThemeToggle"
import Link from "next/link"
import { Button } from "./ui/button"
import {
  FileStack,
  LogOut,
  Settings2Icon,
  User,
  UserCheck2,
} from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover"

export default function NavbarAccount({ className }: { className: string }) {
  const { isAuthenticated, user, logout } = useAuth()
  return (
    <div className={className}>
      <div className="flex gap-5 items-center">
        <ThemeToggle />
        {isAuthenticated ? (
          <Popover>
            <PopoverTrigger>
              <div className="p-2 transition-all duration-300 dark:bg-white bg-black hover:opacity-80 rounded-full cursor-pointer">
                <User className="dark:text-black text-white" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col item-center justify-center text-center">
              <div className="flex items-center rounded-lg gap-2 py-2 mb-2">
                <div className="self-center">
                  <User size={40} className="" />
                </div>
                <div className="text-left">
                  <p className="text-md">{user?.userName}</p>
                  <p className="text-md">{user?.email}</p>
                </div>
              </div>
              <div className="flex flex-col items-start gap-2">
                <Link className="w-full" href={"/account"}>
                  <Button variant={"secondary"} className="w-full self-center">
                    <UserCheck2 />
                    <p className="text-left w-full">My Profile</p>
                  </Button>
                </Link>
                <Link className="w-full" href={"/collection"}>
                  <Button variant={"secondary"} className="w-full self-center">
                    <FileStack />
                    <p className="text-left w-full">My Collection</p>
                  </Button>
                </Link>

                <div className="flex justify-between w-full ">
                  <Link className="w-[48%]" href={"/settings"}>
                    <Button variant={"secondary"} className="w-full">
                      <Settings2Icon />
                      <p className="w-full">Settings</p>
                    </Button>
                  </Link>
                  <Button
                    onClick={logout}
                    variant={"destructive"}
                    className="w-[48%]"
                  >
                    <LogOut />
                    <p className="w-full">Settings</p>
                  </Button>
                </div>
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
