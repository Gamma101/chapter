import { Label } from "@radix-ui/react-dropdown-menu"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import React, { useState } from "react"
import { useApi } from "@/hooks/useApi"
import { Review } from "@/types/book"
import LoadingButton from "./LoadingButton"

export default function UserCommentForm({
  bookId,
  setReviews,
}: {
  bookId: number
  setReviews: React.Dispatch<React.SetStateAction<Review[] | null>>
}) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const api = useApi()
  const [isLoading, setIsLoading] = useState(false)

  const submitComment = async () => {
    setIsLoading(true)
    await api
      .post(`http://localhost:5105/api/books/${bookId}/review`, {
        title,
        content,
      })
      .then((data) => {
        setReviews((prev) => (prev ? [data.data, ...prev] : [data.data]))
        setTitle("")
        setContent("")
      })
      .catch((e) => {
        console.log(e)
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-1">Leave your review</h2>
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

          <LoadingButton
            isLoading={isLoading}
            onClick={submitComment}
            className="w-1/2 self-center"
          >
            Submit
          </LoadingButton>
        </div>
      </div>
    </div>
  )
}
