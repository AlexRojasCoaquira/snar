// import data from '../mock/data.json'
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import type { UserWithId, User } from '../types'
import { getUser, createUser, removeUser, updateUser } from '@/services/users'
import { usePaginate } from './usePaginate'
import { useRealtime } from './useRealtime'

export const useUsers = () => {
  const { paginate, setTotalPages, setPage } = usePaginate()
  const users = reactive<UserWithId[]>([])
  const { subscribe, unsubscribe } = useRealtime<UserWithId>('users', users)
  const loading = ref(false)
  const load = ref(false)
  const errors = ref('')

  const getAllUsers = async (page?: number) => {
    try {
      load.value = true
      const newPage = page || paginate.page
      const res = await getUser({ page: newPage, perPage: paginate.perPage })
      users.splice(0, users.length, ...res.data)
      setTotalPages(res.totalPages)
      // users.push(...res)
    } catch (error) {
      console.log(error)
    } finally {
      load.value = false
    }
  }

  const addUser = async (user: User) => {
    try {
      if (!user) return
      loading.value = true
      const { name, lastname, phone, email } = user
      // const newUser: UserWithId = { ...user, id: generateId() }
      const res = await createUser({
        name,
        lastname,
        phone,
        email,
      })
      users.push(res[0])
    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false
    }
  }

  const deleteUser = async (id: number) => {
    try {
      if (!id) return false
      loading.value = true
      const res = await removeUser(id)
      console.log('respues', res)
      if (res) {
        const userIndex = users.findIndex((u) => u.id === id)
        if (userIndex !== -1) users.splice(userIndex, 1)
      }
    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false
    }
  }

  const editUser = async (user: UserWithId) => {
    try {
      if (!user) return
      loading.value = true
      const res = await updateUser(user)
      console.log('res upodatre', res[0])
      const userIndex = users.findIndex((u) => u.id === user.id)
      if (userIndex !== -1) users[userIndex] = { ...users[userIndex], ...res[0] }
    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false
    }
  }

  onMounted(async () => {
    await getAllUsers()
    subscribe()
  })

  onUnmounted(() => {
    unsubscribe()
  })

  return {
    users,
    addUser,
    deleteUser,
    editUser,
    loading,
    load,
    errors,
    paginate,
    setPage,
    getAllUsers,
  }
}
