import { Review } from "@/types/book"
import { ThumbsDown, ThumbsUp, User2 } from "lucide-react"
import React from "react"

export default function BookComments({ reviews }: { reviews: Review[] }) {
  return (
    <div>
      <p className="text-2xl mb-2 font-bold">Comments</p>
      {reviews && (
        <div className="flex flex-col gap-5">
          {reviews.map((preview, key) => {
            return (
              <div
                key={key}
                className="flex gap-10 bg-secondary rounded-lg p-5 justify-between items-center"
              >
                <div className="flex flex-row gap-5">
                  <div className="flex items-center flex-col">
                    <div className="dark:bg-stone-400 bg-stone-300 rounded-full p-2">
                      <User2 className=" rounded-full" />
                    </div>
                    <p>
                      {preview.createdBy.length > 8
                        ? preview.createdBy.slice(0, 8) + "..."
                        : preview.createdBy}
                    </p>
                  </div>

                  <div className="wrap-anywhere">
                    <p className="text-2xl font-semibold">{preview.title}</p>
                    <p className="">{preview.content}</p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-between gap-2">
                  <ThumbsUp className="text-green-400" />
                  <p className="dark:bg-stone-400 bg-stone-300 px-4 rounded-lg font-bold">
                    0
                  </p>
                  <ThumbsDown className="text-red-400" />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
