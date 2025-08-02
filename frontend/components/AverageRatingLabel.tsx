import { cn } from "@/lib/utils"
import axios from "axios"
import { Star } from "lucide-react"
import React, { useEffect, useState } from "react"

type Rating = {
  ratingsCount: number
  averageRating: number
}

export default function AverageRatingLabel({ bookId }: { bookId: string }) {
  const [rating, setRating] = useState<Rating | null>(null)

  console.log()

  useEffect(() => {
    const getAvgRating = async () => {
      await axios
        .get(`http://localhost:5105/api/books/${bookId}/rating/info`)
        .then((data) => {
          setRating(data.data)
          console.log(data.data)
        })
        .catch((e) => {
          console.log(e)
        })
    }
    getAvgRating()
  }, [bookId])
  return (
    <div>
      <p className="font-bold text-xl item">Rating</p>
      <div className="flex gap-1 items-center">
        {[1, 2, 3, 4, 5].map((el) => {
          return (
            <Star
              className={cn(
                rating && rating?.averageRating > el - 1
                  ? "text-amber-300"
                  : "text-accent-foreground"
              )}
              size={35}
              key={el}
            />
          )
        })}
        <div className=" flex-row flex gap-3 items-center">
          <p className="flex items-center">
            {" "}
            <span className="text-xl font-semibold mr-2">
              {rating?.averageRating && rating?.averageRating.toFixed(2)}
            </span>
            {rating?.ratingsCount}{" "}
            {rating && rating?.ratingsCount > 1 ? "ratings" : "rating"}
          </p>
        </div>
      </div>
    </div>
  )
}
