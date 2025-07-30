"use client"
import CollectionBook from "@/components/CollectionBook"
import { useAuth } from "@/context/AuthContext"
import { CollectionItem } from "@/types/book"
import axios from "axios"
import React, { useEffect, useState } from "react"

export default function Collection() {
  const [userCollection, setUserCollection] = useState<CollectionItem[] | null>(
    null
  )
  const { user } = useAuth()

  useEffect(() => {
    const fetchUserCollection = async () => {
      await axios
        .get(`http://localhost:5105/api/mylibrary`, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        })
        .then((data) => {
          setUserCollection(data.data)
        })
        .catch((e) => {
          console.log(e)
        })
    }
    fetchUserCollection()
  }, [user])

  console.log(userCollection)

  //There will be user saved books yea :)
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-wrap justify-center gap-4 py-10 max-w-[90%]">
        {userCollection &&
          userCollection.map((book, key) => {
            return <CollectionBook key={key} book={book} />
          })}
      </div>
    </div>
  )
}
