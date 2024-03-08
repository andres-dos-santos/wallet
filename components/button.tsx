import clsx from 'clsx'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

function Black({ className, ...props }: TouchableOpacityProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      className={clsx(
        'items-center justify-center w-[60px] h-[60px] rounded-full bg-[#2e3035]',
        className,
      )}
      {...props}
    >
      {props.children}
    </TouchableOpacity>
  )
}

function White({ className, ...props }: TouchableOpacityProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      className={clsx(
        'items-center justify-center w-[60px] h-[60px] rounded-full bg-white',
        className,
      )}
      {...props}
    >
      {props.children}
    </TouchableOpacity>
  )
}

export const Button = {
  Black,
  White,
}
