import { getAllProducts } from '../services/products'
import { ref } from 'vue'

interface Products {
  id: number
  name: string
  description: string
  price: number
  stock: number
  image: string
}

export const useProducts = () => {
  const products = ref<Products[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchProducts = async () => {
    loading.value = true
    try {
      const data = await getAllProducts()
      products.value = data ?? []
    } catch (err) {
      error.value = (err as Error).message
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    loading,
    error,
    fetchProducts,
  }
}
