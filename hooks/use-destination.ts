import { create } from 'zustand'

export interface Destination {
  name: string
  abbreviation: string
  tag: string
}

interface Hook {
  value: Destination | null
  set: (destination: Destination | null) => void
}

export const useDestination = create<Hook>((hookSet) => ({
  value: null,
  set(value) {
    return hookSet({
      value,
    })
  },
}))
