import { View, ViewProps } from 'react-native'
import clsx from 'clsx'

export function Flex({ className, ...props }: ViewProps) {
  return (
    <View className={clsx('flex-row items-center', className)} {...props}>
      {props.children}
    </View>
  )
}
