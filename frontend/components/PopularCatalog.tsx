"use client"
import React, { useEffect, useState } from "react"

import { fetchPopularBooksByCategory } from "@/lib/bookUtils"
import { Book } from "@/types/Book"
import BooksCarousel from "./BooksCarousel"

const categories = ["fantasy", "drama", "comedy"]

export default function PopularCatalog() {
  const [booksByCategories, setBooksByCategories] = useState<Book[][]>([])

  useEffect(() => {
    const fetchData = async () => {
      for (const category of categories) {
        try {
          const bookCategoryList = await fetchPopularBooksByCategory(category)
          if (bookCategoryList) {
            setBooksByCategories((prev) => [...(prev || []), bookCategoryList])
          }
        } catch (error) {
          console.error(`Error fetching ${category}:`, error)
        }
      }
    }

    fetchData()
  }, [])

  return (
    <div className="flex items-center justify-center mt-40 flex-col gap-20">
      {booksByCategories.map((bookList, key) => {
        return (
          <BooksCarousel
            key={key}
            innerBooks={bookList}
            carouselName={
              categories[key].charAt(0).toUpperCase() +
              categories[key].slice(1, categories[key].length)
            }
          />
        )
      })}
    </div>
  )
}
