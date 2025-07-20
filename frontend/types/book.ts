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

export type BackendBook = {
  title: string
  authors: string[]
  description: string
  thumbnailUrl: string
  publishedDate: string
  libraryEntries: string[]
}

export type Review = {
  title: string
  content: string
  createdAt: string
  updatedAt: string
  createdBy: string
}
