import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { type Login } from '@/types'
import { signInWithPassword, signOut, getUser } from '@/services/auth'
import type { User as UserSupabase } from '@supabase/supabase-js'

export const useAuth = defineStore('auth', () => {
  const user = ref<UserSupabase | null>(null)

  const accessToken = ref<string | null>(null)
  const loading = ref(false)
  const errors = ref('')

  const signIn = async (authData: Login) => {
    try {
      const { email, password } = authData
      if (email === '' || password === '') {
        errors.value = 'Email y contraseña son obligatorios'
        return
      }
      loading.value = true
      const { data, session } = await signInWithPassword(authData)
      accessToken.value = session
      user.value = data
      return data
    } catch (error) {
      console.log('err', error)
      errors.value = (error as Error).message || 'Error al iniciar sesión'
    } finally {
      loading.value = false
    }
  }

  const logOut = async () => {
    await signOut()
    user.value = null
  }
  const loadSession = async () => {
    const { user: data, error } = await getUser()
    user.value = data
    console.log('err1', error)
    if (error) return null
    return data
  }

  const isAuthenticated = computed(() => user.value !== null)

  return {
    loading,
    errors,
    user,
    accessToken,
    isAuthenticated,
    signIn,
    logOut,
    loadSession,
  }
})
