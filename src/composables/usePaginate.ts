import { reactive } from 'vue'

export const usePaginate = () => {
  const paginate = reactive<{ page: number; perPage: number; totalPages: number }>({
    page: 1,
    perPage: 5,
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
}
