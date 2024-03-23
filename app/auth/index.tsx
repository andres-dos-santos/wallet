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
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState } from 'react'
import { z } from 'zod'

import { Container } from '@components/container'
import { P } from '@components/p'

import { supabase } from '@data/supabase'

async function signUp(email: string, password: string) {
  await supabase.auth.signUp({ email, password }).then(async (response) => {
    if (response.error) {
      // mostrar algo para tratar isso
    }

    const { user, session } = response.data

    await AsyncStorage.setItem(
      '@wallet:user-info',
      JSON.stringify({
        email,
        password,
        id: user.id,
        auth: session.provider_token,
      }),
    )
  })
}

export default function AuthPage() {
  const { push } = useRouter()

  const [email, setEmail] = useState('andres.dosantosbrito@gmail.com')
  const [password, setPassword] = useState('123456')

  async function handleSignUp() {
    const FAKE_CONDITION = true

    if (FAKE_CONDITION) {
      push('/dashboard')
    } else {
      const schema = z.object({
        email: z
          .string({ required_error: 'is required' })
          .email({ message: 'must be an email' }),
        password: z.string({ required_error: 'is required' }),
      })

      const parse = schema.safeParse({ email, password })

      if (parse.success) {
        await signUp(email, password)
      } else {
        console.log('error!')
      }
    }
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

          <P className="font-inter-400 text-zinc-400 text-xs mt-5">
            {`Welcome back, you've been missed.`}
          </P>

          <View className="mt-10">
            <TextInput
              className="border bg-zinc-900 h-14 rounded-[20px] border-zinc-700 px-5 font-inter-500 text-[15px] text-white mb-2.5"
              onChangeText={setEmail}
              value={email}
              placeholderTextColor={zinc[700]}
              placeholder="Email"
              cursorColor="#b1ee81"
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <TextInput
              className="border bg-zinc-900 h-14 rounded-[20px] border-zinc-700 px-5 font-inter-500 text-[15px] text-white"
              placeholderTextColor={zinc[700]}
              onChangeText={setPassword}
              value={password}
              placeholder="Password"
              cursorColor="#b1ee81"
              secureTextEntry
            />

            <Pressable
              onPress={handleSignUp}
              className="bg-[#b1ee81] h-14 rounded-[20px] items-center justify-center mt-5"
            >
              <P className="font-inter-500 text-[15px] text-zinc-800">{`Let's go`}</P>
            </Pressable>

            <Pressable className="mt-5">
              <P className="font-inter-400 text-[13px] text-white">{`Don't you have an account?`}</P>
            </Pressable>
          </View>
        </ScrollView>
      </Container>
    </TouchableWithoutFeedback>
  )
}
