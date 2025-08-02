"use client"
import { User } from "@/types/User"
import { User2 } from "lucide-react"
import React, { useEffect, useState } from "react"

export default function Account() {
  const [user, setUser] = useState<User | null>(null)

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
    </div>
  )
}
