import React, { useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import axios from "axios"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"
import { Loader } from "lucide-react"

export default function AuthForm({ isSignUp }: { isSignUp: boolean }) {
  const [error, setError] = useState<string>("")
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget)
    const { email, username, password, confirmPassword } =
      Object.fromEntries(formData)

    if (!email || !password || !username || !confirmPassword) {
      setError("All Fields must be filled!")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!")
      return
    }
    setIsLoading(true)
    await axios
      .post("http://localhost:5105/api/account/register", {
        username,
        email,
        password,
      })
      .then((data) => {
        login(data.data)
      })
      .catch((error) => {
        setError(error.response.data[0].description)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget)
    const { username, password } = Object.fromEntries(formData)

    if (!username || !password) {
      setError("All fields must be filled!")
      return
    }
    setIsLoading(true)
    await axios
      .post("http://localhost:5105/api/account/login", {
        username,
        password,
      })
      .then((data) => {
        if (data.data) {
          login(data.data)
        }
      })
      .catch((error) => {
        setError(error.response.data)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isSignUp) {
      handleRegister(e)
    } else {
      handleLogin(e)
    }
  }
  return (
    <div className="bg-secondary p-10 rounded-lg flex gap-10 h-[75%]">
      <div className=" bg-[url('/black-books.jpg')] lg:flex md:flex xl:flex sm:hidden bg-cover bg-center p-5 flex flex-col justify-center rounded-lg">
        <h1 className="text-5xl font-bold">Welcome to Chapter!</h1>
        <p className="text-2xl w-[75%] mt-2">
          Please provide your information for successfull{" "}
          {isSignUp ? "registration" : "login"}
        </p>
      </div>
      <div className="m-auto">
        <h2 className="text-3xl font-semibold mb-5">
          {isSignUp ? "Register" : "Login"}
        </h2>
        <form onSubmit={handleSubmitForm} className="flex flex-col gap-5">
          {error && (
            <p className="font-semibold text-red-500 rounded-sm">{error}</p>
          )}

          <Input
            className={`py-5 ${isSignUp ? "" : "hidden"}`}
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            onChange={() => setError("")}
          />
          <Input
            className="py-5"
            type="username"
            name="username"
            id="username"
            placeholder="Username"
            onChange={() => setError("")}
          />
          <div className="flex gap-5">
            <Input
              className="py-5"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={() => setError("")}
            />
            <Input
              className={`py-5 ${isSignUp ? "" : "hidden"}`}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={() => setError("")}
            />
          </div>

          <Button className="font-semibold py-5">
            {isLoading ? <Loader /> : isSignUp ? "Register" : "Login"}
          </Button>
        </form>
        <p className="mt-2 text-center">
          {isSignUp
            ? `Already have an account? ${" "}`
            : `Doesn't have account yet? ${" "}`}
          <Link
            className="font-semibold underline"
            href={isSignUp ? "/auth" : "/auth?isSignUp=true"}
          >
            {isSignUp ? "Login" : "Register"}
          </Link>
        </p>
      </div>
    </div>
  )
}
