import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Ionicons } from '@expo/vector-icons'

import { COLORS } from '@styles/colors'

import { Icons } from '@icons/@index'

import { Container } from '@components/container'
import { Flex } from '@components/flex'
import { Avatar } from '@components/avatar'
import { Button } from '@components/button'
import { P } from '@components/p'
import { Picker } from '@components/picker'
import { green, red } from 'tailwindcss/colors'
import { Link } from 'expo-router'

export default function App() {
  return (
    <SafeAreaView style={s.container}>
      <StatusBar style="light" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Container>
          <Flex className="justify-between">
            <Avatar />

            <Flex style={{ gap: 5 }}>
              <Link asChild href="/transaction/income">
                <Button.Black>
                  <Icons.Plus />
                </Button.Black>
              </Link>

              <Button.Black>
                <Icons.Settings />
              </Button.Black>

              <Button.White>
                <Icons.Bell />
              </Button.White>
            </Flex>
          </Flex>

          <Flex className="mt-[40px] mb-[20px] justify-between">
            <P className="font-400 text-sm">Our balance</P>

            <Picker />
          </Flex>

          <P className="text-[52px] font-urbanist-light tracking-wider">
            $390.40
          </P>

          <View className="mt-10">
            <Flex className="justify-between">
              <P className="font-300 text-[13px] leading-6">
                Monthly Total {'\n'}Income
              </P>
              <View className="flex-row items-center justify-center gap-2.5">
                <P className="font-urbanist-light text-3xl">$2.890</P>
                <Ionicons name="chevron-up" size={16} color={green[500]} />
              </View>
            </Flex>

            <View className="h-[1px] w-full bg-zinc-700 my-5" />

            <Flex className="justify-between">
              <P className="font-300 text-[13px] leading-6">
                Monthly {'\n'}Spanding
              </P>
              <View className="flex-row items-center justify-center gap-2.5">
                <P className="font-urbanist-light text-3xl">$1.350</P>
                <Ionicons name="chevron-down" size={16} color={red[500]} />
              </View>
            </Flex>
          </View>

          <View className="bg-[#34373E] items-center flex-1 mt-10 mb-2.5 rounded-[40px] p-7">
            <P className="font-400 text-[13px]">Tracking your finance goal</P>

            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal
              contentContainerStyle={{ maxHeight: 32 }}
              className="mt-5"
            >
              <Pressable className="h-8 rounded-xl bg-white px-5 mr-2 items-center justify-center">
                <P className="text-xs font-500 text-zinc-900">First home</P>
              </Pressable>

              <Pressable className="h-8 rounded-xl bg-[#414652] px-5 mr-2 items-center justify-center">
                <P className="text-xs font-500">New car</P>
              </Pressable>

              <Pressable className="h-8 rounded-xl bg-[#414652] px-5 mr-2 items-center justify-center">
                <P className="text-xs font-500">Vacation</P>
              </Pressable>
            </ScrollView>

            <P className="text-[28px] font-urbanist-regular tracking-wider mt-5">
              $3.190
            </P>

            <View className="bg-[#434D46] h-8 px-3 items-center justify-center rounded-full mt-2.5 mb-2.5">
              <P className="text-xs font-500 text-[#B1EE81]">On track</P>
            </View>

            <Flex className="my-5 justify-between">
              <P className="font-400 flex-1">
                Routine saving <P className="font-urbanist-regular">$700</P>{' '}
              </P>
              <P className="font-400">
                Target <P className="font-urbanist-regular">$2.400</P>
              </P>
            </Flex>

            <Pressable className="items-center justify-center h-14 w-full bg-[#B1EE81] rounded-[25px]">
              <P className="font-500 text-zinc-900">Top up</P>
            </Pressable>
          </View>

          <View className="bg-[#34373E] items-center flex-1 mb-5 rounded-[40px] h-20 flex-row px-2.5">
            <Flex>
              <Button.White>
                <Icons.Home />
              </Button.White>
              <P className="ml-2.5 font-400 text-[15px]">Dashboard</P>
            </Flex>

            <Flex className="flex-1 justify-end">
              <Button.Black className="bg-[#3c3f46]">
                <Icons.Wallet />
              </Button.Black>
            </Flex>
          </View>
        </Container>
      </ScrollView>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.zinc[900],
  },
})
