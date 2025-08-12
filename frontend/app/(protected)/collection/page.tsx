"use client"
import CollectionBook from "@/components/CollectionBook"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext"
import { CollectionItem } from "@/types/book"
import axios from "axios"
import { LoaderPinwheel } from "lucide-react"
import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"

export default function Collection() {
  const [userCollection, setUserCollection] = useState<CollectionItem[] | null>(
    null
  )
  const { user } = useAuth()
  const pageMode = useTheme()
  const [isLoading, setIsloading] = useState(true)

  useEffect(() => {
    const fetchUserCollection = async () => {
      await axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mylibrary`, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        })
        .then((data) => {
          setUserCollection(data.data)
        })
        .catch(() => {})
        .finally(() => {
          setIsloading(false)
        })
    }
    fetchUserCollection()
  }, [user])

  //There will be user saved books yea :)
  return (
    <div className="flex items-center justify-center">
      {isLoading ? (
        <LoaderPinwheel size={50} className="mt-40 animate-spin" />
      ) : userCollection && userCollection?.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-4 py-10 max-w-[90%]">
          {userCollection &&
            userCollection.map((book, key) => {
              return <CollectionBook key={key} book={book} />
            })}
        </div>
      ) : (
        <div className="bg-secondary m-auto gap-2 mt-20 flex items-center flex-col justify-center h-[40vh] rounded-lg w-[50%]">
          <Image
            className="w-60 h-60"
            src={
              pageMode.theme === "light"
                ? "/empty-white.svg"
                : "/empty-dark.svg"
            }
            width={100}
            height={100}
            alt="empty"
          />
          <p className="text-xl">
            It seems that you don&apos;t have any books yet
          </p>
          <Link href={"/search"}>
            <Button className="p-5 text-lg cursor-pointer">
              Search for book
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
