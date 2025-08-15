import { useAuth } from "@/context/AuthContext"
import { useApi } from "@/hooks/useApi"
import { Review } from "@/types/book"
import { Star, ThumbsDown, ThumbsUp, Trash2, User2 } from "lucide-react"
import React, { useState } from "react"
import EditCommentDialog from "./EditCommentDialog"
import { deleteComment } from "@/lib/bookUtils"
import { cn } from "@/lib/utils"

export default function CommentMobile({
  review,
  isEditing = false,
  setUserReview,
}: {
  review: Review
  isEditing?: boolean
  setUserReview?: React.Dispatch<React.SetStateAction<Review | null>>
}) {
  const { user } = useAuth()
  const api = useApi()

  const [reviewData, setReviewData] = useState(review)

  return (
    <div className="flex py-5 w-full gap-10 bg-secondary rounded-lg p-2  items-center">
      <div className="flex flex-col w-full items-center gap-5">
        <div
          className={cn(
            "flex w-full px-5 flex-row items-center gap-5",
            isEditing ? "justify-between" : "justify-center"
          )}
        >
          <div className="flex items-center flex-col">
            <div className="dark:bg-stone-400 bg-stone-300 rounded-full p-2">
              <User2 className=" rounded-full" />
            </div>
            <p>
              {reviewData.createdBy.length > 8
                ? reviewData.createdBy.slice(0, 8) + "..."
                : reviewData.createdBy}
            </p>
          </div>
          {user?.userName === reviewData.createdBy && isEditing && (
            <div className="flex flex-col gap-5">
              <EditCommentDialog
                setReviewData={setReviewData}
                review={reviewData}
              />
              {setUserReview && (
                <Trash2
                  onClick={() => {
                    deleteComment(api, reviewData.id, setUserReview)
                  }}
                  className="text-red-400 cursor-pointer"
                />
              )}
            </div>
          )}
        </div>

        <div className="wrap-anywhere w-[90%]">
          <div className="flex space-x-1">
            {[0, 1, 2, 3, 4].map((el) => {
              return (
                <Star
                  className={cn(
                    el < review.userRating ? "text-yellow-400" : "text-gray-500"
                  )}
                  key={el}
                />
              )
            })}
          </div>
          <p className="text-2xl font-semibold">{reviewData.title}</p>
          <p className="">{reviewData.content}</p>
          {reviewData.updatedAt && (
            <p className="text-sm mt-5 text-gray-400">
              Last updated {new Date(reviewData.updatedAt).toLocaleDateString()}
            </p>
          )}
          <p className="text-sm text-gray-400">
            Review created {new Date(reviewData.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex flex-row items-center justify-between gap-2">
          <ThumbsUp className="text-green-400" />
          <p className="dark:bg-stone-400 bg-stone-300 px-4 rounded-lg font-bold">
            0
          </p>
          <ThumbsDown className="text-red-400" />
        </div>
      </div>
    </div>
  )
}
