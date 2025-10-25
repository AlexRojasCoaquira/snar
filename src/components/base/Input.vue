<template>
  <div class="text-black mt-5">
    <div class="relative">
      <input
        :id="id"
        :name="id"
        :type="type"
        class="peer relative z-10 w-full rounded-md px-2 py-2 outline-none"
        placeholder=" "
        v-model="valueAux"
        :required="required"
        :disabled="disabled"
        :maxlength="max"
        @input="onInput"
        :class="variantClasses.input"
      />
      <label
        v-if="placeholder"
        :for="id"
        :class="variantClasses.label"
        class="absolute text-sm font-medium left-2 z-0 px-1 -translate-y-1/2 top-1/2 transition-all duration-200 peer-focus:-top-2 peer-focus:left-1 peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:left-1"
        >{{ placeholder }}
      </label>
      <div
        v-if="clearable"
        class="absolute right-4 -translate-y-1/2 top-1/2 text-white cursor-pointer z-20"
        @click="clearInput"
      >
        ✕
      </div>
    </div>
    <p v-if="error" class="text-sm text-red-500">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface InputProps {
  id: string
  type?: 'text' | 'email' | 'number' | 'password' | 'date'
  disabled?: boolean
  required?: boolean
  error?: string
  placeholder?: string
  modelValue?: string
  max?: string
  variant?: 'primary' | 'secondary'
  inputClass?: string
  clearable?: boolean
}

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  required: false,
  disabled: false,
  modelValue: '',
})

const valueAux = ref(props.modelValue)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'clear'): void
}>()

const onInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const clearInput = () => {
  valueAux.value = ''
  emit('clear')
}

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
