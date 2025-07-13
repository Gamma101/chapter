"use client"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel"

export default function PopularCatalog() {
  const [books, setBooks] = useState()
  const googleAPIKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY

  const fetchPopularBooks = async () => {
    const url = `https://www.googleapis.com/books/v1/volumes?q=subject:fantasy&maxResults=10&key=${googleAPIKey}`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data.items.volumeInfo)
    setBooks(data.items)
  }

  const createCarousel = (innerBooks, carouselName) => {
    return (
      <div className="container flex flex-col items-center justify-center w-[70%]">
        <h3 className="mr-auto mb-5 text-3xl font-bold">{carouselName}</h3>
        <Carousel className="">
          <CarouselContent>
            {innerBooks &&
              innerBooks.map((book) => {
                const thumbnailUrl =
                  book.volumeInfo.imageLinks.thumbnail.replace(
                    "http:",
                    "https:"
                  )
                return (
                  <CarouselItem className="basis-1/5" key={book.id}>
                    <Image
                      alt="book"
                      src={thumbnailUrl}
                      width={180}
                      height={250}
                      unoptimized
                      className="rounded-sm"
                    />
                    <div className="">
                      <p>
                        {book.volumeInfo.title.length < 25
                          ? book.volumeInfo.title
                          : book.volumeInfo.title.substring(0, 25) + "..."}
                      </p>
                    </div>
                  </CarouselItem>
                )
              })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    )
  }
  useEffect(() => {
    fetchPopularBooks()
  }, [])

  const fictionCarousel = createCarousel(books, "Fiction")

  return (
    <div className="flex items-center justify-center mt-40">
      {fictionCarousel}
    </div>
  )
}
