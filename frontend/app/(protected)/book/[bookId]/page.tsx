"use client"

import { Book } from "@/types/book"
import axios from "axios"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function BookPage() {
  const params = useParams()
  const bookId = params.bookId as string
  const [bookInfo, setBookInfo] = useState<Book | null>(null)

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
    <div>
      <div className=""></div>
    </div>
  )
}
