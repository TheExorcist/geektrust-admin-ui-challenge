import React, { createContext, useMemo } from "react"
import useStore from "../hooks/useStore"

const DisplayUserContext = createContext<any>(null)

const DisplayUserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const {
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
 } = useStore()

  const initialContextData = useMemo(() => {
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
    }
  }, [
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
  ])

  return <DisplayUserContext.Provider value={initialContextData}>
      {children}
    </DisplayUserContext.Provider>
}

export default DisplayUserContextProvider

export { DisplayUserContext }