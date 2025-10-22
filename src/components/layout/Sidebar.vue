<template>
  <aside class="col-span-1 row-span-2 bg-gray-800 p-4">
    <h2 class="text-xl font-bold mb-4">Panel</h2>
    <nav class="space-y-2">
      <ul>
        <li v-for="item of dashboardRoutes" :key="item.path">
          <RouterLink
            :to="item.path"
            :class="[
              'rounded-md px-3 py-2 transition-colors duration-150 block',
              route.path.startsWith(item.path) ? 'bg-blue-600 text-white' : 'hover:bg-gray-200',
            ]"
          >
            {{ item.name }}
          </RouterLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>
<script setup lang="ts">
import { useRouter, useRoute, RouterLink } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()
const route = useRoute()
const dashboardRoutes = computed(() => {
  const main = router.getRoutes().find((r) => r.path === '/')
  return main?.children?.filter((r) => r.name) || []
})
</script>
