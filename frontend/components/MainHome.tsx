import Image from "next/image"
import React from "react"
import { Button } from "./ui/button"
import Link from "next/link"
import Typewriter from "typewriter-effect"

export default function MainHome() {
  return (
    <main className=" px-4 sm:px-6 pt-50">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-8 md:gap-12 lg:gap-16 max-w-7xl mx-auto">
        <div className="flex flex-col gap-6 w-full lg:w-1/2">
          <div className="flex flex-col">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              Chapter
            </h2>
            <div className="min-h-[80px] md:min-h-[100px] flex items-center">
              <Typewriter
                options={{
                  strings: [
                    "Explore worlds between the pages",
                    "Discover your next favorite read",
                    "Search, find, immerse yourself",
                    "See what readers are saying",
                  ],
                  autoStart: true,
                  loop: true,
                  wrapperClassName:
                    "text-2xl sm:text-3xl md:text-4xl inline-block",
                  cursorClassName: "ml-1 text-2xl sm:text-3xl",
                }}
              />
            </div>
          </div>

          <Link href="/collection" className="w-full sm:w-fit">
            <Button className="px-30 py-6 rounded-full w-full sm:w-auto">
              <p className="text-xl sm:text-2xl md:text-3xl">
                Let&apos;s Start!
              </p>
            </Button>
          </Link>
        </div>

        <div className="relative w-full lg:w-1/2 flex justify-center mt-8 lg:mt-0">
          <div className="absolute inset-0 bg-black blur-xl dark:blur-3xl  dark:bg-primary  opacity-30 -z-10 transform scale-105 rounded-full"></div>{" "}
          <div className=" md:w-150 sm:w-100 xs:w-100 aspect-[1/0.7] relative">
            <Image
              src="/main-books.png"
              alt="3 books"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </main>
  )
}
