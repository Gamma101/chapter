"use client"
import React, { useEffect, useState } from "react"

import { fetchPopularBooksByCategory } from "@/lib/bookUtils"
import { Book } from "@/types/Book"
import BooksCarousel from "./BooksCarousel"

const categories = ["fantasy", "drama", "comedy"]

export default function PopularCatalog() {
  const [booksByCategories, setBooksByCategories] = useState<
    Record<string, Book[]>
  >({})

  useEffect(() => {
    const fetchData = async () => {
      const newData: Record<string, Book[]> = {}

      for (const category of categories) {
        try {
          const bookCategoryList = await fetchPopularBooksByCategory(category)
          if (bookCategoryList) {
            newData[category] = bookCategoryList
          }
        } catch (error) {
          console.error(`Error fetching ${category}:`, error)
        }
      }
      setBooksByCategories((prev) => ({ ...prev, ...newData }))
    }

    fetchData()
  }, [])

  return (
    <div className="flex items-center justify-center mt-40 flex-col gap-20">
      {categories.map((category) => {
        return (
          <BooksCarousel
            key={category}
            innerBooks={booksByCategories[category]}
            carouselName={
              category.charAt(0).toUpperCase() +
              category.slice(1, category.length)
            }
          />
        )
      })}
    </div>
  )
}
