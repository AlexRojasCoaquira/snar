import { supabase } from '@/lib/supabase'
import { type Login } from '@/types'

export const signInWithPassword = async (authData: Login) => {
  const { data, error } = await supabase.auth.signInWithPassword(authData)
  console.log('error', error)
  if (error) throw error
  const userData = {
    id: data.user.id ?? '',
    email: data.user.email ?? '',
    role: data.user.role ?? 'authenticated',
  }
  return {
    session: data.session.access_token,
    userData,
  }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
  return true
}
