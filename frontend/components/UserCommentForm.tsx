import { Label } from "@radix-ui/react-dropdown-menu"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import React, { useEffect, useState } from "react"
import { useApi } from "@/hooks/useApi"
import { Review } from "@/types/book"
import LoadingButton from "./LoadingButton"
import Comment from "./Comment"
import { useAuth } from "@/context/AuthContext"
import useWindowWidth from "@/hooks/useWindowWidth"
import CommentMobile from "./CommentMobile"
import { Button } from "./ui/button"
import Link from "next/link"

export default function UserCommentForm({
  bookId,
}: {
  bookId: string
  setReviews: React.Dispatch<React.SetStateAction<Review[] | null>>
}) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const api = useApi()
  const [isLoading, setIsLoading] = useState(false)
  const [userReview, setUserReview] = useState<Review | null>(null)
  const { user } = useAuth()
  const width = useWindowWidth()

  const getUserReview = async () => {
    await api
      .get(`http://localhost:5105/api/books/${bookId}/reviews`)
      .then((data) => {
        const userComm = data.data.filter(
          (rev: Review) => rev.createdBy === user?.userName
        )[0]
        if (userComm) {
          setUserReview(userComm)
        }
      })
      .catch(() => {})
  }

  const submitComment = async () => {
    setIsLoading(true)
    await api
      .post(`http://localhost:5105/api/books/${bookId}/reviews`, {
        title,
        content,
      })
      .then(() => {
        setTitle("")
        setContent("")
        getUserReview()
      })
      .catch(() => {})
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    getUserReview()
  }, [user])

  return (
    <div>
      <h2 className="text-2xl font-bold mb-1">
        {userReview ? "Your review" : "Leave your review"}
      </h2>
      {userReview ? (
        <div key={userReview.id}>
          {width && width > 600 ? (
            <Comment
              setUserReview={setUserReview}
              isEditing={true}
              review={userReview}
            />
          ) : (
            <CommentMobile
              setUserReview={setUserReview}
              isEditing={true}
              review={userReview}
            />
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center bg-secondary p-5 rounded-lg">
          <div className="w-[80%] flex flex-col gap-3">
            <Label className="flex flex-col items-start">
              <p>Title</p>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                id="title"
                className="bg-primary-foreground m-auto"
              />
            </Label>

            <Label className="flex flex-col items-start">
              <p>Review</p>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="bg-primary-foreground m-auto resize-none"
              />
            </Label>

            {user?.userName ? (
              <LoadingButton
                isLoading={isLoading}
                onClick={submitComment}
                className="w-1/2 self-center"
              >
                Submit
              </LoadingButton>
            ) : (
              <Link className="w-1/2 self-center" href={"/auth"}>
                <Button className="w-full">Sign In to leave review</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
