import { create } from 'zustand'

export interface Destination {
  name: string
}

interface Hook {
  value: Destination | null
  set: (destination: Destination | null) => void
}

export const useDestination = create<Hook>((hookSet) => ({
  value: { name: 'ME' },
  set(value) {
    return hookSet({
      value,
    })
  },
}))
