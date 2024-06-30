import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAdd } from '@fortawesome/free-solid-svg-icons'
import LinearGradient from 'react-native-linear-gradient'
import AddTaskModal from '../components/AddTaskModal'
import TodayTaskContainer from '../components/TodayTaskContainer'
import { useDatabase } from '../context/DatabaseContext'
import { withObservables } from '@nozbe/watermelondb/react'
import database from '../watermellon.config'

const HomeScreen = ({ navigation, user }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userData, setUserData] = useState(user[0])

    const navigateToTaskScreen = (categoryName) => {
        navigation.navigate('Add Task', { categoryName })
    }

    useEffect(() => {
        if (user.length > 0) {
            setUserData(user[0])
        }
    }, [user])

    const onNavigateToEditProfileScreen = () => {
        navigation.navigate('Edit Profile', {
            userData: {
                username: userData.username,
                profession: userData.profession,
                imageUri: userData.imageUri,
            }
        });
    }

    return (
        <View className='flex-1 bg-black'>
            <View className='gap-4 p-6'>
                <View className='flex flex-row justify-between mb-8'>
                    <View className='flex flex-row gap-4'>
                        <TouchableOpacity onPress={onNavigateToEditProfileScreen}>
                            <View>
                                {userData && userData.imageUri ? <Image source={{ uri: userData.imageUri }} className='w-12 h-12 rounded' />
                                    :
                                    <Image source={require('../assets/placeholderUserImg.png')} className='w-12 h-12 rounded' />
                                }
                            </View>
                        </TouchableOpacity>
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
                    <TodayTaskContainer navigateToTaskScreen={navigateToTaskScreen} />
                </LinearGradient>
            </View>
        </View>
    )
}

const enhance = withObservables([], () => ({
    user: database.get('profiles').query().observeWithColumns(['username', 'profession', 'img_uri'])
}))

const EnhanceHomeScreen = enhance(HomeScreen);

export default EnhanceHomeScreen;

