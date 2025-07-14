import Image from "next/image"
import React from "react"

export default function MainHome() {
  return (
    <main className="flex flex-row justify-between items-center gap-30 mt-50">
      <h2 className="text-5xl max-w-130 leading-15">
        Chapter - rate & review your favorite books with ease!
      </h2>
      <div className="relative">
        {/* Элемент свечения */}
        <div className="absolute inset-0 bg-black blur-xl dark:blur-3xl  dark:bg-primary  opacity-30 -z-10 transform scale-105 rounded-full"></div>
        <Image
          width={500}
          height={200}
          src={"/main-books.png"}
          className="w-auto h-auto "
          alt="3 books"
        />
      </div>
    </main>
  )
}
