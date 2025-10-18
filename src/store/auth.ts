import { defineStore } from 'pinia'
import { ref } from 'vue'
import { type Login } from '@/types'
import { signInWithPassword, signOut } from '@/services/auth'
// import { useStorage } from '@/composables/useStorage'

interface UserSession {
  id: string
  email: string
  role: string
}

export const useAuth = defineStore('auth', () => {
  const user = ref<UserSession | null>(null)
  // const { data: user, clear: clearUser } = useStorage<UserSession | null>('user', null)

  const accessToken = ref<string | null>(null)
  const loading = ref(false)

  const signIn = async (authData: Login) => {
    try {
      loading.value = true
      const { userData, session } = await signInWithPassword(authData)
      accessToken.value = session
      user.value = userData
      return userData
    } catch (error) {
      console.log('err', error)
    } finally {
      loading.value = false
    }
  }

  const logOut = () => {
    accessToken.value = null
    // clearUser()
    signOut()
  }

  return {
    user,
    accessToken,
    loading,
    signIn,
    logOut,
  }
})
