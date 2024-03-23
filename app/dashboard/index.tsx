import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'
import dayjs from 'dayjs'
import { StatusBar } from 'expo-status-bar'
import { Ionicons } from '@expo/vector-icons'
import { green, red, white } from 'tailwindcss/colors'
import { Link, useFocusEffect } from 'expo-router'
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import clsx from 'clsx'
import * as Network from 'expo-network'
import { useCallback, useMemo, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'

import { COLORS } from 'styles/colors'

import { Icons } from 'icons/@index'

import { Container } from 'components/container'
import { Flex } from 'components/flex'
import { Avatar } from 'components/avatar'
import { Button } from 'components/button'
import { Month } from 'components/month'
import { P } from 'components/p'

import { supabase } from 'data/supabase'

import { currency } from 'utils/currency'

import { MonthContext } from 'contexts/month'

interface Transfer {
  id: string
  created_at: string
  received_by: string
  provided_by: string
  price: number
  description: string
  type: 'income' | 'outcome'
}

const MONTH_NUMBER = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  Jule: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
}

export default function App() {
  const [month, setMonth] = useState(dayjs().format('MMMM'))

  const { data: transfers, isLoading } = useQuery({
    queryKey: ['get-all-transaction-by-month', month],
    queryFn: async ({ queryKey }): Promise<Transfer[]> => {
      const MONTH = dayjs().month(MONTH_NUMBER[queryKey[1]])

      const { data } = await supabase
        .from('transactions')
        .select('*')
        .lte('created_at', MONTH.endOf('month'))
        .gte('created_at', MONTH.startOf('month'))
        .order('created_at', { ascending: false })

      return data
    },
  })

  const { income, outcome } = useMemo(
    () =>
      transfers
        ? transfers.reduce(
            (acc, curr) => ({
              income:
                curr.type === 'income'
                  ? acc.income + curr.price
                  : acc.income + 0,
              outcome:
                curr.type === 'outcome'
                  ? acc.outcome + curr.price
                  : acc.outcome + 0,
            }),
            {
              income: 0,
              outcome: 0,
            },
          )
        : {
            income: 0,
            outcome: 0,
          },
    [transfers],
  )

  const SIGNAL = income > outcome ? '+' : '-'

  const [unsynchronizedTransfers, setUnsynchronizedTransfers] = useState<
    [] | undefined
  >(undefined)

  const { getItem, setItem } = useAsyncStorage('@wallet:offline-transfers')

  useFocusEffect(
    useCallback(() => {
      async function syncronizeUnsynchronizedTransfers() {
        const unsynchronized = await getItem()

        setUnsynchronizedTransfers(
          unsynchronized ? JSON.parse(unsynchronized) : [],
        )

        const { isConnected } = await Network.getNetworkStateAsync()

        if (!!unsynchronized && isConnected) {
          await supabase.from('transactions').insert(JSON.parse(unsynchronized))

          await setItem(JSON.stringify(null))
        }
      }

      if (typeof unsynchronizedTransfers === 'undefined') {
        syncronizeUnsynchronizedTransfers()
      }
    }, [getItem, unsynchronizedTransfers, setItem]),
  )

  return (
    <SafeAreaView style={s.container}>
      <StatusBar style="light" />

      <Container className="px-0">
        <Flex className="justify-between px-7">
          <Avatar />

          <Flex style={{ gap: 5 }}>
            <Link asChild href="/transfer/">
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

        <FlatList
          horizontal
          pagingEnabled
          data={[1]}
          renderItem={() => (
            <>
              <View className="w-screen px-7">
                <Flex className="mt-[40px] mb-[20px] justify-between">
                  <Flex>
                    <P className="font-inter-regular text-xs">OUR BALANCE</P>

                    {unsynchronizedTransfers ? (
                      <View className="bg-white pl-3 pr-1.5 rounded-full items-center flex-row justify-center h-10 mr-auto ml-2.5">
                        <P className="font-inter-medium text-[11px] -tracking-wide text-zinc-900 mr-2.5">
                          Sync
                        </P>
                        <View className="h-8 w-8 bg-[#34373E] rounded-full items-center justify-center">
                          <P className="font-urbanist-bold text-xs">
                            {unsynchronizedTransfers.length}
                          </P>
                        </View>
                      </View>
                    ) : null}
                  </Flex>

                  <MonthContext.Provider value={{ month, setMonth }}>
                    <Month />
                  </MonthContext.Provider>
                </Flex>

                <P className="text-[52px] font-urbanist-light tracking-wider">
                  {SIGNAL}
                  <P className="text-zinc-400">$</P>
                  {String(currency((income - outcome) / 100)).replace('-', '')}
                </P>

                <View className="mt-10">
                  <Flex className="justify-between">
                    <P className="font-inter-regular text-[13px] leading-6">
                      Monthly Total {'\n'}Income
                    </P>
                    <View className="flex-row items-center justify-center gap-2.5">
                      <P className="font-urbanist-light text-3xl">
                        ${currency(income / 100)}
                      </P>
                      <Ionicons
                        name="chevron-up"
                        size={16}
                        color={green[500]}
                      />
                    </View>
                  </Flex>

                  <View className="h-[1px] w-full bg-zinc-700 my-5" />

                  <Flex className="justify-between">
                    <P className="font-inter-regular text-[13px] leading-6">
                      Monthly {'\n'}Spanding
                    </P>
                    <View className="flex-row items-center justify-center gap-2.5">
                      <P className="font-urbanist-light text-3xl">
                        ${currency(outcome / 100)}
                      </P>
                      <Ionicons
                        name="chevron-down"
                        size={16}
                        color={red[500]}
                      />
                    </View>
                  </Flex>
                </View>
              </View>

              <View className="w-screen px-7">
                <Flex className="mt-[40px] mb-[20px] justify-between">
                  <P className="font-inter-regular text-xs">GRAPHICS</P>
                </Flex>

                <View className="flex-row items-end gap-2">
                  {transfers &&
                    transfers.map((item) => (
                      <View
                        key={item.id}
                        style={{
                          height: item.price / 100 < 5 ? 10 : item.price / 100,
                        }}
                        className={clsx('w-2 rounded-md bg-white', {
                          'bg-red-500':
                            item.type === 'outcome' && item.price / 100 > 30,
                          'bg-[#B1EE81]': item.type === 'income',
                          // '': item.price / 100 > 30,
                        })}
                      />
                    ))}
                </View>
              </View>
            </>
          )}
        />
      </Container>

      <BottomSheet
        ref={useRef<BottomSheet>(null)}
        backgroundStyle={{
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          backgroundColor: '#34373E',
        }}
        handleStyle={{
          backgroundColor: '#34373E',
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
        }}
        handleIndicatorStyle={{
          marginVertical: 20,
          height: 3,
          width: 100,
          backgroundColor: white,
        }}
        snapPoints={useMemo(() => ['45%', '95%'], [])}
      >
        <View style={{ flex: 1, backgroundColor: '#34373E' }}>
          <BottomSheetFlatList
            data={isLoading ? [] : transfers}
            contentContainerStyle={{ paddingHorizontal: 28, paddingBottom: 80 }}
            keyExtractor={(item) => item.created_at}
            ListEmptyComponent={() => (
              <View className="mt-40 items-center justify-center mb-10">
                {isLoading ? (
                  <ActivityIndicator color="#B1EE81" />
                ) : (
                  <P className="font-inter-regular text-xs">
                    Nothing to see here
                  </P>
                )}
              </View>
            )}
            ListHeaderComponent={() => (
              <>
                <View
                  style={{ flex: 1 }}
                  className="bg-zinc-800/50 items-center rounded-[40px] p-7"
                >
                  <P className="font-inter-regular text-[13px]">
                    Tracking your finance goal
                  </P>

                  <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    contentContainerStyle={{ maxHeight: 32 }}
                    className="mt-5"
                  >
                    <Pressable className="h-8 rounded-xl bg-white px-5 mr-2 items-center justify-center">
                      <P className="text-xs font-inter-medium text-zinc-900">
                        First home
                      </P>
                    </Pressable>

                    <Pressable className="h-8 rounded-xl bg-[#414652] px-5 mr-2 items-center justify-center">
                      <P className="text-xs font-inter-medium">New car</P>
                    </Pressable>

                    <Pressable className="h-8 rounded-xl bg-[#414652] px-5 mr-2 items-center justify-center">
                      <P className="text-xs font-inter-medium">Vacation</P>
                    </Pressable>
                  </ScrollView>

                  <P className="text-[28px] font-urbanist-regular tracking-wider mt-5">
                    $3.190
                  </P>

                  <View className="bg-[#434D46] h-8 px-3 items-center justify-center rounded-full mt-2.5 mb-2.5">
                    <P className="text-xs font-inter-medium text-[#B1EE81]">
                      On track
                    </P>
                  </View>

                  <Flex className="my-5 justify-between">
                    <P className="font-inter-regular flex-1">
                      Routine saving{' '}
                      <P className="font-urbanist-regular">$700</P>{' '}
                    </P>
                    <P className="font-inter-regular">
                      Target <P className="font-urbanist-regular">$2.400</P>
                    </P>
                  </Flex>

                  <Pressable className="items-center justify-center h-14 w-full bg-[#B1EE81] rounded-[25px]">
                    <P className="font-inter-medium text-zinc-900">Top up</P>
                  </Pressable>
                </View>

                <View className="my-10">
                  <P className="font-inter-medium text-xs">MONTH HISTORIC</P>
                </View>
              </>
            )}
            renderItem={({ item }) => (
              <View className="flex-row items-center mb-4 w-full">
                <View
                  className={clsx(
                    'items-center justify-center w-10 h-10 bg-red-500 rounded-full',
                    {
                      'bg-[#B1EE81]': item.type === 'income',
                    },
                  )}
                >
                  <P
                    className={clsx('font-inter-bold text-[10px] uppercase', {
                      'text-zinc-900': item.type === 'income',
                    })}
                  >
                    {item.received_by.slice(0, 2)}
                  </P>
                </View>

                <P className="font-inter-medium text-xs text-zinc-100 ml-2.5">
                  Transfer to {item.received_by.slice(0, 12)}... of{' '}
                  <P className="font-urbanist-semibold text-lg">
                    ${currency(item.price / 100)}
                  </P>
                </P>

                <View className="ml-auto flex-row items-center">
                  <P className="font-inter-regular text-xs mr-2.5">
                    {dayjs(item.created_at).format('MMM, DD')}
                  </P>
                  <Ionicons name="chevron-forward" color={white} />
                </View>
              </View>
            )}
          />
        </View>
      </BottomSheet>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.zinc[900],
  },
})
