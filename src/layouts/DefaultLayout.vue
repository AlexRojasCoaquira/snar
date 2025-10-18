<template>
  <div class="grid min-h-screen grid-cols-[250px_1fr] grid-rows-[auto_1fr] bg-gray-900 text-white">
    <Sidebar />
    <Header />
    <main class="col-start-2 row-start-2 p-6">
      <router-view />
    </main>
  </div>
</template>
<script setup lang="ts">
import Header from '@/components/layout/Header.vue'
import Sidebar from '@/components/layout/Sidebar.vue'
</script>
