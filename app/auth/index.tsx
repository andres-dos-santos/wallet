import {
  Keyboard,
  Pressable,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { zinc } from 'tailwindcss/colors'
import { useRouter } from 'expo-router'

import { Container } from '@components/container'
import { P } from '@components/p'

export default function AuthPage() {
  const { push } = useRouter()

  function handleLogin() {
    push('/dashboard/')
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => (Keyboard.isVisible ? Keyboard.dismiss() : null)}
    >
      <Container className="px-10 justify-center">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: '50%', paddingBottom: 80 }}
        >
          <P className="font-urbanist-regular text-[#b1ee81] text-4xl">
            log in <P className="text-white">to {'\n'}your</P> account
          </P>

          <P className="font-400 text-zinc-400 text-xs mt-5">
            {`Welcome back, you've been missed.`}
          </P>

          <View className="mt-10">
            <TextInput
              className="border bg-zinc-900 h-14 rounded-[20px] border-zinc-700 px-5 font-500 text-[15px] text-white mb-2.5"
              placeholderTextColor={zinc[700]}
              placeholder="Email"
              cursorColor="#b1ee81"
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <TextInput
              className="border bg-zinc-900 h-14 rounded-[20px] border-zinc-700 px-5 font-500 text-[15px] text-white"
              placeholderTextColor={zinc[700]}
              placeholder="Password"
              cursorColor="#b1ee81"
              secureTextEntry
            />

            <Pressable
              onPress={handleLogin}
              className="bg-[#b1ee81] h-14 rounded-[20px] items-center justify-center mt-5"
            >
              <P className="font-500 text-[15px] text-zinc-800">{`Let's go`}</P>
            </Pressable>

            <Pressable className="mt-5">
              <P className="font-400 text-[13px] text-white">{`Don't you have an account?`}</P>
            </Pressable>
          </View>
        </ScrollView>
      </Container>
    </TouchableWithoutFeedback>
  )
}
