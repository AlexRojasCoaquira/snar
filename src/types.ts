export interface User {
  firstname: string
  lastname: string
  email?: string
  birthdate?: string | null
  phone: string | null
  role?: string | null
}

export interface UserWithId extends User {
  id: string
}

export interface Login {
  email: string
  password: string
}

export interface Register {
  email: string
  password: string
  firstname: string
  lastname: string
  phone: string
  // gender: string
}

export interface Product {
  name: string
  price: number
  description: string
  image: string
  stock: number
}

export interface ProductWithId extends Product {
  id: number
}

export interface ProductForm extends Product {
  fileImg: File | null
}

export interface Order {
  id: number
  user_id: string
  total: number
  status: string
  created_at: string
}
