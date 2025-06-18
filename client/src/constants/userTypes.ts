
export type RolesType = 'requestor' | 'provider' | 'manager' | 'admin'

export type ProfileType = {
  firstName: string
  lastName: string
  department: string
  designation: string
}

export type UserType = {
  _id: string
  email: string
  password: string
  accessToken: string
  roles: RolesType[]
  profile: ProfileType
  createdAt: string
  updatedAt: string
}


export type LoginFormValues = {
  email: string
  password: string
}

export type SignupFormValues = {
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  department: string
  designation: string
}
