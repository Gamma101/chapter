"use client"

import BookPageSkeleton from "@/components/BookPageSkeleton"
import { BackendBook, Review } from "@/types/book"
import axios from "axios"
import { User2 } from "lucide-react"
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
              <Image
                alt="book"
                src={bookInfo.thumbnailUrl}
                width={300}
                height={500}
                unoptimized
                className="rounded-sm max-h-[500px]"
              />
              <div className="w-[50%] flex flex-col gap-5">
                <h1 className="text-3xl font-bold">{bookInfo.title}</h1>
                <p>{bookInfo.description}</p>
                {reviews && (
                  <div className="flex flex-col gap-5">
                    {reviews.map((preview, key) => {
                      return (
                        <div
                          key={key}
                          className="flex gap-10 bg-secondary rounded-lg p-5"
                        >
                          <div className="flex items-center flex-col">
                            <User2 />
                            <p>{preview.createdBy}</p>
                          </div>

                          <div className="">
                            <p className="text-2xl font-semibold">
                              {preview.title}
                            </p>
                            <p>
                              {preview.content}
                              {preview.content}
                              {preview.content}
                              {preview.content}
                              {preview.content}
                              {preview.content}
                              {preview.content}
                              {preview.content}
                            </p>
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
