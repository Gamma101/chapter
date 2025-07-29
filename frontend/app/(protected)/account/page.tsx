"use client"
import { Button } from "@/components/ui/button"
import { User } from "@/types/User"
import { User2 } from "lucide-react"
import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"

export default function Account() {
  const [user, setUser] = useState<User | null>(null)
  const pageMode = useTheme()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])
  return (
    <div className="px-20">
      {user && (
        <div className="flex flex-col items-center">
          <User2 className="bg-secondary rounded-full p-5" size={100} />
          <div className="flex items-center flex-col">
            <p className="text-2xl">{user.userName}</p>
            <p>{user.email}</p>
          </div>
        </div>
      )}
      <div className="bg-secondary m-auto gap-2 mt-20 flex items-center flex-col justify-center h-[40vh] rounded-lg w-[50%]">
        <Image
          className="w-60 h-60"
          src={
            pageMode.theme === "light" ? "/empty-white.svg" : "/empty-dark.svg"
          }
          width={100}
          height={100}
          alt="empty"
        />
        <p className="text-xl">
          It seems that you don&apos;t have any books yet
        </p>
        <Link href={"/search"}>
          <Button className="p-5 text-lg cursor-pointer">
            Search for book
          </Button>
        </Link>
      </div>
    </div>
  )
}
