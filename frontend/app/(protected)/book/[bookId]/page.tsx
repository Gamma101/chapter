"use client"

import BookPageSkeleton from "@/components/BookPageSkeleton"
import { BackendBook, Review } from "@/types/book"
import axios from "axios"
import { Star, ThumbsDown, ThumbsUp, User2 } from "lucide-react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function BookPage() {
  const params = useParams()
  const bookId = params.bookId as string
  const [bookInfo, setBookInfo] = useState<BackendBook | null>(null)
  const [reviews, setReviews] = useState<Review[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Parse book information
  useEffect(() => {
    const parseBookInfo = async () => {
      await axios
        .get(`http://localhost:5105/api/Books/${bookId}`)
        .then((data) => {
          console.log(data.data)
          setBookInfo(data.data)
          setIsLoading(false)
        })
        .catch((error) => {
          console.log(error)
          setIsLoading(false)
        })
    }
    parseBookInfo()
  }, [bookId])

  // Parse book reviews
  useEffect(() => {
    const parseBookReviews = async () => {
      await axios
        .get(`http://localhost:5105/api/books/${bookId}/reviews`)
        .then((data) => {
          console.log(data.data)
          setReviews(data.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    parseBookReviews()
  }, [bookId])

  return (
    <div className="flex items-center justify-center">
      {isLoading ? (
        <BookPageSkeleton />
      ) : (
        <div className="w-full max-w-[90%] mx-auto px-4">
          {bookInfo && (
            <div className="flex flex-row gap-10">
              <div className="flex items-center flex-col">
                <Image
                  alt="book"
                  src={bookInfo.thumbnailUrl as string}
                  width={300}
                  height={500}
                  unoptimized
                  className="rounded-sm max-h-[500px]"
                />
                <p className="text-2xl text-center mt-2 font-semibold">
                  Your score
                </p>
                <div className="flex gap-1">
                  <Star size={40} className="text-amber-300" />
                  <Star size={45} className="text-amber-300" />
                  <Star size={50} className="text-amber-300" />
                  <Star size={45} className="text-amber-300" />
                  <Star size={40} className="text-amber-300" />
                </div>
              </div>
              <div className="w-[50%] flex flex-col gap-5">
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
                {reviews && (
                  <div className="flex flex-col gap-5">
                    {reviews.map((preview, key) => {
                      return (
                        <div
                          key={key}
                          className="flex gap-10 bg-secondary rounded-lg p-5 justify-between items-center"
                        >
                          <div className="flex flex-row gap-5">
                            <div className="flex items-center flex-col">
                              <div className="dark:bg-stone-400 bg-stone-300 rounded-full p-2">
                                <User2 className=" rounded-full" />
                              </div>
                              <p>
                                {preview.createdBy.length > 8
                                  ? preview.createdBy.slice(0, 8) + "..."
                                  : preview.createdBy}
                              </p>
                            </div>

                            <div className="wrap-anywhere">
                              <p className="text-2xl font-semibold">
                                {preview.title}
                              </p>
                              <p className="">{preview.content}</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-center justify-between gap-2">
                            <ThumbsUp className="text-green-400" />
                            <p className="dark:bg-stone-400 bg-stone-300 px-4 rounded-lg font-bold">
                              0
                            </p>
                            <ThumbsDown className="text-red-400" />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
