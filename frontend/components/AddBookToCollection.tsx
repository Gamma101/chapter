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
import { PlusCircle, RefreshCcw } from "lucide-react"
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
import { useAuth } from "@/context/AuthContext"
import Link from "next/link"

export default function AddBookToCollection({
  bookId,
  setIsBookInLibrary,
  isUpdate = false,
  parseIsBookInCollection,
}: {
  bookId: string
  setIsBookInLibrary: React.Dispatch<React.SetStateAction<boolean>>
  isUpdate?: boolean
  parseIsBookInCollection: () => void
}) {
  const api = useApi()
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useAuth()

  const handleAddBook = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const readingStatus = Number(formData.get("status"))
    if (isUpdate) {
      await api.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mylibrary/${bookId}`,
        {
          readingStatus,
        }
      )
    } else {
      await api
        .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mylibrary`, {
          bookId,
          readingStatus,
        })
        .then(() => {
          setIsOpen(false)
          setIsBookInLibrary(true)
        })
    }
    parseIsBookInCollection()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {user?.userName ? (
        <DialogTrigger className="w-[80%]" asChild>
          {isUpdate ? (
            <div className="flex gap-2 items-center cursor-pointer text-lg px-2 bg-blue-400 rounded-full">
              <RefreshCcw size={20} />
              <p>Update</p>
            </div>
          ) : (
            <Button className=" mt-5">
              <PlusCircle />
              <p>Add to collection</p>
            </Button>
          )}
        </DialogTrigger>
      ) : (
        <Link href={"/auth"}>
          <Button className="mt-5">Sign In to rate & save books</Button>
        </Link>
      )}
      <DialogContent className="sm:max-w-[425px] bg-secondary">
        <form
          onSubmit={handleAddBook}
          className="w-full flex flex-col items-center justify-center"
        >
          <DialogHeader>
            <DialogTitle>
              {isUpdate ? "Update book status" : "Add book to your collection"}
            </DialogTitle>
          </DialogHeader>
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
          <Button
            onClick={() => setIsOpen(false)}
            className="w-[50%] mx-auto mt-4"
            type="submit"
          >
            {isUpdate ? "Save changes" : "Submit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
