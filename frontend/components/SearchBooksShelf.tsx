import { Book } from "@/types/book"
import { checkBookAndRedirect } from "@/lib/bookUtils"
import Image from "next/image"
import React from "react"
import { useRouter } from "next/navigation"

export default function SearchBooksShelf({ data }: { data: Book[] }) {
  const router = useRouter()
  const shortenAuthors = (authors: string[]) => {
    if (!authors || authors.length === 0) return "Unknown author"
    return authors[0].length > 15
      ? authors[0].slice(0, 15).trim() + "..."
      : authors[0]
  }
  return (
    <div className="flex flex-wrap justify-center gap-4 py-10 max-w-[90%]">
      {data.map((book, key) => {
        const thumbnailUrl =
          book.volumeInfo.imageLinks?.thumbnail.replace("http:", "https:") ||
          "placeholder-book.png"
        return (
          <div
            key={key}
            onClick={() => checkBookAndRedirect(book.id, router)}
            className="w-[200px] mb-8 flex flex-col items-center cursor-pointer"
          >
            <div className="relative h-[250px] w-[180px]">
              <Image
                alt="book"
                src={thumbnailUrl}
                fill
                style={{ objectFit: "contain" }}
                unoptimized
                className="rounded-sm"
              />
              <div className="relative bottom-7 left-1 w-10"></div>
            </div>
            <div className="mt-2 w-full text-center">
              <p className="font-bold truncate px-2">{book.volumeInfo.title}</p>
              {book.volumeInfo.authors ? (
                <p>{shortenAuthors(book.volumeInfo?.authors)}</p>
              ) : (
                ""
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
