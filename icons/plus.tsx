import { Path, Svg } from 'react-native-svg'

export function Plus() {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 5.25C12.4142 5.25 12.75 5.58579 12.75 6V18C12.75 18.4142 12.4142 18.75 12 18.75C11.5858 18.75 11.25 18.4142 11.25 18V6C11.25 5.58579 11.5858 5.25 12 5.25Z"
        fill="#ffffff"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.75 12C18.75 12.4142 18.4142 12.75 18 12.75L6 12.75C5.58579 12.75 5.25 12.4142 5.25 12C5.25 11.5858 5.58579 11.25 6 11.25L18 11.25C18.4142 11.25 18.75 11.5858 18.75 12Z"
        fill="#ffffff"
      />
    </Svg>
  )
}