import { supabase } from '@/lib/supabase'

export const getAllProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('id', { ascending: true })
  if (error) throw error
  return data
}
