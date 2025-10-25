import { supabase } from '@/lib/supabase'
import { type Login } from '@/types'

export const signInWithPassword = async (authData: Login) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword(authData)
    if (error) throw new Error(error.message)
    return {
      session: data.session.access_token,
      data: data.user,
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', (error as Error).message)
    throw new Error((error as Error).message)
  }
}

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw new Error(error.message)
    return true
  } catch (error) {
    console.error('Error al cerrar sesión:', (error as Error).message)
    throw new Error((error as Error).message)
  }
}

export const signUpUser = async (authData: Login) => {
  try {
    const { data, error } = await supabase.auth.signUp(authData)
    console.log('data', data)
    console.log('error', error)
    if (error) throw new Error(error.message)
    if (!data.user) throw new Error('No se pudo crear el usuario')
    return {
      data: data.user,
    }
  } catch (error) {
    console.error('Error al registrarse:', (error as Error).message)
    throw new Error((error as Error).message)
  }
}

export const getSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession()
    if (error) throw new Error(error.message)
    return data
  } catch (error) {
    console.error('Error al cerrar sesión:', (error as Error).message)
    throw new Error((error as Error).message)
  }
}
export const recoveryPassword = async ({
  password,
  email,
}: {
  password: string
  email: string
}) => {
  try {
    const { data, error } = await updateUserPassword({ password, email })
    if (error) throw new Error(error.message)
    return data
  } catch (error) {
    console.error('Error al recuperar password:', (error as Error).message)
    throw new Error((error as Error).message)
  }
}
export const updateUserPassword = async ({
  password,
  email,
}: {
  password: string
  email: string
}) => {
  const { data, error } = await supabase.auth.updateUser({ password, email })
  console.log('data', data)
  return {
    data,
    error,
  }
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
