export interface User {
  name: string
  lastname: string
  email: string
  phone: string
}

export interface UserWithId extends User {
  id: number
}

export interface Login {
  email: string
  password: string
}
