import {
  FlatList,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { white } from 'tailwindcss/colors'
import { useCallback, useContext, useState } from 'react'

import { P } from './p'
import { MonthContext } from 'contexts/month'

export function Month() {
  const { month, setMonth } = useContext(MonthContext)

  const [visible, setVisible] = useState(false)

  const handleSelectAMonth = useCallback(
    (month: string) => {
      setMonth(month)

      setVisible(false)
    },
    [setMonth],
  )

  return (
    <>
      <Pressable
        onPress={() => setVisible(true)}
        className="h-8 px-3 rounded-full flex-row items-center bg-[#2e3035]"
      >
        <P className="font-inter-medium text-xs mr-1.5">{month}</P>
        <Ionicons name="chevron-down" color={white} />
      </Pressable>

      <Modal visible={visible} transparent animationType="slide">
        <TouchableWithoutFeedback
          // onPress={() => setVisible(false)}
          style={{ flex: 1 }}
        >
          <View className="flex-1 items-center justify-center bg-zinc-900/90">
            <View className="h-1/2 w-[80%] bg-[#2e3035] rounded-3xl">
              <FlatList
                ListHeaderComponent={
                  <P className="font-inter-regular text-[18px] mb-5">
                    Select a month
                  </P>
                }
                contentContainerStyle={{ padding: 20 }}
                data={[
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                  'Jule',
                  'August',
                  'September',
                  'October',
                  'November',
                  'December',
                ]}
                showsVerticalScrollIndicator={false}
                overScrollMode="never"
                renderItem={({ item, index }) => (
                  <Pressable
                    className="flex-row items-center mb-2.5"
                    onPress={() => handleSelectAMonth(item)}
                  >
                    <View className="bg-zinc-800 h-14 w-14 mr-5 rounded-2xl items-center justify-center">
                      <P className="font-urbanist-medium text-xs">
                        {index + 1}
                      </P>
                      <P className="font-inter-medium text-[10px]">
                        {item.slice(0, 3)}
                      </P>
                    </View>

                    <P className="font-inter-medium text-xs">{item}</P>

                    <View className="ml-auto flex-row items-center mr-5">
                      <Ionicons name="chevron-forward" color={white} />
                    </View>
                  </Pressable>
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  )
}
