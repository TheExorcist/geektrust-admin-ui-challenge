import React, { useCallback, useContext, useEffect, useState } from "react"

import { UserContext, UserContextProps } from "../contexts/UserContext"
import { User, Users } from "../types/User"

import usePageParams from "./usePageParams"
import useSearch from "./useSearch"
import useUserQuery from "./useUserQuery"

const useStore = () => {
  const { users, setUsers } = useContext<UserContextProps>(UserContext)
  const [currentUsers, setCurrentUsers] = useState<Users>([])

  const [isLoading, isSuccess, isError, error] = useUserQuery(setUsers)

  const [filteredUser, setSearchTerm] = useSearch(users)
  const [page, setPage, pageSize, startIndex, endIndex, totalPages] = usePageParams(filteredUser.length)

  useEffect(() => {
    if (page && filteredUser && !isNaN(startIndex) && !isNaN(endIndex)) {
      const nextUsers = structuredClone(filteredUser)
      setCurrentUsers([...nextUsers.splice(startIndex, pageSize)])
    }
  }, [page, setPage, startIndex, endIndex, filteredUser])

  const deleteUsers = useCallback((userIds: number[]) => {
    const nextUsers = structuredClone(users)
    setUsers([...nextUsers.filter((user: User) => !userIds.includes(user.id))])
  }, [setUsers, users, structuredClone])

  return {
    page,
    setPage,
    pageSize,
    totalPages,
    currentUsers,
    setCurrentUsers,
    setSearchTerm,
    deleteUsers,
    isLoading,
    isSuccess,
    isError,
    error
   } as const
}

export default useStore
