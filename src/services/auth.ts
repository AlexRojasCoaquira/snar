import { supabase } from '@/lib/supabase'
import { type Login } from '@/types'

export const signInWithPassword = async (authData: Login) => {
  const { data, error } = await supabase.auth.signInWithPassword(authData)
  console.log('error', error)
  if (error) throw error
  return {
    session: data.session.access_token,
    data: data.user,
  }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  console.log('err', error)
  return true
}

export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession()
  console.log('data', data)
  return data
}

export const getUser = async () => {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    console.log('data', error)
    if (error) throw error
    return {
      user,
      error,
    }
  } catch (error) {
    const msgError = (error as Error).message || ''
    console.error('Error en getUser:', msgError)
    return { user: null, error: error }
  }
}
