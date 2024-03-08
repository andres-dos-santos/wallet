import { StyleSheet, View } from 'react-native'

import { COLORS } from '@styles/colors'

const s = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    height: 60,
    width: 60,
    borderRadius: 9999,
  },
})

export function Avatar() {
  return <View style={s.container} />
}
