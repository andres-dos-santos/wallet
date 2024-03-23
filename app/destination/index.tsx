import { Button } from '@components/button'
import { Flex } from '@components/flex'
import { FlatList, Pressable, View } from 'react-native'
import { white } from 'tailwindcss/colors'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

import { useDestination } from 'hooks/use-destination'
import { P } from 'components/p'

export default function DestinationPage() {
  const router = useRouter()
  const destination = useDestination()

  function handleSelectDestination(name: string) {
    destination.set({ name })

    router.back()
  }

  return (
    <View className="flex-1 pt-14 bg-[#25272d]">
      <Flex className="px-5">
        <View className="flex-1">
          <Button.Black onPress={router.back}>
            <Ionicons name="arrow-back" color={white} size={16} />
          </Button.Black>
        </View>

        <View className="flex-1 items-center justify-center">
          <P className="text-[13px] font-inter-medium">Select destination</P>
        </View>

        <View className="flex-1" />
      </Flex>

      <FlatList
        contentContainerStyle={{ paddingHorizontal: 28, paddingTop: 50 }}
        data={[
          { name: 'Mercado aleale', tag: 'alimentação' },
          { name: 'Padaria de mb', tag: 'alimentação' },
        ]}
        renderItem={({ item }) => (
          <Pressable onPress={() => handleSelectDestination(item.name)}>
            <Flex className="mb-3">
              <View className="h-10 w-10 rounded-full bg-zinc-700 items-center justify-center mr-2.5">
                <P className="font-inter-medium text-[10px] uppercase">
                  {item.name.slice(0, 2)}
                </P>
              </View>
              <P className="font-inter-medium text-[13px]">{item.name}</P>

              <View className="h-8 px-2.5 rounded-full bg-white items-center justify-center ml-auto">
                <P className="font-inter-bold text-[8px] uppercase text-zinc-800">
                  {item.tag}
                </P>
              </View>
            </Flex>
          </Pressable>
        )}
      />
    </View>
  )
}
