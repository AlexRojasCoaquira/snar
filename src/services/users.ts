import type { UserWithId } from '@/types'
import { supabase } from '@/lib/supabase'

export const getUser = async ({
  perPage,
  page,
  search,
}: {
  perPage: number
  page: number
  search: string
}): Promise<{
  data: UserWithId[]
  totalItems: number | null
  totalPages: number
}> => {
  try {
    const query = supabase
      .from('users_all')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range((page - 1) * perPage, page * perPage - 1)

    if (search && search.trim() !== '') {
      query.or(`email.ilike.%${search}%,firstname.ilike.%${search}%,lastname.ilike.%${search}%`)
    }

    const { data, error, count } = await query
    console.log('data', data)
    if (error) throw error
    return { data, totalItems: count, totalPages: count ? Math.ceil(count / perPage) : 0 }
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export const createUser = async (user: UserWithId) => {
  const { data, error } = await supabase.from('users').insert([user]).select()
  if (error) throw error
  return data
}

export const signInWithEmail = async ({ email }: { email: string }) => {
  try {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      email_confirm: false,
    })
    if (error) throw error
    return data
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export const removeUser = async (id: string): Promise<boolean> => {
  const { error } = await supabase.from('users').delete().eq('id', id)
  if (error) {
    console.error('Error al eliminar usuario:', error.message)
    return false
  }

  return true
}

export const updateUser = async (user: UserWithId) => {
  const { data, error } = await supabase.from('users').update(user).eq('id', user.id).select()
  if (error) throw error
  return data
}

// const headers = {
//   apikey: API.SUPABASE_KEY,
//   Authorization: `Bearer ${API.SUPABASE_KEY}`,
//   'Content-Type': 'application/json',
//   Prefer: 'return=representation',
// }

// export const getUser = () => {
//   const url = `${API.SUPABASE}/rest/v1/users`
//   return fetch(url, {
//     method: 'GET',
//     headers,
//   }).then((res) => res.json())
// }

// export const updateUser = (user: UserWithId) => {
//   const url = `${API.SUPABASE}/rest/v1/users?id=eq.${user.id}`
//   const { firstname, lastname, phone, email } = user
//   return fetch(url, {
//     method: 'PATCH',
//     headers,
//     body: JSON.stringify({
//       firstname,
//       lastname,
//       phone,
//       email,
//     }),
//   }).then(async (res) => {
//     if (!res.ok) {
//       const error = await res.text()
//       throw new Error(error)
//     }
//     return res.json()
//   })
// }

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

// export const createUser = async (user: User) => {
//   const url = `${API.SUPABASE}/rest/v1/users`
//   return fetch(url, {
//     method: 'POST',
//     headers,
//     body: JSON.stringify(user),
//   }).then(async (res) => {
//     if (!res.ok) {
//       const error = await res.text()
//       throw new Error(error)
//     }
//     console.log('ressss', res)
//     return res.json()
//   })
// }
