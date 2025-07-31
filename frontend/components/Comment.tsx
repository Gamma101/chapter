import { useAuth } from "@/context/AuthContext"
import { useApi } from "@/hooks/useApi"
import { Review } from "@/types/book"
import { ThumbsDown, ThumbsUp, Trash2, User2 } from "lucide-react"
import React, { useState } from "react"
import EditCommentDialog from "./EditCommentDialog"
import { deleteComment } from "@/lib/bookUtils"

export default function Comment({
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
    <div className="flex gap-10 bg-secondary rounded-lg p-5 justify-between items-center">
      <div className="flex flex-row items-center gap-5">
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

        <div className="wrap-anywhere">
          <p className="text-2xl font-semibold">{reviewData.title}</p>
          <p className="">{reviewData.content}</p>
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
}
