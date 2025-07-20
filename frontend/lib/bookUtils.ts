import { Book } from "@/types/book"

const googleAPIKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY

export const fetchPopularBooksByCategory = async (categoryName: string) => {
  const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${categoryName}&maxResults=10&key=${googleAPIKey}`
  const response = await fetch(url)
  const data = await response.json()
  console.log(data.items)

  return data.items as Book[]
}
