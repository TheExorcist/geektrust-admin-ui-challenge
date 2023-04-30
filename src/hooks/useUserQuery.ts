import React, { useEffect } from "react"

import { useQuery } from "react-query"
import { Users } from "../types/User"

import { USER_DATA_ENDPOINT } from "../constants"

interface UseUserQueryProps {
  setUsers: (users: Users) => void
}

const fetchUsers = async () => {
  try {
    const response = await fetch(USER_DATA_ENDPOINT)
    if (!response.ok) {
      throw new Error('Error occured')
    }
    return await response.json()
  } catch (exception: any) {
    console.log(exception.message)
    throw new Error(exception.message)
  }
}

const useUserQuery = (setUsers: (users: Users) => void) => {
  const { data, isLoading, isSuccess, isError, error } = useQuery(['users'], fetchUsers)

  useEffect(() => {
    if (isSuccess && !isLoading && data) {
      setUsers(data)
    }
  }, [data, isSuccess, isLoading])

  return [
    isLoading,
    isSuccess,
    isError,
    error
  ] as const
}

export default useUserQuery
