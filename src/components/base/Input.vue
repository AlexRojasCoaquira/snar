<template>
  <div class="text-black mt-5">
    <div class="relative">
      <input
        :id="id"
        :name="id"
        :type="type"
        class="peer relative z-10 w-full rounded-md border-2 border-gray-500 px-2 py-2 outline-none focus:border-blue-600"
        placeholder=" "
        :value="modelValue"
        :required="required"
        :disabled="disabled"
        :maxlength="max"
        @input="onInput"
      />
      <label
        v-if="placeholder"
        :for="id"
        :class="`absolute text-sm font-medium text-gray-600 left-2 z-0 px-1
        -translate-y-1/2 top-1/2 transition-all duration-200
        peer-focus:-top-2 peer-focus:left-1 peer-focus:text-blue-600
         peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:left-1`"
        >{{ placeholder }}
      </label>
    </div>
    <p v-if="error" class="text-sm text-red-500">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
interface InputProps {
  id: string
  type?: 'text' | 'email' | 'number' | 'password'
  disabled?: boolean
  required?: boolean
  error?: string
  placeholder?: string
  modelValue?: string
  max?: string
}

withDefaults(defineProps<InputProps>(), {
  type: 'text',
  required: false,
  disabled: false,
  modelValue: '',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const onInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<style scoped></style>
