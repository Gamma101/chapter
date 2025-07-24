"use client"

import BookComments from "@/components/BookComments"
import BookPageSkeleton from "@/components/BookPageSkeleton"
import UserCommentForm from "@/components/UserCommentForm"
import { BackendBook, Review } from "@/types/book"
import axios from "axios"
import { Star } from "lucide-react"
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
          setBookInfo(data.data)
          setIsLoading(false)
        })
        .finally(() => {
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
          setReviews(data.data)
        })
        .catch(() => {})
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
                <UserCommentForm
                  setReviews={setReviews}
                  bookId={parseInt(bookId)}
                />
                {reviews && (
                  <BookComments
                    setReviews={setReviews}
                    bookId={bookId}
                    reviews={reviews}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
