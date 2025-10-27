<template>
  <div class="text-black mt-5">
    <div class="relative">
      <input
        :id="id"
        :name="id"
        type="file"
        class="hidden"
        ref="fileInputRef"
        :class="variantClasses.input"
        accept="image/*"
        @change="handleFile"
        :disabled="disabled"
      />
      <div class="flex gap-2">
        <div
          :class="[
            'relative w-full rounded-md p-2 border-2 h-10 text-sm font-medium',
            disabled ? 'border-gray-400 text-gray-400' : '',
          ]"
        >
          {{ fileName || 'Cargue una imagen' }}
        </div>
        <label
          :for="id"
          :class="[
            'w-20  flex justify-center items-center rounded cursor-pointer text-white',
            selectedFile
              ? 'bg-blue-500 hover:bg-blue-600'
              : 'bg-gray-500  font-semibold hover:bg-gray-600',
            disabled ? 'bg-gray-300' : '',
          ]"
          >Subir</label
        >
      </div>
      <div v-if="previewUrl" class="mt-2 flex justify-center">
        <img
          :src="previewUrl"
          alt="Vista previa"
          class="w-40 h-40 object-cover rounded-lg border"
        />
      </div>
      <!-- <label
        v-if="placeholder"
        :class="variantClasses.label"
        class="absolute text-sm font-medium left-2 z-0 px-1 -translate-y-1/2 top-1/2 transition-all duration-200"
        >{{ placeholder }}
      </label> -->
      <p v-if="error" class="text-sm text-red-500">{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
interface InputFileProps {
  modelValue: File | null
  placeholder: string
  id: string
  variant?: string
  error?: string
  required?: boolean
  disabled?: boolean
}
const MAX_FILE_SIZE = 5 * 1024 * 1024
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg']

const props = defineProps<InputFileProps>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: File | null): void
}>()

const errorMsg = ref<string>(props.error || '')
const fileInputRef = ref<HTMLInputElement | null>(null)
const fileName = ref<string | null>(null)
const previewUrl = ref<string | null>(null)
const selectedFile = ref<File | null>(null)

const handleFile = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  console.log('file', file)
  if (!file) return

  if (!ALLOWED_TYPES.includes(file.type)) {
    errorMsg.value = 'Solo se permiten imágenes PNG o JPG/JPEG.'
    clearFile()
    return
  }

  if (file.size > MAX_FILE_SIZE) {
    errorMsg.value = 'El tamaño máximo permitido es de 5 MB.'
    clearFile()
    return
  }

  selectedFile.value = file
  fileName.value = file.name
  previewUrl.value = URL.createObjectURL(file)
  emit('update:modelValue', file)
}

const clearFile = () => {
  selectedFile.value = null
  fileName.value = null
  previewUrl.value = null

  // limpiar valor real del input (importante)
  if (fileInputRef.value) {
    fileInputRef.value.value = ''
  }
  emit('update:modelValue', null)
}

watch(
  () => props.error,
  (newError) => {
    errorMsg.value = newError || ''
  },
)
const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return {
        label: 'text-gray-300 peer-focus:text-gray-300',
        input: 'border-1 border-gray-300 text-gray-300 focus:border-gray-300',
      }
    case 'secondary':
      return {
        label: 'text-gray-600',
        input:
          'border-gray-300 focus:border-gray-500 hover:border-gray-400 focus:ring-2 focus:ring-gray-200 text-gray-900',
      }
    default:
      return {
        label: 'text-gray-600 peer-focus:text-blue-600',
        input: 'border-2 border-gray-500 text-gray-700 focus:border-blue-600',
      }
  }
})
</script>

<style scoped></style>
