import { View, ViewProps } from 'react-native'
import clsx from 'clsx'

export function Container(props: ViewProps) {
  return (
    <View
      className={clsx('flex-1 bg-[#25272d] px-5 pt-[45px]', props.className)}
      {...props}
    >
      {props.children}
    </View>
  )
}
