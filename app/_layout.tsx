import { Slot } from 'expo-router'
import { useFonts } from 'expo-font'

export default function Layout() {
  const [fontsLoaded] = useFonts({
    light: require('../assets/fonts/inter/inter-light.ttf'),
    regular: require('../assets/fonts/inter/inter-regular.ttf'),
    medium: require('../assets/fonts/inter/inter-medium.ttf'),
    bold: require('../assets/fonts/inter/inter-bold.ttf'),
    'mono-regular': require('../assets/fonts/space-mono/space-mono-regular.ttf'),
    'urbanist-light': require('../assets/fonts/urbanist/urbanist-light.ttf'),
    'urbanist-regular': require('../assets/fonts/urbanist/urbanist-regular.ttf'),
  })

  if (!fontsLoaded) {
    return null
  }

  return <Slot />
}
