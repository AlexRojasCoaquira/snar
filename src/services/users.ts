import { API } from '@/config'
import type { User, UserWithId } from '@/types'
import { supabase } from '@/lib/supabase'

const headers = {
  apikey: API.SUPABASE_KEY,
  Authorization: `Bearer ${API.SUPABASE_KEY}`,
  'Content-Type': 'application/json',
  Prefer: 'return=representation',
}

// export const getUser = () => {
//   const url = `${API.SUPABASE}/rest/v1/users`
//   return fetch(url, {
//     method: 'GET',
//     headers,
//   }).then((res) => res.json())
// }

export const getUser = async (): Promise<UserWithId[]> => {
  const { data, error } = await supabase.from('users').select('*').range(0, 9)
  if (error) throw error
  return data || []
}

export const createUser = async (user: User) => {
  const url = `${API.SUPABASE}/rest/v1/users`
  return fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(user),
  }).then(async (res) => {
    if (!res.ok) {
      const error = await res.text()
      throw new Error(error)
    }
    console.log('ressss', res)
    return res.json()
  })
}

// export const removeUser = (id: number) => {
//   console.log('id', id)
//   const url = `${API.SUPABASE}/rest/v1/users?id=eq.${id}`
//   return fetch(url, { method: 'DELETE', headers }).then(async (res) => {
//     if (!res.ok) {
//       const error = await res.text()
//       throw new Error(error)
//     }
//     console.log('ressss', res)
//     return true
//   })
// }

export const removeUser = async (id: number): Promise<boolean> => {
  const { error } = await supabase.from('users').delete().eq('id', id)
  if (error) {
    console.error('Error al eliminar usuario:', error.message)
    return false
  }

  return true
}

export const updateUser = (user: UserWithId) => {
  const url = `${API.SUPABASE}/rest/v1/users?id=eq.${user.id}`
  const { name, lastname, phone, email } = user
  return fetch(url, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
      name,
      lastname,
      phone,
      email,
    }),
  }).then(async (res) => {
    if (!res.ok) {
      const error = await res.text()
      throw new Error(error)
    }
    return res.json()
  })
}
