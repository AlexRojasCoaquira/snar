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
          v-sanitize="'numeric'"
          :disabled="loading"
          max="50"
        />
        <Input
          id="stock"
          type="number"
          placeholder="Ingrese el stock"
          v-model="stock"
          v-bind="stockAttrs"
          required
          :error="errors.stock"
          v-sanitize="'numeric'"
          :disabled="loading"
          max="50"
        />
        <Input
          id="description"
          type="text"
          placeholder="Ingrese la descripción"
          v-bind="descriptionAttrs"
          v-model.trim="description"
          required
          :error="errors.description"
          v-sanitize="'description'"
          :disabled="loading"
          max="70"
        />
        <InputFile
          v-model="fileImg"
          v-bind="fileImgAttrs"
          :error="errors.fileImg"
          placeholder="Seleccione una imagen"
          id="upload"
          :disabled="loading"
          required
        ></InputFile>
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
import * as yup from 'yup'

import { useToast } from '@/composables/useToast'
import { useProducts } from '@/composables/useProduct'

import type { Product } from '@/types'

import Button from '@/components/base/Button.vue'
import Input from '@/components/base/Input.vue'
import InputFile from '@/components/base/InputFile.vue'

import type { ProductForm } from '@/types'

interface ModalProps {
  product: Product
  show: boolean
  isEdit: boolean
}

const props = defineProps<ModalProps>()
const { successToast, errorToast } = useToast()
const { addProductItem } = useProducts()

const loading = ref(false)

const schema = yup.object({
  name: yup
    .string()
    .max(50, 'Cantidad de caracteres excedidas')
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, 'Solo puede incluir letras')
    .required('Requerido'),
  price: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .required('Requerido')
    .moreThan(0, 'El precio debe ser mayor a cero')
    .max(1000, 'El precio no debe exceder a 1000'),
  stock: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .required('Requerido')
    .moreThan(0, 'El stock debe ser mayor a cero')
    .max(100, 'El stock no debe exceder a 100'),
  description: yup.string().required('Requerido'),
  fileImg: yup.mixed<File>().required('Requerido'),
})

const { setValues, handleSubmit, resetForm, errors, defineField } = useForm<ProductForm>({
  validationSchema: schema,
  initialValues: { ...props.product, fileImg: null },
})

const [name, nameAttrs] = defineField('name')
const [price, priceAttrs] = defineField('price')
const [stock, stockAttrs] = defineField('stock')
const [description, descriptionAttrs] = defineField('description')
const [fileImg, fileImgAttrs] = defineField('fileImg')

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
      console.log('values', values)
      if (values.fileImg) {
      }
      await addProductItem({
        name: values.name,
        price: Number(values.price),
        stock: Number(values.stock),
        description: values.description,
        fileImg: values.fileImg,
        image: '',
      })
      successToast('producto creado correctamente 🎉')
      emit('close')
    } catch (error) {
      console.log('Error during sign up:', error)
      errorToast('Error al crear el usuario ❌')
    } finally {
      loading.value = false
    }
  }
  resetForm()
})
</script>

<style scoped></style>
