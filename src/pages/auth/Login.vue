<template>
  <form
    @submit.prevent="submit"
    class="bg-white p-4 rounded-md ring-1 ring-gray-400 w-full max-w-md"
  >
    <h2 class="text-gray-600 text-center uppercase font-bold text-xl">Iniciar sesión</h2>
    <Input
      v-model="auth.email"
      type="email"
      id="email"
      placeholder="Ingrese su correo"
      required
      v-sanitize="'email'"
      max="100"
    />
    <Input
      v-model="auth.password"
      type="password"
      id="password"
      placeholder="Ingrese su contraseña"
      required
      v-sanitize="'alphanumeric'"
      max="40"
    />
    <Button type="submit" variant="primary" size="md" class="w-full mt-5">
      {{ loading ? 'Cargando' : 'Iniciar sesión' }}
    </Button>
    <RouterLink to="/auth/sign-up">
      <p class="text-sm mt-2 font-semibold hover:underline cursor-pointer">
        ¿Olvidaste tu contraseña?
      </p>
    </RouterLink>
  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import Input from '@/components/base/Input.vue'
import Button from '@/components/base/Button.vue'
import { type Login } from '@/types'
import { useAuth } from '@/store/auth'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const defaultAuth: Login = {
  email: 'rommel.alex.rc@gmail.com',
  password: 'alexrojas123',
}
const authStore = useAuth()
const { loading } = storeToRefs(authStore)
const auth = reactive<Login>({ ...defaultAuth })

const router = useRouter()

const submit = async () => {
  const res = await authStore.signIn(auth)
  if (res) router.push('/users')
}
</script>

<style lang="scss" scoped></style>
