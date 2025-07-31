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
  authors: string
  description: string
  thumbnailUrl: string
  publisher: string
  publishedDate: string
  libraryEntries: string[]
  pageCount: number
}

export type Review = {
  id: number
  title: string
  content: string
  createdAt: string
  updatedAt: string
  createdBy: string
}

export type CollectionItem = {
  id: number
  status: string
  addedDate: string
  bookId: string
  title: string
  authors: string
  thumbnailUrl: string
}
