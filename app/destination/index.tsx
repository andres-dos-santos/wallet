import { Button } from '@components/button'
import { Flex } from '@components/flex'
import { FlatList, Pressable, View } from 'react-native'
import { white } from 'tailwindcss/colors'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

import { Destination, useDestination } from 'hooks/use-destination'
import { P } from 'components/p'

export default function DestinationPage() {
  const router = useRouter()
  const destination = useDestination()

  function handleSelectDestination(arg: Destination) {
    destination.set(arg)

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
          <P className="text-sm font-inter-regular">Select destination</P>
        </View>

        <View className="flex-1" />
      </Flex>

      <FlatList
        contentContainerStyle={{ paddingHorizontal: 28, paddingTop: 50 }}
        data={[
          { name: 'Mercado Aleale', tag: 'food' },
          { name: 'Padaria de MB', tag: 'food' },
          { name: 'Dentista Andryelle', tag: 'health' },
          { name: 'Nutricionista Lidiane', tag: 'health' },
          { name: 'Maiana Serpa Lanche', tag: 'food' },
          { name: 'Bia Lanche', tag: 'food' },
          { name: 'Cartão de Crédito', tag: 'credit card' },
          { name: 'Mãe', tag: 'home' },
          { name: 'Água', tag: 'bill' },
          { name: 'Diego Barbeiro', tag: 'health' },
          { name: 'Luz', tag: 'bill' },
        ]}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              handleSelectDestination({
                abbreviation: item.name.slice(0, 2),
                name: item.name,
                tag: item.tag,
              })
            }
          >
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
