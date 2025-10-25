// import data from '../mock/data.json'
import { reactive, ref } from 'vue'
import type { UserWithId } from '../types'
import { getUser, createUser, removeUser, updateUser } from '@/services/users'
import { useRealtime } from './useRealtime'
import { useFilters } from '@/store/filters'
import { usePaginate } from '@/store/paginate'

export const useUsers = () => {
  const { filters } = useFilters()
  const { paginate, setTotalPages, setPage } = usePaginate()

  const users = reactive<UserWithId[]>([])
  const { subscribe, unsubscribe } = useRealtime<UserWithId>('users', users)
  const loading = ref(false)
  const load = ref(false)
  const errors = ref('')

  const getAllUsers = async () => {
    try {
      load.value = true
      const { totalPages, data } = await getUser({
        page: paginate.page,
        perPage: paginate.perPage,
        search: filters.search,
      })
      users.splice(0, users.length, ...data)
      setTotalPages(totalPages)
      // users.push(...res)
    } catch (error) {
      console.log(error)
    } finally {
      load.value = false
    }
  }

  const addUser = async (user: UserWithId, isLogin = false) => {
    try {
      if (!user) return
      loading.value = true

      await createUser(user)
      if (isLogin) return
      setPage(1)
      await getAllUsers()
      // users.push(res[0])
    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false
    }
  }

  const deleteUser = async (id: string) => {
    try {
      if (!id) return false
      loading.value = true
      const res = await removeUser(id)
      if (res) {
        const userIndex = users.findIndex((u) => u.id === id)
        if (userIndex !== -1) users.splice(userIndex, 1)
        // await getAllUsers(paginate.page)
        return true
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
      if (!res || res.length === 0) return
      const userIndex = users.findIndex((u) => u.id === user.id)
      if (userIndex !== -1) users[userIndex] = { ...users[userIndex], ...res[0] }
      return true
    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false
    }
  }

  // onMounted(async () => {
  //   subscribe()
  // })

  // onUnmounted(() => {
  //   unsubscribe()
  // })

  return {
    users,
    addUser,
    deleteUser,
    editUser,
    loading,
    load,
    errors,
    paginate,
    getAllUsers,
    subscribe,
    unsubscribe,
  }
}
