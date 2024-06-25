import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBell } from '@fortawesome/free-regular-svg-icons'
import { faAdd } from '@fortawesome/free-solid-svg-icons'
import LinearGradient from 'react-native-linear-gradient'
import TodayTask from '../components/TodayTask'
import { useSelector } from 'react-redux'
import { format } from 'date-fns'
import AddTaskModal from '../components/AddTaskModal'
import { getTodaysTask } from '../utils/utils'
import LottieView from 'lottie-react-native'

const HomeScreen = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const categories = useSelector(state => state.categories);
    const [pendingTasks, setPendingTasks] = useState([]);

    useEffect(() => {
        setPendingTasks(getTodaysTask(categories));
    }, [categories])

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
                <TouchableOpacity className='mx-4 mb-3' onPress={() => setIsModalOpen(true)}>
                    <View className='p-4 bg-[#26252C] rounded-xl flex-row justify-between items-center'>
                        <Text className='font-medium text-white'>Add Task</Text>
                        <View className='items-center justify-center p-2 bg-white rounded-full'>
                            <FontAwesomeIcon icon={faAdd} color='#26252C' />
                        </View>
                    </View>
                </TouchableOpacity>
                <AddTaskModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            </View>
            <View className='flex-1 rounded-t-3xl'>
                <LinearGradient start={{ x: 0.5, y: 0.2 }} end={{ x: 0.5, y: 1 }} colors={['#4838AF', '#1E1A37']} className='flex-1 w-full pt-6 rounded-t-3xl'>
                    <View className='gap-2 p-6 mb-12'>
                        <Text className='text-2xl font-bold text-white'>Today's Task</Text>
                        {pendingTasks.length > 0 ?
                            <ScrollView>
                                <View className='pt-4'>
                                    {pendingTasks && pendingTasks.map((task, key) => <TodayTask priority={task.priority} name={task.name} isDue={task.isDue} due={task.due} startTime={task.startTime} category={task.category} key={key} />)}
                                </View>
                            </ScrollView>
                            :
                            <View className='items-center pt-20'>
                                <LottieView style={{ width: 240, height: 240 }} autoPlay loop source={require('../assets/homeBg.json')} />
                                <Text className='mt-2 font-bold text-white'>You do not have any task scheduled for today</Text>
                            </View>}
                    </View>
                </LinearGradient>
            </View>
        </View>
    )
}

export default HomeScreen

// isDue: Boolean
// due: Date,
// startTime,