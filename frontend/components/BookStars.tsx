import { Axios } from "axios"
import { Star } from "lucide-react"
import React, { useEffect, useState } from "react"

export default function BookStars({
  bookId,
  api,
}: {
  bookId: string
  api: Axios
}) {
  const [rating, setRating] = useState<number | null>()

  useEffect(() => {
    const getUserRating = async () => {
      await api
        .get(`http://localhost:5105/api/books/${bookId}/rating/my`)
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
    await api
      .put(`http://localhost:5105/api/books/${bookId}/rating`, { value: score })
      .then(() => {
        console.log("Rating submitted!")
      })
      .catch((e) => console.log(e))
  }

  const handleRemoveRating = async () => {
    await api
      .delete(`http://localhost:5105/api/books/${bookId}/rating`)
      .then((d) => {
        console.log(d)
        setRating(0)
      })
      .catch((e) => console.log(e))
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
              if (!rating) {
                setRating(i)
                submitRating(i)
              }
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
