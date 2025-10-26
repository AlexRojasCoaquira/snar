<template>
  <div class="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 w-full p-4">
    <article
      @click="openModal"
      class="rounded-md h-50 shadow-md cursor-pointer border-2 hover:scale-105 transition-all duration-300 text-5xl flex items-center justify-center font-bold text-gray-500 hover:text-gray-700 hover:border-gray-400"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="60"
        height="60"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ffffff"
        stroke-width="1.75"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-plus-icon lucide-plus"
      >
        <path d="M5 12h14" />
        <path d="M12 5v14" />
      </svg>
    </article>
    <CardProduct v-for="product in products" :key="product.id" :product="product" />
  </div>
  <ModalProduct :product="product" :isEdit="false" :show="showModal" @close="resetProduct" />
</template>

<script setup lang="ts">
import CardProduct from '@/components/CardProduct.vue'
import ModalProduct from '@/components/ModalProduct.vue'
import { useProducts } from '@/composables/useProduct'
import { onMounted, ref } from 'vue'
import type { Product } from '@/types'

const defaultProduct: Product = {
  name: '',
  price: 0,
  description: '',
  image: '',
}

const product = ref<Product>({ ...defaultProduct })
const showModal = ref(false)
const isEdit = ref(false)

const { products, loading, fetchProducts } = useProducts()

const openModal = () => {
  showModal.value = true
}

const resetProduct = () => {
  product.value = { ...defaultProduct }
  showModal.value = false
  Object.assign(product, { ...defaultProduct })
  isEdit.value = false
}

onMounted(() => {
  fetchProducts()
})
</script>

<style scoped></style>
