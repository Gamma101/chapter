import React, { useState } from "react"
import {
  Dialog,
  DialogClose,
  DialogFooter,
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

export default function AddBookToCollection({ bookId }: { bookId: string }) {
  const api = useApi()

  //   const [readingStatus, setReadingStatus] = useState(0)

  //   const handleAddBook = async () => {
  //     api.post(`http://localhost:5105/api/mylibrary`, {
  //       bookId,
  //       readingStatus,
  //     })
  //   }

  return (
    <Dialog>
      <form className="w-full flex items-center justify-center">
        <DialogTrigger className="w-[80%]" asChild>
          <Button className=" mt-5">
            <PlusCircle />
            <p>Add to collection</p>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-secondary">
          <DialogHeader>
            <DialogTitle>Add book to your collection</DialogTitle>
          </DialogHeader>
          <div className="flex items-center flex-col">
            {" "}
            <p className="">Your score</p>
            <div className="flex gap-1">
              <Star size={30} className="text-amber-300" />
              <Star size={30} className="text-amber-300" />
              <Star size={30} className="text-amber-300" />
              <Star size={30} className="text-amber-300" />
              <Star size={30} className="text-amber-300" />
            </div>
          </div>
          <div className=" gap-2 flex items-center flex-col">
            <Label htmlFor="statusSelect">Book status</Label>
            <Select>
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

          <Button className="w-[50%] mx-auto" type="submit">
            Save changes
          </Button>
        </DialogContent>
      </form>
    </Dialog>
  )
}
