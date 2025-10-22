<template>
  <table class="mt-4 w-full overflow-hidden rounded-md bg-white">
    <thead class="bg-gray-100 text-gray-700 uppercase">
      <tr class="">
        <th>id</th>
        <th>nombre</th>
        <th>apellidos</th>
        <th>email</th>
        <th>teléfono</th>
        <th>acciones</th>
      </tr>
    </thead>
    <tbody class="divide-y text-center text-gray-700">
      <tr class="odd:bg-gray-300 [&>*]:p-3" v-for="user of users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.firstname }}</td>
        <td>{{ user.lastname }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.phone }}</td>
        <td class="flex gap-2">
          <Button type="button" size="sm" variant="primary" @click="$emit('edit', user)"
            >Editar</Button
          >
          <Button type="button" size="sm" variant="secondary" @click="$emit('delete', user.id)"
            >Eliminar</Button
          >
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { UserWithId } from '@/types'
import Button from '@/components/base/Button.vue'

defineProps<{ users: UserWithId[] }>()
defineEmits(['edit', 'delete'])
</script>

<style scoped></style>
