import React, { useEffect, useMemo, useState } from "react"
import { useQueryClient } from "react-query"
import { User, Users } from "../types/User"

const useSearch = (users: Users) => {
  const queryClient = useQueryClient()
  const [searchTerm, setSearchTerm] = useState(null)

  const filteredUser = useMemo(() => {
    if (!searchTerm) return users

    return users.filter((user: User) => { 
      return user.email.includes(searchTerm) || user.name.includes(searchTerm)
        || user.role.includes(searchTerm)
    })
  }, [searchTerm, users])
  

  return [
    filteredUser,
    setSearchTerm
  ] as const
}

export default useSearch
