import Image from "next/image"
import React from "react"
import { Button } from "./ui/button"
import Link from "next/link"

export default function MainHome() {
  return (
    <main className=" mt-30">
      <div className="flex lg:flex-row flex-col justify-between items-center gap-30 pt-60">
        <div className="flex flex-col gap-5 ">
          <h2 className="text-3xl max-w-130 lg:leading-15 lg:text-5xl md:text-5xl sm:text-4xl">
            Chapter - rate & review your favorite books with ease!
          </h2>
          <Link href={"/collection"}>
            <Button className="lg:p-6 md:p-3 sm:p-0 rounded-full w-full cursor-pointer">
              <p className="lg:text-3xl md:text-2xl sm:text-2xl">
                Let&apos;s Start!
              </p>
            </Button>
          </Link>
        </div>
        <div className="relative">
          {/* Элемент свечения */}
          <div className="absolute inset-0 bg-black blur-xl dark:blur-3xl  dark:bg-primary  opacity-30 -z-10 transform scale-105 rounded-full"></div>
          <Image
            width={500}
            height={200}
            src={"/main-books.png"}
            className="w-150"
            alt="3 books"
          />
        </div>
      </div>
    </main>
  )
}
