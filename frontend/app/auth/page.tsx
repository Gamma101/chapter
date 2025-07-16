"use client"
import AuthForm from "@/components/AuthForm"
import { useSearchParams } from "next/navigation"
import React from "react"

export default function Auth() {
  const searchParams = useSearchParams()
  const isSignUp = !!searchParams.get("isSignUp")
  return (
    <div className="flex items-center justify-center h-screen">
      <AuthForm />
    </div>
  )
}
