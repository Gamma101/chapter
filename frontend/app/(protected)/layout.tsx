"use client"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import React, { useEffect } from "react"

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/auth")
    }
  }, [isLoading, isAuthenticated, router])
  return <div>{children}</div>
}
