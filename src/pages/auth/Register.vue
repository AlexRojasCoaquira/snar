<template>
  <form
    @submit.prevent="submit"
    class="bg-white p-4 rounded-md ring-1 ring-gray-400 w-full max-w-md"
  >
    <h2 class="text-gray-600 text-center uppercase font-bold text-xl">Crear cuenta</h2>
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
    <Input
      v-model="auth.firstname"
      type="text"
      id="firstname"
      placeholder="Ingrese sus nombres"
      required
      v-sanitize="'letters'"
      max="40"
    />
    <Input
      v-model="auth.lastname"
      type="text"
      id="lastname"
      placeholder="Ingrese sus apellidos"
      required
      v-sanitize="'letters'"
      max="40"
    />
    <Input
      v-model="auth.phone"
      type="text"
      id="phone"
      placeholder="Ingrese su teléfono"
      required
      v-sanitize="'numeric'"
      max="9"
    />

    <Button type="submit" variant="primary" size="md" class="w-full mt-5"> Crear cuenta </Button>
    <RouterLink to="/auth" class="text-right">
      <p class="text-sm mt-2 font-semibold hover:underline cursor-pointer">
        Volver a iniciar sesión
      </p>
    </RouterLink>
  </form>
</template>

<script setup lang="ts">
import Input from '@/components/base/Input.vue'
import Button from '@/components/base/Button.vue'
import { reactive } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useUsers } from '@/composables/useUsers'

interface Register {
  email: string
  password: string
  firstname: string
  lastname: string
  phone: string
  // gender: string
}

const defaultAuth: Register = {
  email: '',
  password: '',
  firstname: '',
  lastname: '',
  // gender: '',
  phone: '',
}

const { signUp } = useAuth()
const auth = reactive<Register>({ ...defaultAuth })
const { addUser } = useUsers()

const submit = async () => {
  const res = await signUp(auth)
  if (res.user) {
    const response = await addUser({
      email: auth.email,
      firstname: auth.firstname,
      lastname: auth.lastname,
      phone: auth.phone,
    })
    console.log('User added:', response)
  }
}
</script>
