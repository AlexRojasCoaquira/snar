import { supabase } from '@/lib/supabase'

export const getAllOrders = async (to: number, from: number, search: string) => {
  const query = supabase
    .from('orders')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(to, from)
  if (search && search.trim() !== '') {
    console.log('search', search)
    query.or(`status.ilike.%${search}%`)
  }
  const { data, count, error } = await query

  if (error) throw new Error(error.message)
  return { data, count }
}
