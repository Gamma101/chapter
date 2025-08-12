"use client"
import AuthForm from "@/components/AuthForm"
import { useSearchParams } from "next/navigation"
import React, { Suspense } from "react"

export default function Auth() {
  const searchParams = useSearchParams()
  const isSignUp = !!searchParams.get("isSignUp")
  return (
    <div className="flex items-center justify-center h-screen bg-[url('/lines-black.svg')] dark:bg-[url('/lines-white.svg')] bg-cover bg-center">
      <Suspense>
        <AuthForm isSignUp={isSignUp} />
      </Suspense>
    </div>
  )
}
