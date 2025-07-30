import { checkBookAndRedirect } from "@/lib/bookUtils"
import { CollectionItem } from "@/types/book"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React from "react"

export default function CollectionBook({ book }: { book: CollectionItem }) {
  const router = useRouter()
  return (
    <div
      onClick={() => checkBookAndRedirect(book.bookId, router)}
      className="w-[200px] mb-8 flex flex-col items-center cursor-pointer"
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
        <p>{book.authors.split(",")[0]}</p>
      </div>
    </div>
  )
}
