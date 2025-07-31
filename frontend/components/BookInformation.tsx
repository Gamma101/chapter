import { BackendBook } from "@/types/book"
import { Info } from "lucide-react"
import React from "react"

export default function BookInformation({
  bookInfo,
}: {
  bookInfo: BackendBook
}) {
  return (
    <div>
      <h1 className="text-3xl font-bold">{bookInfo.title}</h1>
      <div className="font-bold text-xl">
        <p>Authors: </p>
        <div className="flex gap-2">
          {bookInfo.authors.split(",").map((author, key) => (
            <span
              key={key}
              className="font-normal px-3 rounded-full dark:text-stone-200 dark:bg-stone-600 bg-stone-200 text-stone-600 "
            >
              {author}
            </span>
          ))}
        </div>
      </div>
      <div>
        <p className="font-bold text-xl">Description</p>
        <p>{bookInfo.description.replace(/<[^>]*>/g, "")}</p>
      </div>
      <div className="flex items-center gap-4">
        <Info size={30} />
        <div className="">
          <p className="font-semibold">{bookInfo.pageCount} pages</p>
          {bookInfo.publishedDate && bookInfo.publisher && (
            <p className="">
              Published in{" "}
              <span className="font-semibold">
                {bookInfo.publishedDate.split("-").reverse().join(".")}
              </span>{" "}
              by <span className="font-semibold">{bookInfo.publisher}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
