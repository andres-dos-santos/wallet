/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Ionicons } from '@expo/vector-icons'
import { white, zinc } from 'tailwindcss/colors'
import {
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { Link, useRouter } from 'expo-router'
import { useState } from 'react'

import { Button } from '@components/button'
import { Flex } from '@components/flex'
import { P } from '@components/p'
import { useDestination } from 'hooks/use-destination'
import { currency } from '@utils/currency'
import clsx from 'clsx'
import { supabase } from '@data/supabase'

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
  // const params = useLocalSearchParams()
  const destination = useDestination()
  const router = useRouter()

  const [value, setValue] = useState<string | null>(null)

  async function handleSubmitTransfer(type: 'income' | 'outcome') {
    const amount = Number(value)

    const transfer = {
      received_by:
        type === 'outcome' ? destination.value.name.slice(0, 2) : 'NU',
      provided_by: type === 'outcome' ? 'Nu account' : '',
      price: !isNaN(amount) && currency(amount),
      type,
      description: '',
    }

    try {
      // @ts-ignore
      transfer.price = Number(transfer.price) * 100

      await supabase.from('transactions').insert(transfer)

      router.back()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View className="flex-1 pt-14 bg-[#25272d]">
      <Flex className="px-5">
        <View className="flex-1">
          <Link asChild href="/dashboard/">
            <Button.Black>
              <Ionicons name="arrow-back" color={white} size={16} />
            </Button.Black>
          </Link>
        </View>

        <View className="flex-1 items-center justify-center">
          <P className="text-sm font-inter-regular">Send money</P>
        </View>

        <View className="flex-1" />
      </Flex>

      <View
        className="flex-1 bg-white mt-5 p-10 w-full"
        style={{
          borderTopLeftRadius: 48,
          borderTopRightRadius: 48,
        }}
      >
        <Link href="/destination/" asChild>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{ paddingRight: 20 }}
            className="flex-row items-center justify-between bg-zinc-200 rounded-full"
          >
            <Flex className="p-2.5">
              <View className="h-10 w-10 rounded-full bg-zinc-700 items-center justify-center">
                <P className="font-inter-medium text-[10px] uppercase">
                  {destination.value
                    ? destination.value.name.slice(0, 2)
                    : 'ME'}
                </P>
              </View>

              <P className="text-xs font-inter-medium ml-2.5 text-zinc-900">
                {destination.value ? destination.value.name : 'Mercado aleale'}
              </P>
            </Flex>

            <Ionicons name="chevron-forward" size={16} />
          </TouchableOpacity>
        </Link>

        <View className="items-center justify-center mt-10">
          <P
            style={s.valueToTransfer}
            // className="text-[40px] font-urbanist-regular tracking-wider text-zinc-900"
          >
            <P style={{ fontFamily: 'urbanist-regular', color: zinc[500] }}>
              $
            </P>
            {value || '0'}
          </P>

          <P
            className={clsx(
              'text-xs font-urbanist-medium mt-2.5 text-gray-500',
              {
                'text-red-500': Number(value) > 30,
              },
            )}
            style={{ color: zinc[500] }}
          >
            {Number(value) > 30 ? (
              'you are spending more than you can afford today'
            ) : (
              <>
                available to spend today{' '}
                <P style={s.maximumValueToUse}>
                  ${currency(30 - Number(value)) || 30}
                </P>
              </>
            )}
          </P>
        </View>

        <FlatList
          className="mt-10"
          data={KEYBOARD_DATA}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          scrollEnabled={false}
          renderItem={({ item }) => (
            <Pressable
              // className="flex-1 items-center justify-center h-20"
              style={s.keyboardButton}
              onPress={() =>
                setValue((prev) =>
                  prev
                    ? item === 'icon'
                      ? prev.substring(0, prev.length - 1)
                      : prev.concat(item)
                    : item,
                )
              }
            >
              {item !== 'icon' ? (
                <P
                  // className="text-2xl font-urbanist-regular text-zinc-900"
                  style={s.keyboardTitle}
                >
                  {item}
                </P>
              ) : (
                <Ionicons name="backspace" size={22} color="#25272d" />
              )}
            </Pressable>
          )}
          ListFooterComponent={() => (
            <View
              // style={s.listFooterContainer}
              className="px-5 flex-row items-center mt-2.5 mb-10"
            >
              {/** <TouchableOpacity
                activeOpacity={0.8}
                className="items-center h-[60px] flex-1 bg-[#B1EE81] rounded-full flex-row justify-between pl-5 pr-2.5"
              >
                <P className="font-inter-500 text-zinc-900 text-[13px]">Income</P>

                <View className="bg-white h-10 w-10 rounded-full items-center justify-center">
                  <Ionicons name="arrow-up" size={16} color="#B1EE81" />
                </View>
              </TouchableOpacity> */}

              <View className="flex-row items-center">
                <TouchableOpacity
                  activeOpacity={0.8}
                  className="items-center h-16 flex-1 bg-[#25272d] rounded-full flex-row justify-between"
                  style={s.confirmButton}
                  onPress={() => handleSubmitTransfer('outcome')}
                >
                  <P className="font-inter-medium text-white text-[13px]">
                    Confirm loss
                  </P>

                  <View
                    style={{ height: 48, width: 48 }}
                    className="bg-white rounded-full items-center justify-center"
                  >
                    <Ionicons name="arrow-down" size={16} color="#25272d" />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleSubmitTransfer('income')}
                >
                  <View
                    style={{ height: 64, width: 64 }}
                    className="bg-[#B1EE81] rounded-full items-center justify-center ml-2.5"
                  >
                    <Ionicons name="arrow-up" size={16} color={white} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  )
}

const s = StyleSheet.create({
  valueToTransfer: {
    fontSize: 40,
    fontFamily: 'urbanist-regular',
    letterSpacing: -0.2,
    color: zinc[900],
  },
  expenseMessage: {
    fontSize: 12,
    fontFamily: 'inter-medium',
    marginTop: 10,
  },
  maximumValueToUse: { fontFamily: 'urbanist-bold', color: zinc[900] },
  listContainer: { marginTop: 40 },
  keyboardButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
  },
  keyboardTitle: {
    fontSize: 24,
    fontFamily: 'urbanist-medium',
    color: zinc[900],
  },
  listFooterContainer: {
    paddingHorizontal: 28,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    gap: 8,
    marginBottom: 40,
  },
  confirmButton: {
    height: 70,
    flex: 1,
    paddingLeft: 32,
    paddingRight: 12,
  },
  confirmButtonTitle: { fontFamily: 'inter-medium', fontSize: 12 },
})
