"use client"
import AddBookToCollection from "@/components/AddBookToCollection"
import BookComments from "@/components/BookComments"
import BookPageSkeleton from "@/components/BookPageSkeleton"
import UserCommentForm from "@/components/UserCommentForm"
import { BackendBook, Review } from "@/types/book"
import axios from "axios"
import { useTheme } from "next-themes"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function BookPage() {
  const params = useParams()
  const bookId = params.bookId as string
  const [bookInfo, setBookInfo] = useState<BackendBook | null>(null)
  const [reviews, setReviews] = useState<Review[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const theme = useTheme()

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
        .get(`http://localhost:5105/api/books/${bookId}/review`)
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
                <AddBookToCollection bookId={bookId} />
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
                <UserCommentForm setReviews={setReviews} bookId={bookId} />
                <div className="mb-20">
                  <p className="text-2xl mb-1 font-bold">Comments</p>
                  {reviews ? (
                    <BookComments
                      setReviews={setReviews}
                      bookId={bookId}
                      reviews={reviews}
                    />
                  ) : (
                    <div className="bg-secondary gap-3 p-4 flex flex-col items-center justify-center rounded-lg">
                      <Image
                        width={50}
                        height={50}
                        alt="empty"
                        className="w-75 h-75"
                        src={
                          theme.theme === "light"
                            ? "/empty-white.svg"
                            : "/empty-dark.svg"
                        }
                      />
                      <p className="text-2xl">
                        Be the first one to leave a review!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
