<template>
  <article
    class="group rounded-md shadow-md overflow-hidden relative hover:scale-105 transition-transform duration-200 cursor-pointer"
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
      S/ {{ product.price }}
    </p>
    <div class="hidden group-hover:block absolute inset-0 hover:bg-gray-700/80 rounded p-4">
      <div class="">
        {{ product.description }}
      </div>
      <span @click="handleDelete">Eliminar</span>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { ProductWithId } from '@/types'

const props = defineProps<{
  product: ProductWithId
}>()
const emit = defineEmits<{
  (
    e: 'delete',
    payload: {
      id: number
      image: string
    },
  ): void
}>()

const handleDelete = () => {
  const { image, id } = props.product
  emit('delete', { image, id })
}
</script>

<style scoped></style>
