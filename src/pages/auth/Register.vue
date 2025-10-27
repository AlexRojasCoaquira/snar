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
import { useRouter } from 'vue-router'

interface Register {
  email: string
  password: string
  firstname: string
  lastname: string
  phone: string
  birthdate?: string
}

const defaultAuth: Register = {
  email: '',
  password: '',
  firstname: '',
  lastname: '',
  birthdate: '',
  phone: '',
}

const { signUp } = useAuth()
const auth = reactive<Register>({ ...defaultAuth })
const { addUser } = useUsers()
const router = useRouter()

const submit = async () => {
  const res = await signUp({
    email: auth.email,
    password: auth.password,
  })
  console.log('Registration response:', res)
  if (res) {
    const response = await addUser(
      {
        id: res.id,
        firstname: auth.firstname,
        lastname: auth.lastname,
        phone: auth.phone,
        birthdate: auth.birthdate,
      },
      true,
    )
    console.log('User added to database:', response)
    router.push('/auth')
  }
}
</script>
