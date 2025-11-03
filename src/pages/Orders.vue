<template>
  <main class="mx-auto max-w-6xl p-4">
    <div class="flex justify-end items-center">
      <Filters @filter="onFilter" label="Buscar por cliente" />
    </div>
    <div class="animate-pulse mt-4" v-if="loading">
      <div
        v-for="i in 5"
        :key="i"
        class="flex justify-between items-center bg-gray-100 odd:bg-gray-300 p-4"
      >
        <div class="flex gap-4 items-center w-full">
          <div class="h-2 bg-gray-500 rounded w-1/12"></div>
          <div class="h-2 bg-gray-500 rounded w-2/12"></div>
          <div class="h-2 bg-gray-500 rounded w-2/12"></div>
          <div class="h-2 bg-gray-500 rounded w-2/12"></div>
          <div class="h-2 bg-gray-500 rounded w-2/12"></div>
        </div>
        <div class="flex gap-2 items-center">
          <div class="h-6 w-20 bg-gray-600 rounded"></div>
          <div class="h-6 w-20 bg-gray-600 rounded"></div>
        </div>
      </div>
    </div>
    <p class="text-white text-center" v-if="!loading && orders.length === 0">
      No se encontraron pedidos
    </p>
    <p class="text-white text-center" v-if="errors">Ocurrió un error al cargar los datos</p>
    <OrderList v-if="!errors && !loading && orders.length > 0" :orders="orders" />
    <Paginate
      v-if="paginate.totalPages > 0"
      :page-count="paginate.totalPages"
      :click-handler="handlePageChange"
      :force-page="paginate.page"
      :prev-text="'<'"
      :next-text="'>'"
      :prev-link-class="'bg-gray-600 size-10 p-2 rounded  flex items-center justify-center cursor-pointer hover:bg-gray-500'"
      :next-link-class="'bg-gray-600 size-10 p-2 rounded  flex items-center justify-center cursor-pointer hover:bg-gray-500'"
      :container-class="'flex justify-center items-center gap-2 mt-3 p-3'"
      page-class="bg-white text-black p-2 rounded size-10 flex items-center justify-center cursor-pointer hover:bg-gray-200"
      page-link-class="size-10 flex justify-center items-center"
      active-class="bg-yellow-400 size-10  text-gray-800"
      active-link-class="bg-red-200"
    >
    </Paginate>
  </main>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
// @ts-ignore
import Paginate from 'vuejs-paginate-next'

import { useOrders } from '@/composables/useOrders'

import { usePaginate } from '@/store/paginate'
import { useFilters } from '@/store/filters'

// import Modal from '@/components/Modal.vue'
import Filters from '@/components/Filters.vue'
import OrderList from '@/components/OrderList.vue'

const { paginate, setTotalPages, setPage } = usePaginate()
const { filters, setSearch } = useFilters()

const { orders, fetchOrders, loading, errors } = useOrders()

const onFilter = (term: string) => {
  console.log('term', term)
  // setSearch(term)
  // setPage(1)
  // setTotalPages(0)
}

const handlePageChange = (page: number) => {
  setPage(page)
}

watch(
  () => filters.search,
  () => {
    console.log('da')
    setPage(1)
    setTotalPages(0)
    fetchOrders()
  },
)

onMounted(() => {
  fetchOrders()
})
</script>
