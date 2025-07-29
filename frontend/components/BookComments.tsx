import { useAuth } from "@/context/AuthContext"
import { useApi } from "@/hooks/useApi"
import { Review } from "@/types/book"
import { ThumbsDown, ThumbsUp, Trash2, User2 } from "lucide-react"
import EditCommentDialog from "./EditCommentDialog"

export default function BookComments({
  reviews,
  bookId,
  setReviews,
}: {
  reviews: Review[]
  bookId: string
  setReviews: React.Dispatch<React.SetStateAction<Review[] | null>>
}) {
  const api = useApi()
  const { user } = useAuth()

  const deleteComment = async (reviewId: number) => {
    await api
      .delete(`http://localhost:5105/api/review/${reviewId}`)
      .then((data) => {
        setReviews((prev) =>
          prev
            ? prev.filter((review) => review.createdBy !== data.data.createdBy)
            : []
        )
      })
      .catch((e) => {
        return e
      })
  }

  return (
    <div>
      {reviews && (
        <div className="flex flex-col gap-5">
          {reviews.map((review, key) => {
            return (
              <div
                key={key}
                className="flex gap-10 bg-secondary rounded-lg p-5 justify-between items-center"
              >
                <div className="flex flex-row items-center gap-5">
                  {user?.userName === review.createdBy && (
                    <div className="flex flex-col gap-5">
                      <EditCommentDialog
                        setReviews={setReviews}
                        bookId={bookId}
                        review={review}
                      />
                      <Trash2
                        onClick={() => {
                          deleteComment(review.id)
                        }}
                        className="text-red-400 cursor-pointer"
                      />
                    </div>
                  )}
                  <div className="flex items-center flex-col">
                    <div className="dark:bg-stone-400 bg-stone-300 rounded-full p-2">
                      <User2 className=" rounded-full" />
                    </div>
                    <p>
                      {review.createdBy.length > 8
                        ? review.createdBy.slice(0, 8) + "..."
                        : review.createdBy}
                    </p>
                  </div>

                  <div className="wrap-anywhere">
                    <p className="text-2xl font-semibold">{review.title}</p>
                    <p className="">{review.content}</p>
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
