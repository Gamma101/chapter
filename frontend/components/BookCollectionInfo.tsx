import { BackendBook, CollectionItem } from "@/types/book"
import { Axios } from "axios"
import { BookX, Loader2 } from "lucide-react"
import Image from "next/image"
import React, { useCallback, useEffect, useState } from "react"
import AddBookToCollection from "./AddBookToCollection"
import { deleteBookFromCollection } from "@/lib/bookUtils"
import BookStars from "./BookStars"
import { returnBookStatus } from "./CollectionBook"
import { cn } from "@/lib/utils"

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
  const [statusInfo, setStatusInfo] = useState<CollectionItem | null>(null)
  const [statusText, setStatusText] = useState<{
    color: string
    text: string
  } | null>(null)

  const parseIsBookInCollection = useCallback(async () => {
    await api
      .get(`http://localhost:5105/api/mylibrary/${bookId}`)
      .then((data) => {
        setIsBookInLibrary(true)
        setStatusInfo(data.data)
      })
      .catch(() => {
        setIsBookInLibrary(false)
      })
      .finally(() => {
        setIsDeletingloading(false)
      })
  }, [api, bookId])

  // Parse if user already added book to collection
  useEffect(() => {
    setIsDeletingloading(true)

    parseIsBookInCollection()
  }, [bookId, api, parseIsBookInCollection])

  useEffect(() => {
    let stat: { color: string; text: string } | null = null
    if (statusInfo?.status) {
      stat = returnBookStatus(statusInfo.status)
    }
    setStatusText(stat)
  }, [statusInfo, setIsBookInLibrary])

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
      {isDeletingLoading ? (
        <div className="animate-spin">
          <Loader2 />
        </div>
      ) : isBookInLibrary && statusText ? (
        <div className="flex flex-col mt-3 gap-2 items-center justify-center">
          <div className="flex gap-3">
            <p className="text-xl">Status: </p>
            <div className={cn(statusText?.color, "px-4 rounded-full text-xl")}>
              {statusText?.text}
            </div>
          </div>
          <div className="flex gap-3">
            <AddBookToCollection
              parseIsBookInCollection={parseIsBookInCollection}
              isUpdate={true}
              setIsBookInLibrary={setIsBookInLibrary}
              bookId={bookId}
            />
            <div
              onClick={() => {
                deleteBookFromCollection(api, bookId)
                setIsBookInLibrary(false)
              }}
              className="flex gap-2 items-center cursor-pointer text-lg px-2 bg-red-400 rounded-full"
            >
              <BookX size={20} />
              <p>Remove</p>
            </div>
          </div>
        </div>
      ) : (
        // <div className="flex w-full justify-center items-center mt-3 gap-3">
        //   <p className="font-semibold p-3 bg-secondary rounded-lg">
        //     Book is in your library!
        //   </p>

        //   <div className="bg-secondary p-3 rounded-lg">
        //     {isDeletingLoading ? (
        //       <div className="animate-spin">
        //         <Loader2 />
        //       </div>
        //     ) : (
        //       <X
        //         onClick={() => {
        //           deleteBookFromCollection(api, bookId)
        //           setIsBookInLibrary(false)
        //         }}
        //         className="text-red-400"
        //       />
        //     )}
        //   </div>
        // </div>
        <AddBookToCollection
          parseIsBookInCollection={parseIsBookInCollection}
          setIsBookInLibrary={setIsBookInLibrary}
          bookId={bookId}
        />
      )}
    </div>
  )
}
