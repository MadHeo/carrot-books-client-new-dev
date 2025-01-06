import type { BookList, BookSearchParams } from '@/types/book'
import apiClient from './api.config'

const book = {
  search: async (params: BookSearchParams) => {
    if (!apiClient) throw new Error('API 클라이언트가 초기화되지 않았습니다.')

    return await apiClient.get('/books/search', { params })
  },
  regist: async (data: BookList) => {
    return await apiClient.post('/registered-books', data)
  },
  list: async () => {
    return await apiClient.get('/registered-books')
  },
}

export default book
