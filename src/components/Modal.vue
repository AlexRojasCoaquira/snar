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
          :loading="loading"
          :disabled="loading"
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
          :loading="loading"
          :disabled="loading"
          max="50"
        />
        <Input
          id="email"
          type="email"
          placeholder="Ingrese el correo"
          v-bind="emailAttrs"
          v-model.trim="email"
          required
          :error="errors.email"
          v-sanitize="'email'"
          :loading="loading"
          :disabled="loading"
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
          :loading="loading"
          :disabled="loading"
          max="9"
        />
        <Input
          id="birthdate"
          type="date"
          placeholder="Ingrese la fecha de nacimiento"
          v-model="birthdate"
          v-bind="birthdateAttrs"
          required
          :error="errors.birthdate"
          :loading="loading"
          :disabled="loading"
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
import { ref, watch } from 'vue'
import { useForm } from 'vee-validate'
import { schema } from '@/schemas/userSchema'

import { useUsers } from '@/composables/useUsers'
import { useAuth } from '@/composables/useAuth'
import { useToast } from '@/composables/useToast'

import type { User, UserWithId } from '@/types'

import { generateRandomPassword } from '@/utils'

import Button from '@/components/base/Button.vue'
import Input from '@/components/base/Input.vue'

interface ModalProps {
  user: User | UserWithId
  show: boolean
  isEdit: boolean
}

const props = defineProps<ModalProps>()
const { addUser, editUser, load, errors: userErr } = useUsers()
const { signUp } = useAuth()
const { successToast, errorToast } = useToast()
const loading = ref(false)

const { setValues, handleSubmit, resetForm, errors, defineField } = useForm<any>({
  validationSchema: schema,
  initialValues: { ...props.user },
})

const [firstname, firstnameAttrs] = defineField<string>('firstname')
const [lastname, lastnameAttrs] = defineField<string>('lastname')
const [email, emailAttrs] = defineField<string>('email')
const [phone, phoneAttrs] = defineField<string>('phone')
const [birthdate, birthdateAttrs] = defineField<string>('birthdate')

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

const onSubmit = handleSubmit(async (values) => {
  loading.value = true
  if (props.isEdit && 'id' in values) {
    try {
      const ok = await editUser({
        id: values.id,
        firstname: values.firstname,
        lastname: values.lastname,
        phone: values.phone,
        birthdate: values.birthdate,
      })
      if (ok) {
        successToast('Usuario editado correctamente 🎉')
        emit('close')
      }
    } catch (error) {
      console.log('Error during sign up:', error)
      errorToast('Error al crear el usuario ❌')
    } finally {
      loading.value = false
    }
  } else {
    const { email } = values
    if (!email) return
    const password = generateRandomPassword()
    try {
      const res = await signUp({ email, password })
      if (res?.id) {
        console.log('User signed up:', res.id)
        await addUser({
          id: res.id,
          firstname: values.firstname,
          lastname: values.lastname,
          phone: values.phone,
          birthdate: values.birthdate,
        })
        successToast('Usuario creado correctamente 🎉')
        emit('close')
      }
    } catch (error) {
      console.log('Error during sign up:', error)
      errorToast('Error al crear el usuario ❌')
    } finally {
      loading.value = false
    }
  }
  // emit('submit', { ...values })
  resetForm()
})
</script>

<style scoped></style>
