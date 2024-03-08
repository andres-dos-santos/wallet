import { Ionicons } from '@expo/vector-icons'
import { red, white } from 'tailwindcss/colors'
import { FlatList, Pressable, TouchableOpacity, View } from 'react-native'
import { Link } from 'expo-router'

import { Button } from '@components/button'
import { Flex } from '@components/flex'
import { P } from '@components/p'

const KEYBOARD_DATA = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '.',
  '0',
  'icon',
]

export default function Transaction() {
  return (
    <View className="flex-1 pt-14 bg-[#25272d]">
      <Flex className="px-5">
        <View className="flex-1">
          <Link asChild href="/">
            <Button.Black>
              <Ionicons name="arrow-back" color={white} size={16} />
            </Button.Black>
          </Link>
        </View>

        <View className="flex-1 items-center justify-center">
          <P className="text-sm font-400">Send money</P>
        </View>

        <View className="flex-1" />
      </Flex>

      <View className="flex-1 bg-white mt-5 py-5 px-4 rounded-t-[32px] w-full">
        <Flex className="justify-between pr-2.5">
          <Flex>
            <Button.White className="bg-zinc-100"></Button.White>
            <P className="text-sm font-400 ml-2.5 text-zinc-900">
              Mercado aleale
            </P>
          </Flex>

          <Ionicons name="chevron-forward" size={16} />
        </Flex>

        <View className="items-center justify-center mt-10">
          <P className="text-[40px] font-urbanist-regular tracking-wider text-zinc-900">
            <P className="text-zinc-500">$</P>390.40
          </P>

          <P className="text-xs font-400 text-zinc-900 mt-2.5">
            Your balance{' '}
            <P className="font-urbanist-regular text-zinc-900">$25.900,90</P>{' '}
            (available)
          </P>
        </View>

        <FlatList
          className="mt-20"
          data={KEYBOARD_DATA}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Pressable className="flex-1 items-center justify-center h-20">
              <P className="text-2xl font-urbanist-regular text-zinc-900">
                {item}
              </P>
            </Pressable>
          )}
          ListFooterComponent={() => (
            <View className="px-7 flex-row items-center pt-5 gap-2 mb-10">
              <TouchableOpacity
                activeOpacity={0.8}
                className="items-center h-[60px] flex-1 bg-[#B1EE81] rounded-full flex-row justify-between pl-5 pr-2.5"
              >
                <P className="font-500 text-zinc-900 text-[13px]">Income</P>

                <View className="bg-white h-10 w-10 rounded-full items-center justify-center">
                  <Ionicons name="arrow-up" size={16} color="#B1EE81" />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                className="items-center h-[60px] flex-1 bg-red-500 rounded-full flex-row justify-between pl-5 pr-2.5"
              >
                <P className="font-500 text-white text-[13px]">Outcome</P>

                <View className="bg-white h-10 w-10 rounded-full items-center justify-center">
                  <Ionicons name="arrow-down" size={16} color={red[500]} />
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  )
}
