import { reactive } from 'vue'
import { defineStore } from 'pinia'

const PER_PAGE = 5

export const usePaginate = defineStore('paginate', () => {
  const paginate = reactive<{ page: number; perPage: number; totalPages: number }>({
    page: 1,
    perPage: PER_PAGE,
    totalPages: 0,
  })
  const setPage = (newPage: number) => {
    paginate.page = newPage
  }

  const setTotalPages = (totalPages: number) => {
    paginate.totalPages = totalPages
  }
  return {
    setTotalPages,
    setPage,
    paginate,
  }
})
