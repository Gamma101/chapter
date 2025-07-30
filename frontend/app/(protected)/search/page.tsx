"use client"
import SearchBar from "@/components/SearchBar"
import SearchBooksShelf from "@/components/SearchBooksShelf"
import { Book } from "@/types/book"
import axios from "axios"
import { LucideLoaderPinwheel } from "lucide-react"
import { useTheme } from "next-themes"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q")
  const googleAPIKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY
  const [data, setData] = useState<Book[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const theme = useTheme()

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

  useEffect(() => {
    setIsMounted(true)
  }, [])

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
          <div className="h-[50vh] mt-10 flex items-center justify-center">
            <LucideLoaderPinwheel className="animate-spin" size={60} />
          </div>
        ) : data ? (
          <SearchBooksShelf data={data} />
        ) : (
          <div className="">
            <div className="flex items-center justify-center flex-col mt-20">
              {query
                ? isMounted && (
                    <Image
                      width={100}
                      height={100}
                      alt="search"
                      className="w-100 h-100"
                      src={
                        theme.theme === "light"
                          ? "/empty-white.svg"
                          : "/empty-dark.svg"
                      }
                    />
                  )
                : isMounted && (
                    <Image
                      width={100}
                      height={100}
                      alt="search"
                      className="w-120 h-120"
                      src={
                        theme.theme === "light"
                          ? "/search-white.svg"
                          : "search-dark.svg"
                      }
                    />
                  )}
              <p className="text-4xl">
                {query ? "No books found :(" : "Find the book you like!"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
