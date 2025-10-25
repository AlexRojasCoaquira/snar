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
