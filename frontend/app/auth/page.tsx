"use client"
import AuthForm from "@/components/AuthForm"
import { useSearchParams } from "next/navigation"
import React from "react"

export default function Auth() {
  const searchParams = useSearchParams()
  const isSignUp = !!searchParams.get("isSignUp")
  return (
    <div className="flex items-center justify-center h-screen bg-[url('/lines-black.svg')] dark:bg-[url('/lines-white.svg')] bg-cover bg-center">
      <AuthForm isSignUp={isSignUp} />
    </div>
  )
}
