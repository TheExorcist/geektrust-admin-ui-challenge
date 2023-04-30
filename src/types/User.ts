enum Role {
  Member = 'member',
  Admin = 'Admin'
}

interface User {
  id: number
  email: string
  name: string
  role: Role
}

type Users = User[]

export {
  Role,
  User,
  Users
}
