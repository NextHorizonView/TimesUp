import { View, Text, Image, TouchableOpacity, Modal } from 'react-native'
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBell } from '@fortawesome/free-regular-svg-icons'
import { faAdd } from '@fortawesome/free-solid-svg-icons'
import LinearGradient from 'react-native-linear-gradient'
import AddTaskModal from '../components/AddTaskModal'
import TodayTaskContainer from '../components/TodayTaskContainer'
import { useDatabase } from '../context/DatabaseContext'
import TaskTextBox from '../components/TaskTextBox'
import Toast from 'react-native-toast-message'
import { launchImageLibrary } from 'react-native-image-picker'
import { onDisplayNotification } from '../utils/notification'

/**
 * Request: {"readyState":0,"status":0,"statusText":"error"}
 */

const HomeScreen = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { getUserData } = useDatabase()
    const [userData, setUserdata] = useState({})
    const [updateProfileOpen, setUpdateProfileOpen] = useState(false)

    const [updatedName, setUpdatedName] = useState('');
    const [updatedProfession, setUpdatedProfession] = useState('');
    const [updatedImageUri, setUpdatedImageUri] = useState('');

    const selectImageHandler = () => {
        const options = {
            mediaType: 'photo',
            maxWidth: 300,
            maxHeight: 300,
            quality: 1,
            includeBase64: true
        }

        launchImageLibrary(options, (res) => {
            if (res.didCancel) {
                console.log('User cancelled image picker');
                return;
            } else if (res.errorMessage) {
                console.log(res.errorMessage);
                return
            }
            setUpdatedImageUri(`data:${res.assets[0].type};base64,${res.assets[0].base64}`);
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            const user = await getUserData()
            setUserdata(user);
            setUpdatedName(user.username);
            setUpdatedProfession(user.profession);
            setUpdatedImageUri(user.imageUri);
        }
        fetchData();
    }, [])

    const onNotificationPress = async () => {
        onDisplayNotification()
    }

    return (
        <View className='flex-1 bg-black'>
            <View className='gap-4 p-6'>
                <View className='flex flex-row justify-between mb-8'>
                    <View className='flex flex-row gap-4'>
                        <TouchableOpacity onPress={() => { }}>
                            {updatedImageUri ? <Image source={{ uri: updatedImageUri }} className='w-12 h-12 rounded' />
                                :
                                <Image source={require('../assets/placeholderUserImg.png')} className='w-12 h-12 rounded' />
                            }
                        </TouchableOpacity>
                        <View className='justify-between'>
                            <Text className='text-white'>{userData.username}</Text>
                            <Text className='text-white'>{userData.profession}</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={onNotificationPress} className='w-12'>
                        <View className='bg-[#4938B5] p-2 rounded justify-center items-center w-12 h-12'>
                            <FontAwesomeIcon icon={faBell} size={24} color='#ffffff' />
                        </View>
                    </TouchableOpacity>
                </View>
                <Modal
                    animationType='slide'
                    visible={updateProfileOpen}
                >
                    <View className='items-center justify-center flex-1 p-2 bg-black'>
                        <View className='bg-[#4938B5] p-8 rounded-lg flex items-center'>
                            <Toast />
                            <Text className='text-lg text-center text-white'>Update your profile</Text>
                            <TouchableOpacity onPress={selectImageHandler}>
                                {userData.imageUri ?
                                    <Image className='w-20 h-20 mt-4 rounded-full' source={{ uri: userData.imageUri }} />
                                    :
                                    <View className='w-20 h-20 mt-4 rounded-full'>
                                        <Image className='w-20 h-20' source={require('../assets/placeholderUserImg.png')} />
                                    </View>
                                }
                            </TouchableOpacity>
                            <View>
                                <Text className='mt-4 text-left text-white'>Name</Text>
                                <TaskTextBox value={updatedName} setValue={setUpdatedName} isLight={true} />
                                <Text className='mt-4 text-left text-white'>Profession</Text>
                                <TaskTextBox value={updatedProfession} setValue={setUpdatedProfession} isLight={true} />
                                <TouchableOpacity onPress={() => { }} className='bg-[#26252C] p-2 mt-4 w-32 rounded-lg'>
                                    <Text className='text-center text-white'>Save</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
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
                        <TodayTaskContainer />
                    </View>
                </LinearGradient>
            </View>
        </View>
    )
}

export default HomeScreen
