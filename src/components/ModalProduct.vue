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
        {{ isEdit ? 'Editar' : 'Crear' }} producto
      </h3>
      <form class="mt-3" @submit.prevent="onSubmit">
        <Input
          id="name"
          type="text"
          placeholder="Ingrese el nombre"
          v-bind="nameAttrs"
          v-model="name"
          required
          :error="errors.name"
          v-sanitize="'letters'"
          :loading="loading"
          :disabled="loading"
          max="50"
        />
        <Input
          id="price"
          type="number"
          placeholder="Ingrese el precio"
          v-model="price"
          v-bind="priceAttrs"
          required
          :error="errors.price"
          v-sanitize="'letters'"
          :loading="loading"
          :disabled="loading"
          max="50"
        />
        <Input
          id="description"
          type="text"
          placeholder="Ingrese la description"
          v-bind="descriptionAttrs"
          v-model.trim="description"
          required
          :error="errors.description"
          v-sanitize="'description'"
          :loading="loading"
          :disabled="loading"
          max="70"
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
import { useForm, configure } from 'vee-validate'
import * as yup from 'yup'

import { useToast } from '@/composables/useToast'
import { useProducts } from '@/composables/useProduct'

import type { Product } from '@/types'

import Button from '@/components/base/Button.vue'
import Input from '@/components/base/Input.vue'

interface ModalProps {
  product: Product
  show: boolean
  isEdit: boolean
}

const props = defineProps<ModalProps>()
const { successToast, errorToast } = useToast()
const { addProductItem } = useProducts()

const loading = ref(false)

configure({
  validateOnBlur: true, // valida al salir del campo
  validateOnChange: true, // valida al cambiar el valor
  validateOnInput: true, // valida mientras escribe
  validateOnModelUpdate: true,
})
const schema = yup.object({
  name: yup
    .string()
    .max(50, 'asd')
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, 'Solo letras')
    .required('El nombre es requerido'),
  price: yup.string().required('El apellido es obligatorio'),
  description: yup.string().required('Requerido'),
})

const { setValues, handleSubmit, resetForm, errors, defineField } = useForm({
  validationSchema: schema,
  initialValues: { ...props.product },
})

const [name, nameAttrs] = defineField('name')
const [price, priceAttrs] = defineField('price')
const [description, descriptionAttrs] = defineField('description')

watch(
  () => props.product,
  (newUser) => {
    setValues({ ...newUser })
  },
  { immediate: true, deep: true },
)

const emit = defineEmits(['close', 'submit'])

const closeModal = () => {
  emit('close')
  resetForm()
}

const onSubmit = handleSubmit(async (values) => {
  console.log('Submitting user data:', values)

  loading.value = true
  if (props.isEdit && 'id' in values) {
    // try {
    //   const ok = await editUser({
    //     id: values.id,
    //     name: values.name,
    //     price: values.price,
    //     description: values.description,
    //   })
    //   if (ok) {
    //     successToast('Usuario editado correctamente 🎉')
    //     emit('close')
    //   }
    // } catch (error) {
    //   console.log('Error during sign up:', error)
    //   errorToast('Error al crear el usuario ❌')
    // } finally {
    //   loading.value = false
    // }
  } else {
    try {
      const ok = await addProductItem({
        name: values.name,
        price: Number(values.price),
        description: values.description,
        image: values.image || '',
      })
      if (!ok) throw new Error('Error adding product')
      successToast('producto creado correctamente 🎉')
      emit('close')
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
