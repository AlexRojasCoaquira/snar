<template>
  <header class="col-start-2 bg-gray-850 p-4 border-b border-gray-700">
    <h1 class="text-2xl font-semibold">Dashboard</h1>
    <Button type="button" variant="secondary" size="sm" @click="logOut">Cerrar Sesión</Button>
  </header>
</template>
<script setup>
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
