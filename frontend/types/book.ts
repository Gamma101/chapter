export type Book = {
  volumeInfo: {
    imageLinks?: {
      thumbnail: string
    }
    title: string
    authors: string[]
  }
  id: string
}
