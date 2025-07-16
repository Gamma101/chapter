import React, { useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import axios from "axios"

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
    <div className="bg-secondary p-20 rounded-lg">
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmitForm} className="flex flex-col gap-5">
        <Input
          className="py-5"
          type="email"
          id="email"
          name="email"
          placeholder="Email"
        />
        <Input
          className="py-5"
          type="username"
          name="username"
          id="username"
          placeholder="Username"
        />
        <div className="flex gap-5">
          <Input
            className="py-5"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
          />
          <Input
            className="py-5"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
          />
        </div>

        <Button className="font-semibold py-5">Register</Button>
      </form>
    </div>
  )
}
