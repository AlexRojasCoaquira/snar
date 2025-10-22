<template>
  <form
    @submit.prevent="sendResetLink"
    class="bg-white p-4 rounded-md ring-1 ring-gray-400 w-full max-w-md"
  >
    <h1 class="text-center font-bold text-2xl text-gray-600">Forgot Password Page</h1>
    <Input id="email" type="email" v-model="email" placeholder="Ingrese su correo" />
    <Button type="submit" variant="primary" size="md" class="w-full mt-4">Enviar</Button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Input from '@/components/base/Input.vue'
import Button from '@/components/base/Button.vue'
import { useAuth } from '@/composables/useAuth'
import { useRouter } from 'vue-router'

const auth = useAuth()
const router = useRouter()

const email = ref('')
const loading = ref(false)

const sendResetLink = async () => {
  try {
    loading.value = true
    const res = await auth.resetPassword(email.value)
    router.push('/auth')
    console.log('Reset link sent:', res)
  } catch (error) {
    console.error('Error sending reset link:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped></style>
