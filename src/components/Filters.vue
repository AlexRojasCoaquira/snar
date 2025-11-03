<template>
  <div class="w-full max-w-sm relative">
    <Input
      id="search"
      type="text"
      :placeholder="label"
      v-model="filtersLocal.search"
      variant="primary"
      class="relative"
      clearable
      @clear="reset"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import Input from '@/components/base/Input.vue'
import { useFilters } from '@/store/filters'

const { setSearch, resetFilters } = useFilters()

interface Props {
  label?: string
}
withDefaults(defineProps<Props>(), {
  label: 'Buscar por nombre, apellido o email',
})

interface FiltersProps {
  search: string
}
const filtersLocal = reactive<FiltersProps>({
  search: '',
})

let debounceTimeout: number | undefined = undefined

watch(
  () => filtersLocal,
  (newValue) => {
    clearTimeout(debounceTimeout)
    debounceTimeout = window.setTimeout(() => {
      console.log('hola')
      setSearch(newValue.search)
    }, 500)
  },
  { deep: true },
)

const reset = () => {
  filtersLocal.search = ''
  resetFilters()
}
</script>

<style scoped></style>
