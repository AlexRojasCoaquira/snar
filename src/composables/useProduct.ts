import { ref } from 'vue'
import type { Product } from '@/types'
import { getAllProducts, addProduct } from '../services/products'

export const useProducts = () => {
  const products = ref<Product[]>([])
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

  const addProductItem = async (product: Product) => {
    loading.value = true
    try {
      const data = await addProduct(product)
      if (data) {
        products.value.push(data[0])
      }
      return true
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
    addProductItem,
  }
}
