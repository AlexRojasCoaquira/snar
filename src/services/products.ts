import { supabase } from '@/lib/supabase'
import type { Product, ProductWithId } from '@/types'

export const getAllProducts = async (): Promise<ProductWithId[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('id', { ascending: false })
  if (error) throw error
  return data
}

export const addProduct = async (product: Product) => {
  try {
    const { data, error } = await supabase.from('products').insert([product]).select()
    if (error) throw new Error(error.message)
    return data
  } catch (error) {
    console.error('❌ Error al agregar producto:', (error as Error).message)
    throw new Error('No se pudo agregar el producto. Intenta nuevamente.')
  }
}

export const uploadImage = async (file: File) => {
  try {
    const fileName = `products/${Date.now()}_${file.name}`
    const { error } = await supabase.storage.from('snar-images').upload(fileName, file)
    if (error) throw error
    const { data: publicUrlData } = supabase.storage.from('snar-images').getPublicUrl(fileName)

    return publicUrlData.publicUrl
  } catch (error) {
    console.error('Error al subir la imagen:', error)
    throw new Error('Error al subir la imagen:' + (error as Error).message)
  }
}

// export const editProduct = async (product: {}) => {
//   const { id, ...updates } = product as any
//   const { data, error } = await supabase.from('products').update(updates).eq('id', id)
//   if (error) throw error
//   return data
// }

export const deleteProduct = async (id: number) => {
  try {
    const { data, error } = await supabase.from('products').delete().eq('id', id)
    if (error) throw error
    return data
  } catch (error) {
    throw new Error('Error al eliminar producto' + (error as Error).message)
  }
}

export const removeImage = async (image: string) => {
  try {
    const { error } = await supabase.storage.from('snar-images').remove([`products/${image}`])
    if (error) throw new Error(error.message)
  } catch (err) {
    throw new Error('Error al eliminar la imagen:' + (err as Error).message)
  }
}
