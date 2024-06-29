import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBell } from '@fortawesome/free-regular-svg-icons'
import { faAdd } from '@fortawesome/free-solid-svg-icons'
import LinearGradient from 'react-native-linear-gradient'
import AddTaskModal from '../components/AddTaskModal'
import TodayTaskContainer from '../components/TodayTaskContainer'
import { useDatabase } from '../context/DatabaseContext'
import { onCreateTriggerNotification } from '../utils/notification'
import EditProfileContainer from '../components/EditProfileContainer'
import { Dimensions } from 'react-native'

const SCREEN_WIDTH = Dimensions.get('window').width;

const HomeScreen = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { getUserData } = useDatabase()
    const [userData, setUserData] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const user = await getUserData()
            setUserData(user);
        }
        fetchData();
    }, [])


    return (
        <View className='flex-1 bg-black'>
            <View className='gap-4 p-6'>
                <View className='flex flex-row justify-between mb-8'>
                    <View className='flex flex-row gap-4'>
                        <View>
                            {userData && userData.imageUri ? <Image source={{ uri: userData.imageUri }} className='w-12 h-12 rounded' />
                                :
                                <Image source={require('../assets/placeholderUserImg.png')} className='w-12 h-12 rounded' />
                            }
                        </View>
                        <View className='justify-between'>
                            <Text className='text-white'>{userData.username}</Text>
                            <Text className='text-white'>{userData.profession}</Text>
                        </View>
                    </View>

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
                <LinearGradient start={{ x: 0.5, y: 0.2 }} end={{ x: 0.5, y: 1 }} colors={['#4838AF', '#1E1A37']} className='flex-1 rounded-t-3xl'>
                    <View className='absolute w-[66px] h-1 -translate-x-[33px] bg-white rounded left-1/2' />
                    <ScrollView horizontal className='flex-1' style={{ width: SCREEN_WIDTH }} snapToInterval={SCREEN_WIDTH}
                        decelerationRate="fast"
                        snapToAlignment="center"
                        showsHorizontalScrollIndicator={false}>
                        <View style={{ width: SCREEN_WIDTH }}>
                            <TodayTaskContainer />
                        </View>
                        <EditProfileContainer userData={userData} setUserData={setUserData} />
                    </ScrollView>
                </LinearGradient>
            </View>
        </View>
    )
}

export default HomeScreen


