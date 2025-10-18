import { ref, watch } from 'vue'

export function useStorage<T>(key: string, defaultValue: T) {
  const storedValue = localStorage.getItem(key)
  const data = ref<T>(storedValue ? JSON.parse(storedValue) : defaultValue)

  watch(
    data,
    (newValue) => {
      if (newValue === null || newValue === undefined) {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, JSON.stringify(newValue))
      }
    },
    { deep: true },
  )

  const clear = () => {
    localStorage.removeItem(key)
    data.value = defaultValue
  }

  return { data, clear }
}
