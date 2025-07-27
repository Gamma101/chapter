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

export default function EditCommentDialog({ review }: { review: Review }) {
  return (
    <Dialog>
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
              <Input id="title" name="title" defaultValue={review.title} />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="review">Review</Label>
              <Textarea
                id="review"
                name="review"
                className="resize-none"
                defaultValue={review.content}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
