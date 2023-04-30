import React, { useState } from "react"

const FIRST_PAGE_COUNT = 1
const PAGE_SIZE = 10

const DEFAULT_DECREMENT = 1

const usePageParams = (userCount: number) => {
  const [page, setPage] = useState(FIRST_PAGE_COUNT)

  const startIndex: number = (page - DEFAULT_DECREMENT) * PAGE_SIZE
  const endIndex: number = startIndex + PAGE_SIZE
  const totalPages = Math.ceil(userCount / PAGE_SIZE)

  return [
    page,
    setPage,
    PAGE_SIZE,
    startIndex,
    endIndex,
    totalPages
  ] as const
}

export default usePageParams
