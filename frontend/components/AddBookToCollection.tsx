import React, { useState } from "react"
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "./ui/dialog"
import { Button } from "./ui/button"
import { useApi } from "@/hooks/useApi"
import { PlusCircle, Star } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { Label } from "./ui/label"

export default function AddBookToCollection({
  bookId,
  setIsBookInLibrary,
}: {
  bookId: string
  setIsBookInLibrary: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const api = useApi()
  const [isOpen, setIsOpen] = useState(false)

  const [rating, setRating] = useState(1)

  const handleAddBook = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const readingStatus = Number(formData.get("status"))
    await api
      .post(`http://localhost:5105/api/mylibrary`, {
        bookId,
        readingStatus,
      })
      .then(() => {
        setIsOpen(false)
        setIsBookInLibrary(true)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="w-[80%]" asChild>
        <Button className=" mt-5">
          <PlusCircle />
          <p>Add to collection</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-secondary">
        <form
          onSubmit={handleAddBook}
          className="w-full flex flex-col items-center justify-center"
        >
          <DialogHeader>
            <DialogTitle>Add book to your collection</DialogTitle>
          </DialogHeader>
          <div className="flex items-center flex-col">
            <p className="">Your score</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  size={30}
                  className={
                    i <= rating
                      ? "text-amber-300"
                      : "text-gray-300 cursor-pointer"
                  }
                  onClick={() => setRating(i)}
                  data-testid={`star-${i}`}
                />
              ))}
            </div>
          </div>
          <div className="gap-2 flex items-center flex-col mt-4">
            <Label htmlFor="statusSelect">Book status</Label>
            <Select name="status" defaultValue={"1"}>
              <SelectTrigger className="min-w-[40%]">
                <SelectValue
                  id="statusSelect"
                  placeholder="Choose your book status"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Book status</SelectLabel>
                  <SelectItem value={"0"}>Want to Read</SelectItem>
                  <SelectItem value={"1"}>Reading</SelectItem>
                  <SelectItem value={"2"}>Read</SelectItem>
                  <SelectItem value={"3"}>Dropped</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-[50%] mx-auto mt-4" type="submit">
            Save changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
