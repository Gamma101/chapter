"use client"
import React, { useEffect, useState } from "react"
import { fetchPopularBooksByCategory } from "@/lib/bookUtils"
import { Book } from "@/types/Book"
import BooksCarousel from "./BooksCarousel"
import CarouselSkeleton from "./CarouselSkeleton"
const categories = ["fantasy", "drama", "comedy"]

export default function PopularCatalog() {
  const [booksByCategories, setBooksByCategories] = useState<
    Record<string, Book[]>
  >({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const newData: Record<string, Book[]> = {}

      for (const category of categories) {
        try {
          const bookCategoryList = await fetchPopularBooksByCategory(category)
          if (bookCategoryList) {
            newData[category] = bookCategoryList
          }
        } catch (error) {
          console.error(`Error fetching ${category}:`, error)
          setIsLoading(false)
        }
      }
      setBooksByCategories((prev) => ({ ...prev, ...newData }))
      setIsLoading(false)
    }

    fetchData()
  }, [])

  return (
    <div className="flex items-center justify-center mt-40 flex-col gap-20">
      {categories.map((category) => {
        const categoryUpperCase =
          category.charAt(0).toUpperCase() + category.slice(1, category.length)
        return !isLoading ? (
          <BooksCarousel
            key={category}
            innerBooks={booksByCategories[category]}
            carouselName={categoryUpperCase}
          />
        ) : (
          <CarouselSkeleton categoryName={categoryUpperCase} />
        )
      })}
    </div>
  )
}
