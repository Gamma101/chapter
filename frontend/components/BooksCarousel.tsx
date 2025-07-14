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
      <Carousel className="">
        <CarouselContent>
          {innerBooks &&
            innerBooks.map((book) => {
              const thumbnailUrl =
                book.volumeInfo.imageLinks?.thumbnail.replace(
                  "http:",
                  "https:"
                ) || "/empty-book.png"
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
