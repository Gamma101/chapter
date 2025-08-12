import { useAuth } from "@/context/AuthContext"
import { Axios } from "axios"
import { Star } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"

export default function BookStars({
  bookId,
  api,
}: {
  bookId: string
  api: Axios
}) {
  const [rating, setRating] = useState<number | null>()
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    const getUserRating = async () => {
      await api
        .get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${bookId}/rating/my`
        )
        .then((data) => {
          setRating(data.data.value)
        })
        .catch(() => {
          setRating(null)
        })
    }
    getUserRating()
  }, [api, bookId])

  const submitRating = async (score: number) => {
    if (!user?.userName) {
      router.push("/auth")
    }
    await api.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${bookId}/rating`,
      {
        value: score,
      }
    )
  }

  const handleRemoveRating = async () => {
    await api
      .delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${bookId}/rating`
      )
      .then(() => {
        setRating(0)
      })
  }

  return (
    <div className="flex items-center flex-col">
      <div className="mt-3 flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={40}
            className={
              rating && i <= rating
                ? "text-amber-300"
                : "text-gray-300 cursor-pointer"
            }
            onClick={() => {
              setRating(i)
              submitRating(i)
            }}
            data-testid={`star-${i}`}
          />
        ))}
      </div>
      {!!rating && (
        <p onClick={handleRemoveRating} className="underline cursor-pointer">
          remove rating
        </p>
      )}
    </div>
  )
}
