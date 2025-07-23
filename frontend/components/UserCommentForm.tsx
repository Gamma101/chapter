import { Label } from "@radix-ui/react-dropdown-menu"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import React, { useState } from "react"
import { useApi } from "@/hooks/useApi"
import { Review } from "@/types/book"

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

  const submitComment = async () => {
    await api
      .post(`http://localhost:5105/api/books/${bookId}/reviews`, {
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

          <Button onClick={submitComment} className="w-1/2 self-center">
            Submit
          </Button>
        </div>
      </div>
    </div>
  )
}
