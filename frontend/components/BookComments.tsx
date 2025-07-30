import { Review } from "@/types/book"
import Comment from "./Comment"

export default function BookComments({
  reviews,
  bookId,
}: {
  reviews: Review[]
  bookId: string
}) {
  return (
    <div>
      {reviews && (
        <div className="flex flex-col gap-5">
          {reviews.map((review) => {
            return <Comment bookId={bookId} key={review.id} review={review} />
          })}
        </div>
      )}
    </div>
  )
}
