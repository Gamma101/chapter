"use client"
import SearchBar from "@/components/SearchBar"
import SearchBooksShelf from "@/components/SearchBooksShelf"
import { Book } from "@/types/book"
import axios from "axios"
import { LucideLoaderPinwheel } from "lucide-react"
import { useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q")
  const googleAPIKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY
  const [data, setData] = useState<Book[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchBooksByQuery = async () => {
      if (query) {
        setIsLoading(true)
        const url = `https://www.googleapis.com/books/v1/volumes?q=${query.replace(
          " ",
          "+"
        )}&maxResults=20&key=${googleAPIKey}`
        await axios
          .get(url)
          .then((response) => {
            setData(response.data.items)
          })
          .finally(() => setIsLoading(false))
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
        {isLoading ? (
          <div className="h-[50vh] flex items-center justify-center">
            <LucideLoaderPinwheel className="animate-spin" size={60} />
          </div>
        ) : data ? (
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
