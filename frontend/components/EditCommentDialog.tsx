import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Review } from "@/types/book"
import { Edit } from "lucide-react"
import { Textarea } from "./ui/textarea"
import { useApi } from "@/hooks/useApi"
import { useState } from "react"

export default function EditCommentDialog({
  review,
  bookId,
  setReviews,
}: {
  review: Review
  bookId: string
  setReviews: React.Dispatch<React.SetStateAction<Review[] | null>>
}) {
  const api = useApi()
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState(review.title)
  const [content, setContent] = useState(review.content)

  console.log(bookId)

  const changeBookReview = async () => {
    await api
      .put(`http://localhost:5105/api/books/${bookId}/review/${review.id}`, {
        title,
        content,
      })
      .then((data) => {
        console.log(data.data)
        setReviews((prev) =>
          prev
            ? [...prev.filter((rev) => rev.id !== review.id), data.data]
            : [data.data]
        )
        setOpen(false)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const backInputs = () => {
    setTitle(review.title)
    setContent(review.content)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Edit onClick={() => {}} className="cursor-pointer" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-secondary">
          <DialogHeader>
            <DialogTitle>Update your review</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-1">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
                defaultValue={title}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="review">Review</Label>
              <Textarea
                id="review"
                name="review"
                className="resize-none"
                onChange={(e) => setContent(e.target.value)}
                defaultValue={content}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={backInputs}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" onClick={changeBookReview}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
