import { ref } from 'vue'
import { getAllOrders } from '@/services/orders'
import type { Order } from '@/types'
import { usePaginate } from '../store/paginate'
import { useFilters } from '@/store/filters'

export const useOrders = () => {
  const orders = ref<Order[]>([])
  const errors = ref<string | null>(null)
  const loading = ref(false)
  const { range, setTotalPages } = usePaginate()
  const { filters } = useFilters()

  const fetchOrders = async () => {
    try {
      loading.value = true
      const { data, count } = await getAllOrders(range.start, range.end, filters.search)
      console.log('hola2')
      orders.value = data
      if (count) setTotalPages(count)
    } catch (err) {
      errors.value = (err as Error).message
    } finally {
      loading.value = false
    }
  }

  return { orders, fetchOrders, errors, loading }
}
