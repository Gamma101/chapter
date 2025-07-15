import { Book } from "@/types/Book"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel"
import Image from "next/image"

export default function BooksCarousel({
  innerBooks,
  carouselName,
}: {
  innerBooks: Book[]
  carouselName: string
}) {
  return (
    <div className="container flex flex-col items-center justify-center w-[70%]">
      <h3 className="mr-auto mb-5 text-3xl font-bold">{carouselName}</h3>
      <Carousel className="w-full">
        <CarouselContent className="-ml-2 gap-2 sm:gap-4">
          {innerBooks &&
            innerBooks.map((book) => {
              const thumbnailUrl =
                book.volumeInfo.imageLinks?.thumbnail.replace(
                  "http:",
                  "https:"
                ) || "/empty-book.png"
              return (
                <CarouselItem
                  className="xl:basis-1/5 lg:basis-1/4 md:basis-1/3 sm:basis-1/2"
                  key={book.id}
                >
                  <div className="">
                    <Image
                      alt="book"
                      src={thumbnailUrl}
                      width={180}
                      height={250}
                      unoptimized
                      className="rounded-sm"
                    />
                    <div className="relative bottom-7 left-1 w-10"></div>
                  </div>
                  <div className="">
                    <p className="font-bold">
                      {book.volumeInfo.title.length < 25
                        ? book.volumeInfo.title
                        : book.volumeInfo.title.substring(0, 25) + "..."}
                    </p>
                    <p className="text-gray-400">
                      {book.volumeInfo.authors[0]}
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
