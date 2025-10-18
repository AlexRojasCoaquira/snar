<template>
  <button
    :class="[
      `inline-flex items-center justify-center font-medium
      rounded-md
      transition-all duration-300
      focus:outline-none focus:ring-1 focus:ring-offset-1
      cursor-pointer`,
      variantClasses,
      sizeClasses,
    ]"
    :type="type"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
interface ButtonProps {
  type: 'submit' | 'button'
  variant: 'primary' | 'secondary' | 'danger' | 'info'
  size: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'button',
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 transition-colors duration-300'
    case 'secondary':
      return 'bg-green-600 text-white hover:bg-gree-700'
    default:
      return 'bg-red-400 text-white hover:bg-red-300'
  }
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'px-2 py-1 text-sm'
    case 'md':
      return 'px-3 py-2 text-md'
    default:
      return 'p-2'
  }
})
</script>

<style lang="css"></style>
