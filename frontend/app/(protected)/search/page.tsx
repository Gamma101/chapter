"use client"
import { Book } from "@/types/book"
import axios from "axios"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q")
  const googleAPIKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY
  const [data, setData] = useState<Book[] | null>(null)
  const router = useRouter()

  const checkBookAndRedirect = async (bookId: string) => {
    await axios
      .get(`http://localhost:5105/api/Books/${bookId}`)
      .then((data) => {
        console.log(data.data)
        router.push(`book/${data.data.id}`)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    const fetchBooksByQuery = async () => {
      if (query) {
        const url = `https://www.googleapis.com/books/v1/volumes?q=${query.replace(
          " ",
          "+"
        )}&maxResults=20&key=${googleAPIKey}`
        await axios.get(url).then((response) => {
          console.log(response.data.items)
          setData(response.data.items)
        })
      }
    }
    fetchBooksByQuery()
  }, [query, googleAPIKey])

  //   const checkBookAuthors = (authors: string[]) => {
  //     let endAuthorsLine = ""
  //     if (!authors.length) return "Unknown authors"
  //     if (authors[0].length > 20) {
  //       endAuthorsLine += authors[0].slice(20) + "..."
  //       console.log(endAuthorsLine)
  //     }
  //     if (authors.length > 1) {
  //       endAuthorsLine += " and more"
  //     }
  //     return <p>{endAuthorsLine}</p>
  //   }

  return (
    <div className="bg-[url('/lines-black.svg')] dark:bg-[url('/lines-white.svg')] bg-repeat bg-center">
      <h1 className="text-3xl font-semibold text-center">
        Results by search: {query}
      </h1>
      <div className="flex justify-center">
        <div className="flex flex-wrap justify-center gap-4 py-10 max-w-[90%]">
          {data
            ? data.map((book, key) => {
                const thumbnailUrl =
                  book.volumeInfo.imageLinks?.thumbnail.replace(
                    "http:",
                    "https:"
                  ) || "placeholder-book.png"
                return (
                  <div
                    key={key}
                    onClick={() => checkBookAndRedirect(book.id)}
                    className="w-[200px] mb-8 flex flex-col items-center"
                  >
                    <div className="relative h-[250px] w-[180px]">
                      <Image
                        alt="book"
                        src={thumbnailUrl}
                        fill
                        style={{ objectFit: "contain" }}
                        unoptimized
                        className="rounded-sm"
                      />
                      <div className="relative bottom-7 left-1 w-10"></div>
                    </div>
                    <div className="mt-2 w-full text-center">
                      <p className="font-bold truncate px-2">
                        {book.volumeInfo.title}
                      </p>
                    </div>
                  </div>
                )
              })
            : ""}
        </div>
      </div>
    </div>
  )
}
