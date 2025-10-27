import { ref } from 'vue'
import type { Product, ProductForm, ProductWithId } from '@/types'
import {
  getAllProducts,
  addProduct,
  uploadImage,
  deleteProduct,
  removeImage,
} from '../services/products'

const products = ref<ProductWithId[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

export const useProducts = () => {
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

  const addProductItem = async (product: ProductForm) => {
    loading.value = true
    let url = ''
    try {
      if (product.fileImg) {
        url = await uploadImage(product.fileImg)
      }
      const payload: Product = {
        image: url,
        name: product.name,
        price: product.price,
        description: product.description,
      }
      await addProduct(payload)
      await fetchProducts()
      // console.log('data', data)
      // if (data) {
      //   products.value.push(data[0])
      //   // await fetchProducts()
      // }
    } catch (err) {
      error.value = (err as Error).message
    } finally {
      loading.value = false
    }
  }

  const removeProduct = async ({ image, id }: { id: number; image: string }) => {
    try {
      await deleteProduct(id)
      console.log('deletee', image)
      if (image) {
        const fileName = image.split('/').pop()
        if (!fileName) throw new Error('Nombre de archivo no válido')
        await removeImage(fileName)
      }
      return true
    } catch (err) {
      error.value = (err as Error).message
      loading.value = false
    }
  }

  return {
    products,
    loading,
    error,
    fetchProducts,
    addProductItem,
    removeProduct,
  }
}
