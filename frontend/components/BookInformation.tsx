import { cn } from "@/lib/utils"
import { BackendBook } from "@/types/book"
import { ArrowDownIcon, Info } from "lucide-react"
import React, { useEffect, useRef, useState } from "react"
import AverageRatingLabel from "./AverageRatingLabel"

export default function BookInformation({
  bookInfo,
}: {
  bookInfo: BackendBook
}) {
  const [isDescriptionShow, setIsDescriptionShown] = useState(false)
  const [isOverflowing, setIsOverflowing] = useState(false)

  const descRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = descRef.current
    if (element) {
      const overflowing = element.scrollHeight > element.clientHeight
      setIsOverflowing(overflowing)
    }
  }, [bookInfo.description])

  return (
    <div className="flex flex-col gap-3">
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
      <AverageRatingLabel bookId={bookInfo.id} />
      <div>
        <p className="font-bold text-xl">Description</p>
        <div
          ref={descRef}
          className={cn(
            "overflow-hidden transition-all duration-300",
            isDescriptionShow ? "h-auto" : "max-h-[120px]"
          )}
        >
          <p className="break-words">
            {bookInfo.description.replace(/<[^>]*>/g, "")}
          </p>
        </div>
        {!isDescriptionShow && isOverflowing && (
          <div
            onClick={() => {
              setIsDescriptionShown(true)
            }}
            className="flex justify-center items-center cursor-pointer gap-1"
          >
            <p className="text-xl font-bold">Show more</p>
            <ArrowDownIcon size={20} />
          </div>
        )}
      </div>
      <div className="flex items-center gap-4">
        <Info size={30} />
        <div className="">
          <p className="font-semibold">{bookInfo.pageCount} Pages</p>
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
