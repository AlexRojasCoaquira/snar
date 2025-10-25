<!-- src/components/NotFound404.vue -->
<template>
  <main class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">
    <div class="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <!-- Illustration / left column -->
      <div class="flex items-center justify-center">
        <!-- Simple SVG illustration (customizable) -->
        <svg
          class="w-64 h-64 md:w-80 md:h-80"
          viewBox="0 0 800 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-labelledby="notfoundTitle notfoundDesc"
        >
          <title id="notfoundTitle">Página no encontrada</title>
          <desc id="notfoundDesc">Ilustración de sitio 404</desc>
          <rect x="40" y="80" width="720" height="420" rx="20" fill="#EEF2FF" />
          <path
            d="M160 460c60-80 160-90 240-70 120 28 200-40 280-100"
            stroke="#C7D2FE"
            stroke-width="12"
            stroke-linecap="round"
          />
          <circle cx="260" cy="220" r="56" fill="#6366F1" opacity="0.95" />
          <circle cx="440" cy="170" r="34" fill="#60A5FA" opacity="0.95" />
          <g transform="translate(120,320)">
            <rect x="0" y="0" width="160" height="88" rx="12" fill="#fff" />
            <rect x="190" y="-20" width="240" height="108" rx="12" fill="#fff" />
            <rect x="470" y="10" width="80" height="58" rx="10" fill="#fff" />
          </g>
        </svg>
      </div>

      <!-- Content / right column -->
      <section class="text-center md:text-left">
        <h1 class="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-3">
          404 — Página no encontrada
        </h1>
        <p class="text-gray-600 dark:text-gray-300 mb-6">
          Lo sentimos, la página que buscas no existe o fue movida. Es posible que el enlace esté
          roto o ya no esté disponible.
        </p>

        <div
          class="flex flex-col sm:flex-row sm:items-center sm:gap-3 gap-3 justify-center md:justify-start"
        >
          <RouterLink to="/" class="inline-block">
            <button
              type="button"
              class="inline-flex items-center justify-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 text-white rounded-md text-sm font-medium transition"
            >
              Volver al inicio
            </button>
          </RouterLink>

          <button
            @click="goBack"
            class="inline-flex items-center justify-center gap-2 px-5 py-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md text-sm text-gray-700 dark:text-gray-200 transition"
          >
            Ir atrás
          </button>
        </div>

        <div class="mt-6 text-sm text-gray-500 dark:text-gray-400">
          <p>
            ¿Crees que esto es un error?
            <a
              :href="reportUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="text-indigo-600 dark:text-indigo-400 hover:underline ml-1"
            >
              Reportar problema
            </a>
          </p>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const query = ref('')
const reportUrl =
  'mailto:soporte@tudominio.com?subject=Reporte%20de%20404&body=He%20encontrado%20un%20404%20en%3A%20' +
  encodeURIComponent(window.location.href)

const goBack = () => {
  if (window.history.length > 1) router.back()
  else router.push({ name: 'home' })
}

const onSearch = () => {
  const q = query.value.trim()
  if (!q) return
  // ajustar según tu ruta de búsqueda
  router.push({ name: 'home', query: { q } })
}
</script>

<style scoped>
/* Pequeños ajustes si quieres suavizar la animación */
svg {
  display: block;
}
</style>
