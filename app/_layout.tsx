import { Stack } from 'expo-router'
import { useFonts } from 'expo-font'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function Layout() {
  const [fontsLoaded] = useFonts({
    // inter
    'inter-light': require('../assets/fonts/inter/inter-light.ttf'),
    'inter-regular': require('../assets/fonts/inter/inter-regular.ttf'),
    'inter-medium': require('../assets/fonts/inter/inter-medium.ttf'),
    'inter-bold': require('../assets/fonts/inter/inter-bold.ttf'),
    // urbanist
    'urbanist-light': require('../assets/fonts/urbanist/urbanist-light.ttf'),
    'urbanist-regular': require('../assets/fonts/urbanist/urbanist-regular.ttf'),
    'urbanist-medium': require('../assets/fonts/urbanist/urbanist-medium.ttf'),
    'urbanist-semibold': require('../assets/fonts/urbanist/urbanist-semibold.ttf'),
    'urbanist-bold': require('../assets/fonts/urbanist/urbanist-bold.ttf'),
    'urbanist-extrabold': require('../assets/fonts/urbanist/urbanist-extrabold.ttf'),
    'urbanist-black': require('../assets/fonts/urbanist/urbanist-black.ttf'),
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={new QueryClient()}>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'ios',
            animationDuration: 100,
          }}
        />
      </QueryClientProvider>
    </GestureHandlerRootView>
  )
}
