"use client"
import SearchBar from "@/components/SearchBar"
import SearchBooksShelf from "@/components/SearchBooksShelf"
import { Book } from "@/types/book"
import axios from "axios"
import { useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q")
  const googleAPIKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY
  const [data, setData] = useState<Book[] | null>(null)

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

  return (
    <div className="flex items-center flex-col">
      <SearchBar className="w-[30%] mb-5" />

      {query && (
        <h1 className="text-3xl font-semibold text-center">
          Results by search: {query}
        </h1>
      )}
      <div className="flex justify-center">
        {data ? (
          <SearchBooksShelf data={data} />
        ) : (
          <div className="h-100px mt-50">
            <p className="text-3xl font-bold">
              {query ? "No books found :(" : "Find the book you like!"}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
