import { View, Text } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'

const CalendarTask = ({ name, goals, numOfCompletedTask }) => {
    const percentOfGolsCompleted = ((numOfCompletedTask / goals.length)) * 100;
    return (
        <LinearGradient start={{ x: 0.5, y: 0.2 }} end={{ x: 0.5, y: 1 }} colors={['#3854B5', '#ffffff']} className='rounded-[20px] min-h-[120px] my-1 px-4 py-2'>
            <View className='flex-row justify-end'>
                <View className='flex-row items-center gap-3'>
                    <View className='w-[90px] h-[4px] bg-white rounded'>
                        <View className='h-[5px]  bg-[#5B72C2] rounded' style={{ width: `${percentOfGolsCompleted}%` }} />
                    </View>
                    <Text className='text-white'>{percentOfGolsCompleted.toFixed(0)}%</Text>
                </View>
            </View>
            <Text className='font-bold text-white'>{name}</Text>
            <View className='justify-between flex-1 mt-2 items-between'>
                <Text className='text-[#ffffff] font-bold text-lg '>{goals[numOfCompletedTask]}</Text>
                <Text className='text-[#231B57] font-bold text-sm'>{goals.length - numOfCompletedTask} Left</Text>
            </View>
        </LinearGradient>
    )
}

export default CalendarTask