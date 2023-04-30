import React, { createContext } from "react"

import { User, Users } from "../types/User"

export interface UserContextProps {
  users: Users
  setUsers: (users: Users) => void
}

const initialState: UserContextProps = {
  users: [],
  setUsers: (users: Users) => {} 
} 

export const UserContext = createContext<UserContextProps>(initialState)
