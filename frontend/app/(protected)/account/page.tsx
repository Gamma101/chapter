"use client"
import { User } from "@/types/User"
import React, { useEffect, useState } from "react"

export default function Account() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])
  return <div>{user && <p>{user.email}</p>}</div>
}
