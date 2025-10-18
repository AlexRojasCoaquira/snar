<template>
  <main class="mx-auto max-w-6xl p-4">
    <h1 class="text-center text-3xl text-white">Mis usuarios</h1>
    <div class="cursor-pointer text-white">
      <Button type="button" size="md" variant="primary" @click="openModal">Agregar usuario </Button>
    </div>
    <p class="text-white text-center" v-if="load">Cargando...</p>
    <p class="text-white text-center" v-if="!load && users.length === 0">
      No se encontraron usuario
    </p>
    <p class="text-white text-center" v-if="errors">Ocurrió un error al cargar los datos</p>
    <UserList
      v-if="!errors && !load && users.length > 0"
      :users="users"
      @edit="openModal"
      @delete="deleteUser"
    />
    <Modal
      :isEdit="isEdit"
      :user="user"
      :show="showModal"
      @submit="onSubmit"
      @close="resetUser"
      :loading="loading"
    />
  </main>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useUsers } from '@/composables/useUsers'
import Button from '@/components/base/Button.vue'
import type { User, UserWithId } from '@/types'
import Modal from '@/components/Modal.vue'
import UserList from '@/components/UserList.vue'

const { users, addUser, editUser, deleteUser, loading, load, errors } = useUsers()

const defaultUser = {
  name: '',
  lastname: '',
  email: '',
  phone: '',
}

const showModal = ref(false)
const user = reactive<User | UserWithId>({ ...defaultUser })
const isEdit = ref(false)

const onSubmit = async (userData: User | UserWithId) => {
  console.log('userData', userData)
  // Add validations
  if (isEdit.value && 'id' in userData) {
    editUser(userData)
  } else {
    await addUser(userData as User)
  }
  resetUser()
}

const resetUser = () => {
  // user = { ...defaultUser }
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
</script>

<style scoped></style>
