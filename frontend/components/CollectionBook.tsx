import { checkBookAndRedirect } from "@/lib/bookUtils"
import { cn } from "@/lib/utils"
import { CollectionItem } from "@/types/book"
import { Star } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"

export const returnBookStatus = (status: string) => {
  let result = { color: "", text: "" }
  switch (status) {
    case "WantToRead":
      result = { color: "bg-blue-400", text: "Want to Read" }
      break
    case "Reading":
      result = { color: "bg-amber-500", text: "Reading" }
      break
    case "Read":
      result = { color: "bg-green-400", text: "Read" }
      break
    case "3": // will fix later because backend doesnt have third option yet
      result = { color: "bg-red-400", text: "Dropped" }
      break
  }
  return result
}

export default function CollectionBook({ book }: { book: CollectionItem }) {
  const router = useRouter()
  const [bookStatus, setBookStatus] = useState<{
    color: string
    text: string
  } | null>(null)

  useEffect(() => {
    const stat = returnBookStatus(book.status)
    setBookStatus(stat)
  }, [book])
  return (
    <div
      onClick={() => checkBookAndRedirect(book.bookId, router)}
      className="w-[300px] mb-8 flex flex-col items-center cursor-pointer bg-secondary p-5 rounded-lg gap-2"
    >
      <div className="relative h-[250px] w-[180px]">
        <Image
          alt="book"
          src={book.thumbnailUrl}
          fill
          unoptimized
          className="rounded-lg"
        />
        <div className="relative bottom-7 left-1 w-10"></div>
      </div>
      <div className="mt-2 w-full text-center">
        <p className="font-bold truncate px-2">{book.title}</p>
        <p>
          {book.authors.split(",")[0]}{" "}
          {book.authors.split(",").length > 1 ? "and more" : ""}
        </p>
      </div>
      <div className="flex gap-1">
        {[0, 1, 2, 3, 4].map((el) => {
          return (
            <Star
              className={cn(
                el < book.userRating ? "text-yellow-400" : "text-gray-500"
              )}
              key={el}
            />
          )
        })}
      </div>
      <div className={cn("font-semibold rounded-full px-2", bookStatus?.color)}>
        {bookStatus?.text}
      </div>
    </div>
  )
}
