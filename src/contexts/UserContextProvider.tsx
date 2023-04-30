import React, { useMemo, useState } from "react"
import { Users } from "../types/User"

import { UserContext, UserContextProps } from "./UserContext"

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<Users>([])
  
  const intialContextValue: UserContextProps = useMemo(() => { 
    return {
      users, 
      setUsers }
    }, 
    [users, setUsers]
  )

  return <UserContext.Provider value={intialContextValue}>
    {children}
  </UserContext.Provider>
}

export default UserContextProvider
