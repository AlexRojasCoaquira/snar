<template>
  <form
    @submit.prevent="submit"
    class="bg-white p-4 rounded-md ring-1 ring-gray-400 w-full max-w-md"
  >
    <h2 class="text-gray-600 text-center uppercase font-bold text-xl">Recuperar contraseña</h2>
    <Input
      v-bind="setEmail"
      v-model="email"
      type="email"
      id="email"
      placeholder="Ingrese su correo"
      required
      v-sanitize="'email'"
      max="100"
      :error="errors.email"
    />
    <Input
      v-bind="setPassword"
      v-model="password"
      type="password"
      id="password"
      placeholder="Ingrese su contraseña"
      required
      v-sanitize="'alphanumeric'"
      max="40"
      :error="errors.password"
    />
    <Input
      v-bind="setPassword2"
      v-model="password2"
      type="password"
      id="password"
      placeholder="Ingrese su contraseña nuevamente"
      required
      v-sanitize="'alphanumeric'"
      max="40"
      :error="errors.password2"
    />
    {{ values }}
    <Button type="submit" variant="primary" size="md" class="w-full mt-5">
      {{ loading ? 'Cargando' : 'Iniciar sesión' }}
    </Button>
    <RouterLink to="/auth/forgot">
      <p class="text-sm mt-2 font-semibold hover:underline cursor-pointer text-right">
        ¿Olvidaste tu contraseña?
      </p>
    </RouterLink>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import Input from '@/components/base/Input.vue'
import Button from '@/components/base/Button.vue'
import { type Login } from '@/types'
import { recoveryPassword } from '@/services/auth'
import { useRouter } from 'vue-router'
import { useForm, configure } from 'vee-validate'
import * as yup from 'yup'

interface LoginRecovery extends Login {
  password2: string
}

const defaultAuth: LoginRecovery = {
  email: '',
  password: '',
  password2: '',
}

const auth = reactive<LoginRecovery>({ ...defaultAuth })
const loading = ref(false)

const schema = yup.object({
  email: yup.string().email('Correo inválido').required('El correo es obligatorio'),
  password: yup
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es obligatoria'),
  password2: yup
    .string()
    .oneOf([yup.ref('password')], 'Las contraseñas deben coincidir')
    .required('La confirmación de la contraseña es obligatoria'),
})

const { values, handleSubmit, errors, defineField } = useForm({
  validationSchema: schema,
  initialValues: auth,
})

const [email, setEmail] = defineField('email')
const [password, setPassword] = defineField('password')
const [password2, setPassword2] = defineField('password2')

const router = useRouter()

const submit = handleSubmit(async () => {
  loading.value = true
  try {
    const res = await recoveryPassword({
      email: auth.email,
      password: auth.password,
    })
    console.log('Recovery response:', res)
    if (res) router.push('/users')
  } catch (error) {
    console.error('Error during password recovery:', (error as Error).message)
  } finally {
    loading.value = false
  }
})
</script>

<style lang="scss" scoped></style>
