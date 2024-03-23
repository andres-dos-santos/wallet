import { createContext } from 'react'

interface MonthContextData {
  month: string
  setMonth(month: string): void
}

export const MonthContext = createContext({} as MonthContextData)
