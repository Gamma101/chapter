import { BackendBook } from "@/types/book"
import { Axios } from "axios"
import { Loader2, X } from "lucide-react"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import AddBookToCollection from "./AddBookToCollection"
import { deleteBookFromCollection } from "@/lib/bookUtils"
import BookStars from "./BookStars"

export default function BookCollectionInfo({
  bookInfo,
  api,
  bookId,
}: {
  bookInfo: BackendBook
  api: Axios
  bookId: string
}) {
  const [isBookInLibrary, setIsBookInLibrary] = useState(false)
  const [isDeletingLoading, setIsDeletingloading] = useState(false)

  // Parse if user already added book to collection
  useEffect(() => {
    setIsDeletingloading(true)
    const parseIsBookInCollection = async () => {
      await api
        .get(`http://localhost:5105/api/mylibrary/${bookId}`)
        .then(() => {
          setIsBookInLibrary(true)
        })
        .catch(() => {
          setIsBookInLibrary(false)
        })
        .finally(() => {
          setIsDeletingloading(false)
        })
    }
    parseIsBookInCollection()
  }, [bookId, api])

  return (
    <div className="flex items-center flex-col">
      <Image
        alt="book"
        src={bookInfo.thumbnailUrl as string}
        width={300}
        height={500}
        unoptimized
        className="rounded-sm max-h-[500px]"
      />
      <BookStars api={api} bookId={bookId} />
      {isBookInLibrary ? (
        <div className="flex w-full justify-center items-center mt-3 gap-3">
          <p className="font-semibold p-3 bg-secondary rounded-lg">
            Book is in your library!
          </p>
          <div className="bg-secondary p-3 rounded-lg">
            {isDeletingLoading ? (
              <div className="animate-spin">
                <Loader2 />
              </div>
            ) : (
              <X
                onClick={() => {
                  deleteBookFromCollection(api, bookId)
                  setIsBookInLibrary(false)
                }}
                className="text-red-400"
              />
            )}
          </div>
        </div>
      ) : (
        <AddBookToCollection
          setIsBookInLibrary={setIsBookInLibrary}
          bookId={bookId}
        />
      )}
    </div>
  )
}
