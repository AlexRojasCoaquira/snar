interface Login {
  email: string
  password: string
}

import { supabase } from '@/lib/supabase'

export const useAuth = () => {
  const signUp = async (authData: Login) => {
    const { data, error } = await supabase.auth.signUp(authData)
    console.log('error', error)
    return data
  }

  const signInWithPassword = async (authData: Login) => {
    const { data, error } = await supabase.auth.signInWithPassword(authData)
    console.log('error', error)
    return data
  }

  const resetPassword = async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email)
    console.log('data', data)
    return data
  }

  return {
    signUp,
    signInWithPassword,
    resetPassword,
  }
}
