<template>
  <div class="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 w-full p-4">
    <article
      class="rounded-md shadow-md overflow-hidden relative hover:scale-105 transition-transform duration-200 cursor-pointer"
      v-for="product in products"
      :key="product.id"
    >
      <img :src="product.image" alt="prod-1" class="w-full h-50 object-cover" />
      <p
        class="absolute right-2 bottom-2 bg-gray-200/80 text-md font-medium text-gray-800 rounded-2xl px-2 backdrop-blur-sm border border-white/20"
      >
        {{ product.name }}
      </p>
      <p
        class="absolute right-2 top-2 bg-gray-200/80 text-md font-medium text-gray-800 rounded-2xl px-2 backdrop-blur-sm border border-white/20"
      >
        {{ product.price }}
      </p>
    </article>
  </div>
</template>

<script setup lang="ts">
import { useProducts } from '@/composables/useProduct'
import { onMounted } from 'vue'

const { products, loading, fetchProducts } = useProducts()

onMounted(() => {
  fetchProducts()
})
</script>

<style scoped></style>
