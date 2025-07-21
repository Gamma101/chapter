"use client"

import BookPageSkeleton from "@/components/BookPageSkeleton"
import { BackendBook, Review } from "@/types/book"
import axios from "axios"
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
    <div className="flex items-center justify-center mt-5">
      {isLoading ? (
        <BookPageSkeleton />
      ) : (
        <div className="flex flex-col">
          {bookInfo && (
            <div className="container flex gap-10">
              <Image
                alt="book"
                src={bookInfo.thumbnailUrl}
                width={300}
                height={500}
                unoptimized
                className="rounded-sm"
              />
              <div className="w-[50%] flex flex-col gap-5">
                <h1 className="text-3xl font-bold">{bookInfo.title}</h1>
                <p>{bookInfo.description}</p>
              </div>
            </div>
          )}
          {reviews && (
            <div className="flex w-[80%] self-center bg-secondary rounded-lg p-10">
              {reviews.map((preview, key) => {
                return (
                  <div key={key} className="">
                    <p>{preview.title}</p>
                    <p>{preview.content}</p>
                    <p>{preview.createdBy}</p>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
