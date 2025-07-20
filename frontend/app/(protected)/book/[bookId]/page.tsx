"use client"

import { BackendBook } from "@/types/book"
import axios from "axios"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function BookPage() {
  const params = useParams()
  const bookId = params.bookId as string
  const [bookInfo, setBookInfo] = useState<BackendBook | null>(null)
  const [reviews, setReviews] = useState(null)

  useEffect(() => {
    const parseBookInfo = async () => {
      await axios
        .get(`http://localhost:5105/api/Books/${bookId}`)
        .then((data) => {
          console.log(data.data)
          setBookInfo(data.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    parseBookInfo()
  }, [bookId])

  return (
    <div className="flex items-center justify-center">
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
    </div>
  )
}
