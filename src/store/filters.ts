import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useFilters = defineStore('filters', () => {
  const filters = reactive({
    search: '',
  })
  const setSearch = (searchTerm: string) => {
    filters.search = searchTerm
  }
  const resetFilters = () => {
    filters.search = ''
  }
  return { filters, setSearch, resetFilters }
})
