"use client"
import BookCollectionInfo from "@/components/BookCollectionInfo"
import BookComments from "@/components/BookComments"
import BookInformation from "@/components/BookInformation"
import BookPageSkeleton from "@/components/BookPageSkeleton"
import UserCommentForm from "@/components/UserCommentForm"
import { useAuth } from "@/context/AuthContext"
import { useApi } from "@/hooks/useApi"
import { BackendBook, Review } from "@/types/book"
import axios from "axios"
import { useTheme } from "next-themes"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function BookPage() {
  const api = useApi()
  const params = useParams()
  const bookId = params.bookId as string
  const [bookInfo, setBookInfo] = useState<BackendBook | null>(null)
  const [reviews, setReviews] = useState<Review[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const theme = useTheme()
  const { user } = useAuth()

  // Parse book information
  useEffect(() => {
    const parseBookInfo = async () => {
      await axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Books/${bookId}`)
        .then((data) => {
          setBookInfo(data.data)
        })
        .catch(() => {})
        .finally(() => {
          setIsLoading(false)
        })
    }
    parseBookInfo()
  }, [bookId])

  // Parse book reviews
  useEffect(() => {
    if (!user) return
    const parseBookReviews = async () => {
      await axios
        .get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${bookId}/reviews`
        )
        .then((data) => {
          setReviews(
            data.data.filter((rev: Review) => rev.createdBy !== user?.userName)
          )
        })
        .catch(() => {})
    }
    parseBookReviews()
  }, [bookId, user])

  return (
    <div className="flex items-center justify-center">
      {isLoading ? (
        <BookPageSkeleton />
      ) : (
        <div className="w-full max-w-[90%] mx-auto px-4">
          {bookInfo && (
            <div className="flex flex-col lg:flex-row md:flex-row xl:flex-row xs:flex-col sm:flex-col gap-10">
              <BookCollectionInfo
                bookId={bookId}
                bookInfo={bookInfo}
                api={api}
              />
              <div className="w-full xl:w-[50%] lg:w-[50%] flex flex-col gap-5">
                <BookInformation bookInfo={bookInfo} />
                <UserCommentForm setReviews={setReviews} bookId={bookId} />
                <div className="mb-20">
                  <p className="text-2xl mb-1 font-bold">All reviews</p>
                  {reviews && reviews?.length > 0 ? (
                    <BookComments bookId={bookId} reviews={reviews} />
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
                      <p className="text-2xl">No other reviews yet :(</p>
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
