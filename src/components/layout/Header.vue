<template>
  <header class="col-start-2 bg-gray-850 px-6 py-4 border-b border-gray-700">
    <div class="flex justify-between max-w-6xl mx-auto w-full px-4">
      <p class="text-2xl font-semibold">Dashboard</p>
      <Button type="button" variant="secondary" size="sm" @click="logOut">Cerrar Sesión</Button>
    </div>
  </header>
</template>
<script setup lang="ts">
import Button from '@/components/base/Button.vue'
import { useAuth } from '@/store/auth'
import { useRouter } from 'vue-router'

const authStore = useAuth()

const router = useRouter()

const logOut = async () => {
  await authStore.logOut()
  router.push({ name: 'login' })
}
</script>
