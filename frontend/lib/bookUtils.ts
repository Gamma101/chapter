import { Book } from "@/types/book"
import axios from "axios"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

const googleAPIKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY

export const fetchPopularBooksByCategory = async (categoryName: string) => {
  const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${categoryName}&maxResults=10&key=${googleAPIKey}`
  const response = await fetch(url)
  const data = await response.json()
  console.log(data.items)

  return data.items as Book[]
}

export const checkBookAndRedirect = async (
  bookId: string,
  router: AppRouterInstance
) => {
  await axios
    .get(`http://localhost:5105/api/Books/${bookId}`)
    .then((data) => {
      console.log(data.data)
      router.push(`book/${data.data.id}`)
    })
    .catch((error) => {
      console.log(error)
    })
}
