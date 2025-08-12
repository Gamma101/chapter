import { cn } from "@/lib/utils"
import axios from "axios"
import { Star } from "lucide-react"
import React, { useEffect, useState } from "react"

type Rating = {
  ratingsCount: number
  averageRating: number
  reviewsCount: number
}

export default function AverageRatingLabel({ bookId }: { bookId: string }) {
  const [rating, setRating] = useState<Rating | null>(null)

  useEffect(() => {
    const getAvgRating = async () => {
      await axios
        .get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${bookId}/rating/info`
        )
        .then((data) => {
          setRating(data.data)
        })
    }
    getAvgRating()
  }, [bookId])
  return (
    <div>
      <p className="font-bold text-xl item">Rating</p>
      <div className="flex flex-col sm:flex-row gap-1 items-center">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((el) => {
            return (
              <Star
                className={cn(
                  rating && rating?.averageRating > el - 1
                    ? "text-amber-300"
                    : "text-gray-300"
                )}
                size={35}
                key={el}
              />
            )
          })}
        </div>
        <div className=" flex-row flex gap-3 items-center">
          <p className="text-xl font-semibold mr-2">
            {rating?.averageRating && rating?.averageRating.toFixed(2)}
          </p>
        </div>
        <p className="flex items-center">
          {" "}
          {rating?.ratingsCount}{" "}
          {rating && rating?.ratingsCount === 1 ? "rating" : "ratings"}
          {" • "}
          {rating?.reviewsCount}{" "}
          {rating && rating?.reviewsCount === 1 ? "review" : "reviews"}
        </p>
      </div>
    </div>
  )
}
