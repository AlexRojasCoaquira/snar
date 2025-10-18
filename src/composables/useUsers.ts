// import data from '../mock/data.json'
import { onMounted, reactive, ref } from 'vue'
import type { UserWithId, User } from '../types'
import { getUser, createUser, removeUser, updateUser } from '@/services/users'

export const useUsers = () => {
  const users = reactive<UserWithId[]>([])
  const loading = ref(false)
  const load = ref(false)
  const errors = ref('')

  // const generateId = () => Date.now() + Math.floor(Math.random() * 1000)

  const getAllUsers = async () => {
    try {
      load.value = true
      const res = await getUser()
      users.splice(0, users.length, ...res)
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

  onMounted(() => {
    getAllUsers()
  })

  return {
    users,
    addUser,
    deleteUser,
    editUser,
    loading,
    load,
    errors,
  }
}
