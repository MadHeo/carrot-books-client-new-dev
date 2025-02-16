import type { IBookList, IBookSearchParams } from '@/types/book'
import apiClient from './api.config'

const book = {
  search: async (params: IBookSearchParams) => {
    if (!apiClient) throw new Error('API 클라이언트가 초기화되지 않았습니다.')

    return await apiClient.get('/books/search', { params })
  },
  regist: async (data: IBookList) => {
    return await apiClient.post('/registered-books', data)
  },
  list: async () => {
    return await apiClient.get('/registered-books')
  },
  detail: async (params: string | string[]) => {
    return await apiClient.get(`/registered-books/${params}`)
  },
  rentals: async (data: string) => {
    try {
      const res = await apiClient.post(`/rentals`, { registeredBookId: data })
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  },
}

export default book
