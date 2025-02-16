export interface IBookSearchParams {
  limit: string
  page: string
  query?: string
}

export interface IBookList {
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

export interface IOwner {
  id: string
  name: string
  profileImage: string
}

export interface IBookSelectDetail {
  id: string
  isbn: string
  title: string
  categoryName: string
  author: string
  publisher: string
  cover: string
  ownerDescription: string
  owner: IOwner
  rentalStatus: 'available' | 'unavailable'
}
