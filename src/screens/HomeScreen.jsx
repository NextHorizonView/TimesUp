import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBell } from '@fortawesome/free-regular-svg-icons'
import { faAdd } from '@fortawesome/free-solid-svg-icons'
import LinearGradient from 'react-native-linear-gradient'
import TodayTask from '../components/TodayTask'

const tasks = [
    {
        name: 'English Class Homework',
        description: 'Complete Homework',
        priority: 4
    },
    {
        name: 'Maths Class Homework',
        description: 'Complete Math Homework',
        priority: 3
    },
    {
        name: 'Science Class Homework',
        description: 'Complete Homework',
        priority: 1
    },
    {
        name: 'Geography Class Homework',
        description: 'Complete Homework',
        priority: 5
    },
]

const HomeScreen = () => {
    return (
        <View className='flex-1 bg-black'>
            <View className='gap-4 p-6'>
                <View className='flex flex-row justify-between mb-8'>
                    <View className='flex flex-row gap-4'>
                        <Image source={require('../assets/profile.png')} className='w-12 h-50' />
                        <View className='justify-between'>
                            <Text className='text-white'>Yash Singh</Text>
                            <Text className='text-white'>Student</Text>
                        </View>
                    </View>
                    <TouchableOpacity className='w-12'>
                        <View className='bg-[#4938B5] p-2 rounded justify-center items-center w-12 h-12'>
                            <FontAwesomeIcon icon={faBell} size={24} color='#ffffff' />
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>
                    <View className='bg-[#26252C] w-full h-24 rounded-2xl flex-row items-center justify-between px-4'>
                        <Text className='text-lg text-white'>Add Task</Text>
                        <View className='items-center justify-center w-10 h-10 bg-white rounded-full'>
                            <FontAwesomeIcon size={24} color='#26252C' icon={faAdd} />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            <View className='flex-1 rounded-t-3xl'>
                <LinearGradient start={{ x: 0.5, y: 0.2 }} end={{ x: 0.5, y: 1 }} colors={['#4838AF', '#1E1A37']} className='flex-1 w-full pt-6 rounded-t-3xl'>
                    <View className='gap-2 p-6 mb-12'>
                        <Text className='text-2xl font-bold text-white'>Today's Task</Text>
                        <ScrollView>
                            <View className='pt-4'>
                                {tasks.map((task, key) => <TodayTask name={task.name} description={task.description} priority={task.priority} key={key} />)}
                            </View>
                        </ScrollView>
                    </View>
                </LinearGradient>
            </View>
        </View>
    )
}

export default HomeScreen