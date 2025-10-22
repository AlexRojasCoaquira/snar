<template>
  <div class="absolute inset-0 bg-gray-900/90 pt-10 text-white" v-if="show">
    <div class="mx-auto min-h-80 max-w-md rounded-md bg-white p-3 text-black relative">
      <button
        class="-top-2 -right-2 absolute rounded-full bg-red-200 size-10 flex justify-center items-center text-white font-extrabold cursor-pointer"
        type="button"
        @click="closeModal"
      >
        ✕
      </button>
      <h3 class="text-center text-2xl font-extrabold uppercase">
        {{ isEdit ? 'Editar' : 'Crear' }} usuario
      </h3>
      <form class="mt-3" @submit.prevent="onSubmit">
        <Input
          id="name"
          type="text"
          placeholder="Ingrese el nombre"
          v-bind="firstnameAttrs"
          v-model="firstname"
          required
          :error="errors.firstname"
          v-sanitize="'letters'"
          max="50"
        />
        <Input
          id="lastname"
          type="text"
          placeholder="Ingrese los apellidos"
          v-model="lastname"
          v-bind="lastnameAttrs"
          required
          :error="errors.lastname"
          v-sanitize="'letters'"
          max="50"
        />
        <Input
          id="email"
          type="email"
          placeholder="Ingrese el correo"
          v-bind="emailAttrs"
          v-model="email"
          required
          :error="errors.email"
          v-sanitize="'email'"
          max="70"
        />
        <Input
          id="phone"
          type="text"
          placeholder="Ingrese el teléfono"
          v-model="phone"
          v-sanitize="'numbers'"
          v-bind="phoneAttrs"
          required
          :error="errors.phone"
          max="9"
        />
        <Button type="submit" size="md" variant="primary" class="w-full mt-5" :disabled="loading">
          {{ loading ? 'Cargando...' : isEdit ? 'Editar' : 'Crear' }}
        </Button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import Button from '@/components/base/Button.vue'
import Input from '@/components/base/Input.vue'
import type { User, UserWithId } from '@/types'
import { useForm, configure } from 'vee-validate'
import * as yup from 'yup'

interface ModalProps {
  user: User | UserWithId
  show: boolean
  isEdit: boolean
  loading?: boolean
}

const props = defineProps<ModalProps>()
configure({
  validateOnBlur: true, // valida al salir del campo
  validateOnChange: true, // valida al cambiar el valor
  validateOnInput: true, // valida mientras escribe
  validateOnModelUpdate: true,
})
const schema = yup.object({
  firstname: yup
    .string()
    .max(50, 'asd')
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, 'Solo letras')
    .required('El nombre es requerido'),
  lastname: yup.string().required('El apellido es obligatorio'),
  email: yup.string().email().required('Requerido'),
  phone: yup
    .string()
    .matches(/^[0-9]{9}$/, 'Debe tener 9 dígitos')
    .required(),
})

const { values, setValues, handleSubmit, resetForm, errors, defineField } = useForm<any>({
  validationSchema: schema,
  initialValues: { ...props.user },
})

const [firstname, firstnameAttrs] = defineField<string>('firstname')
const [lastname, lastnameAttrs] = defineField<string>('lastname')
const [email, emailAttrs] = defineField<string>('email')
const [phone, phoneAttrs] = defineField<string>('phone')

watch(
  () => props.user,
  (newUser) => {
    setValues({ ...newUser })
    // Object.assign(userLocal, { ...newUser })
  },
  { immediate: true, deep: true },
)

const emit = defineEmits(['close', 'submit'])

const closeModal = () => {
  emit('close')
  resetForm()
}

const onSubmit = handleSubmit((values) => {
  emit('submit', { ...values })
  resetForm()
})
</script>

<style scoped></style>
