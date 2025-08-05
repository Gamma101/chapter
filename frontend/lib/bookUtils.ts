import { Book, Review } from "@/types/book"
import axios, { Axios } from "axios"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

const googleAPIKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY

export const fetchPopularBooksByCategory = async (categoryName: string) => {
  const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${categoryName}&maxResults=10&key=${googleAPIKey}`
  const response = await fetch(url)
  const data = await response.json()

  return data.items as Book[]
}

export const checkBookAndRedirect = async (
  bookId: string,
  router: AppRouterInstance
) => {
  await axios.get(`http://localhost:5105/api/Books/${bookId}`).then((data) => {
    router.push(`book/${data.data.id}`)
  })
}

export const deleteBookFromCollection = async (api: Axios, bookId: string) => {
  await api.delete(`http://localhost:5105/api/mylibrary/${bookId}`).then(() => {
    // console.log("Successfully deleted book froom collection")
  })
}

export const deleteComment = async (
  api: Axios,
  reviewId: number,
  setUserReview: React.Dispatch<React.SetStateAction<Review | null>>
) => {
  await api
    .delete(`http://localhost:5105/api/reviews/${reviewId}`)
    .then(() => {
      if (typeof setUserReview === "function") {
        setUserReview(null)
      }
    })
    .catch((e) => {
      return e
    })
}
