import React, { useContext, useReducer, useCallback } from "react";
import ReactDOM from "react-dom";

import { QueryClient, QueryClientProvider } from "react-query";

import "./index.css";

import UserContextProvider from "./contexts/UserContextProvider";
import DisplayUserContextProvider, { DisplayUserContext } from "./contexts/DisplayUserContextProvider";

import UserTable from "./components/UserTable";
import { ReducerActions } from "./constants";

interface TableActionStateProps {
  isDeleting: null | { id: number } 
  isDeletingBulk: boolean
}

interface TableActionProps {
  type: string
  payload: null | { id: number }
}

const initialReduxState = {
  isDeleting: null,
  isDeletingBulk: false
}

const reducer = (prevState: TableActionStateProps, action: TableActionProps) => {
  if (action.type === ReducerActions.BulkDeleteCompleted) {
    return {
      ...prevState,
      isDeletingBulk: false
    }
  }

  if (action.type === ReducerActions.BulkDeleteInitiated) {
    return {
      ...prevState,
      isDeletingBulk: true
    }
  }

  if (action.type === ReducerActions.SingleDeletedInitiated) {
    return {
      ...prevState,
      isDeleting: action.payload
    }
  }

  if (action.type === ReducerActions.SingleDeletedCompleted) {
    return {
      ...prevState,
      isDeleting: null
    }
  }

  return prevState
}

type ReducerType = (prevState: TableActionStateProps, action: TableActionProps) => TableActionStateProps

const App = () => {
  const displayUsers = useContext(DisplayUserContext)

  const [tableActionState, dispatch] = useReducer<ReducerType>(reducer, initialReduxState)

  const handleBulkDelete = useCallback((userIds: number[]) => {
    dispatch({ type: ReducerActions.BulkDeleteInitiated, payload: null })
    displayUsers.deleteUsers(userIds)
    // FixLater:
    dispatch({ type: ReducerActions.BulkDeleteCompleted, payload: null })
  }, [displayUsers.deleteUsers])

  const handleRecordDelete = useCallback((userId: number) => {
    dispatch({ type: ReducerActions.SingleDeletedInitiated, payload: { id: userId } })
    displayUsers.deleteUsers([userId])
    dispatch({ type: ReducerActions.SingleDeletedCompleted, payload: null })
  }, [displayUsers.deleteUsers])

  return <UserTable
    data={displayUsers.currentUsers}
    pageSize={displayUsers.pageSize}
    setSearchTerm={displayUsers.setSearchTerm}
    isDeletingBulk={tableActionState.isDeletingBulk}
    handleBulkDelete={handleBulkDelete}
    handleRecordDelete={handleRecordDelete}
    handlePageChange={displayUsers.setPage}
    totalPages={displayUsers.totalPages}
  />
}

const AppWithQueryClient = () => (
  <QueryClientProvider client={new QueryClient()}>
    <UserContextProvider>
      <DisplayUserContextProvider>
        <App />
      </DisplayUserContextProvider>
    </UserContextProvider>
  </QueryClientProvider>
)

ReactDOM.render(<AppWithQueryClient />, document.getElementById("app"));
