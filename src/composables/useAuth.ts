interface Login {
  email: string
  password: string
}

import { supabase } from '@/lib/supabase'
import { signUpUser } from '@/services/auth'
import { ref } from 'vue'

export const useAuth = () => {
  const loading = ref(false)
  const errors = ref('')

  const signUp = async (authData: Login) => {
    try {
      const { data } = await signUpUser(authData)
      return data
    } catch (error) {
      console.log('error', error)
    }
  }

  // const signIn = async (authData: Login) => {
  //   try {
  //     const { email, password } = authData
  //     if (email === '' || password === '') {
  //       errors.value = 'Email y contraseña son obligatorios'
  //       throw new Error('Email y contraseña son obligatorios.')
  //     }
  //     loading.value = true
  //     const res = await signInWithPassword(authData)
  //     console.log(res)
  //     return res
  //   } catch (error) {
  //     console.log('error', error)
  //     errors.value = (error as Error).message || 'Error al iniciar sesión'
  //   } finally {
  //     loading.value = false
  //   }
  // }

  const resetPassword = async (email: string) => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email)
      console.log('data', data)
      if (error) throw error
      return data
    } catch (error) {
      errors.value = (error as Error).message || 'Error al reiniciar contraseña'
    }
  }

  const updateUserPassword = async ({ password, email }: { password: string; email: string }) => {
    const { data, error } = await supabase.auth.updateUser({ password, email })
    console.log('data', data)
    return data
  }

  return {
    loading,
    errors,
    signUp,
    resetPassword,
    updateUserPassword,
  }
}
