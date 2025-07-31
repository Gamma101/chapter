import { Review } from "@/types/book"
import Comment from "./Comment"
import useWindowWidth from "@/hooks/useWindowWidth"
import CommentMobile from "./CommentMobile"

export default function BookComments({
  reviews,
}: {
  reviews: Review[]
  bookId: string
}) {
  const width = useWindowWidth()

  return (
    <div>
      {reviews && (
        <div className="flex flex-col gap-5">
          {reviews.map((review) => {
            return (
              <div key={review.id}>
                {width && width > 600 ? (
                  <Comment review={review} />
                ) : (
                  <CommentMobile review={review} />
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
