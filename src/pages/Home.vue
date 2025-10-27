<template>
  <main class="mx-auto max-w-6xl p-4">
    <!-- <h1 class="text-center text-3xl text-white">Mis usuarios</h1> -->
    <div class="flex justify-between items-center">
      <Button type="button" size="md" variant="primary" @click="openModal">Agregar usuario </Button>
      <Filters @filter="onFilter" />
    </div>
    <!-- <p class="text-white text-center" >Cargando...</p> -->
    <div class="animate-pulse mt-4" v-if="load">
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
    <p class="text-white text-center" v-if="!load && users.length === 0">
      No se encontraron usuario
    </p>
    <p class="text-white text-center" v-if="errors">Ocurrió un error al cargar los datos</p>
    <UserList
      v-if="!errors && !load && users.length > 0"
      :users="users"
      @edit="openModal"
      @delete="removeUser"
    />
    <Modal :isEdit="isEdit" :user="user" :show="showModal" @close="resetUser" />
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
import { onMounted, reactive, ref, watch } from 'vue'
// @ts-ignore
import Paginate from 'vuejs-paginate-next'

import { useUsers } from '@/composables/useUsers'
import { useToast } from '@/composables/useToast'

import type { User, UserWithId } from '@/types'

import { usePaginate } from '@/store/paginate'
import { useFilters } from '@/store/filters'

import Button from '@/components/base/Button.vue'
import Modal from '@/components/Modal.vue'
import UserList from '@/components/UserList.vue'
import Filters from '@/components/Filters.vue'

const { paginate, setTotalPages, setPage } = usePaginate()
const { filters, setSearch } = useFilters()

const { users, deleteUser, loading, load, errors, getAllUsers } = useUsers()
const { successToast, errorToast } = useToast()

const defaultUser = {
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
}

const showModal = ref(false)
const user = reactive<User | UserWithId>({ ...defaultUser })
const isEdit = ref(false)

const resetUser = () => {
  showModal.value = false
  Object.assign(user, { ...defaultUser })
  isEdit.value = false
}

const openModal = (userData?: UserWithId) => {
  showModal.value = true
  isEdit.value = Boolean(userData && 'id' in userData)
  // user = isEdit.value ? { ...(userData as UserWithId) } : { ...defaultUser }
  Object.assign(user, isEdit.value ? { ...(userData as UserWithId) } : { ...defaultUser })
}

const onFilter = (term: string) => {
  setSearch(term)
  setPage(1)
  setTotalPages(0)
  getAllUsers()
}

const handlePageChange = (page: number) => {
  setPage(page)
  getAllUsers()
}

const removeUser = async (id: string) => {
  const ok = await deleteUser(id)
  if (ok) {
    successToast('Usuario eliminado correctamente 🗑️')
  } else {
    errorToast('Error al eliminar el usuario ❌')
  }
  setPage(1)
  getAllUsers()
}

watch(
  () => filters.search,
  () => {
    setPage(1)
    setTotalPages(0)
    getAllUsers()
  },
)

onMounted(() => {
  getAllUsers()
})
</script>

<style scoped></style>
