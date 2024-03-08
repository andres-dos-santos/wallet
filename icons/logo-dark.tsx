import { Rect, Svg } from 'react-native-svg'

export function LogoDark() {
  return (
    <Svg width="1024" height="1024" viewBox="0 0 1024 1024" fill="none">
      <Rect x="205" y="205" width="614" height="614" rx="100" fill="#B1EE81" />
      <Rect x="210" y="395" width="604" height="419" rx="95" fill="#FEFEFE" />
      <Rect
        x="210"
        y="395"
        width="604"
        height="419"
        rx="95"
        stroke="#FEFEFE"
        stroke-width="10"
      />
      <Rect x="589" y="724" width="151" height="32" rx="16" fill="#1C1C1C" />
      <Rect x="535" y="724" width="32" height="32" rx="16" fill="#1C1C1C" />
    </Svg>
  )
}
