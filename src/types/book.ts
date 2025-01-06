export interface BookSearchParams {
  limit: string
  page: string
  query?: string
}

export interface BookList {
  title: string
  author: string
  cover: string
  isbn: string
  categoryName: string
  publisher: string
  ownerDescription?: string
}

export interface IBookDetail {
  id: string
  cover: string
  title: string
  author: string
  owner: {
    id: string
    name: string
    profileImage: string
  }
}
