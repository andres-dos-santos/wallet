import { Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { white } from 'tailwindcss/colors'

import { P } from './p'

export function Picker() {
  return (
    <Pressable className="h-8 px-3 rounded-full flex-row items-center bg-[#2e3035]">
      <P className="font-500 text-xs mr-1.5">January</P>
      <Ionicons name="chevron-down" color={white} />
    </Pressable>
  )
}
