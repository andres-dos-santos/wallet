import { Text, TextProps } from 'react-native'
import clsx from 'clsx'

export function P({ className, ...props }: TextProps) {
  return (
    <Text className={clsx('text-white', className)} {...props}>
      {props.children}
    </Text>
  )
}
