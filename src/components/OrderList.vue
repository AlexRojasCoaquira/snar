<template>
  <table class="mt-4 w-full overflow-hidden rounded-md bg-white">
    <thead class="bg-gray-100 text-gray-700 uppercase">
      <tr class="">
        <th>Id</th>
        <th>Cliente</th>
        <th>Estado</th>
        <th>Total</th>
        <th>Fecha</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody class="divide-y text-center text-gray-700">
      <tr class="odd:bg-gray-300 [&>*]:p-3" v-for="order of orders" :key="order.id">
        <td>{{ order.id }}</td>
        <td>{{ order.user_id }}</td>
        <td>{{ order.status }}</td>
        <td>{{ order.total }}</td>
        <td>{{ order.created_at.slice(0, 10) }}</td>
        <td class="flex gap-2 justify-center">
          <!-- <Button type="button" size="sm" variant="primary" @click="$emit('edit', user)"
            >Editar</Button
          > -->
          <Button type="button" size="sm" variant="secondary">Cancelar</Button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { Order } from '@/types'
import Button from '@/components/base/Button.vue'

defineProps<{ orders: Order[] }>()
</script>

<style scoped></style>
