import type { User, UserWithId } from '@/types'
import { supabase } from '@/lib/supabase'

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

export const getUser = async ({
  perPage,
  page,
  search,
}: {
  perPage: number
  page: number
  search: string
}) => {
  const query = supabase
    .from('users')
    .select('*', { count: 'exact' })
    .order('id', { ascending: false })
    .range((page - 1) * perPage, page * perPage - 1)

  if (search && search.trim() !== '') {
    query.or(`email.ilike.%${search}%,firstname.ilike.%${search}%,lastname.ilike.%${search}%`)
  }

  const { data, error, count } = await query

  if (error) throw error
  return { data, totalItems: count, totalPages: count ? Math.ceil(count / perPage) : 0 }
}
// .or(`email.ilike.%${'cirilo'}%,firstname.ilike.%${'cirilo'}%,lastname.ilike.%${'cirilo'}%`)

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

export const createUser = async (user: User) => {
  const { data, error } = await supabase.from('users').insert([user]).select()
  if (error) {
    console.error('Error al crear usuario:', error.message)
    throw error
  }
  return data
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

export const updateUser = async (user: UserWithId) => {
  const { data, error } = await supabase.from('users').update(user).eq('id', user.id).select()
  console.log('data update', data)
  return data
}
