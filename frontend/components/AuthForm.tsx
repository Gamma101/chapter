import React, { useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import axios from "axios"
import Link from "next/link"

export default function AuthForm() {
  const [error, setError] = useState<string>("")
  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
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

      const response = await axios.post(
        "http://localhost:5105/api/account/register",
        {
          username,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            // Add other headers as needed
            // 'Authorization': 'Bearer token'
          },
        }
      )

      const data = await response.data
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="bg-secondary p-10 rounded-lg flex gap-10 h-[75%]">
      <div className=" bg-[url('/black-books.jpg')] bg-cover bg-center flex flex-col justify-center rounded-lg">
        <h1 className="text-5xl ml-5 font-bold">Welcome to Chapter!</h1>
        <p className="text-2xl ml-5 w-[75%] mt-2">
          Please provide your information for successfull signup
        </p>
      </div>
      <div className="m-auto">
        <h2 className="text-3xl font-semibold mb-5">Register</h2>
        <form onSubmit={handleSubmitForm} className="flex flex-col gap-5">
          {error && (
            <p className="font-semibold text-red-500 rounded-sm">{error}</p>
          )}

          <Input
            className="py-5"
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
              className="py-5"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={() => setError("")}
            />
          </div>

          <Button className="font-semibold py-5">Register</Button>
        </form>
        <p className="mt-2 text-center">
          Already have an account?{" "}
          <Link className="font-semibold underline" href={"/auth"}>
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
