import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import database from '../watermellon.config'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft, faEdit, faFileUpload, faPhone, faUpload } from '@fortawesome/free-solid-svg-icons';
import placeholderImage from '../assets/placeholder-image.png';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { format } from 'date-fns';
import welcomeImg from '../assets/rafiki.png'
import { launchImageLibrary } from 'react-native-image-picker';
import { withObservables } from '@nozbe/watermelondb/react';
import Modal from 'react-native-modal'

const DisplayProfileScreeen = ({ navigation, user }) => {
    const [userData, setUserData] = useState(user[0]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isRestData, setIsResetData] = useState(false);

    const deleteData = async () => {
        const tasks = await database.get('tasks').query().fetch();
        const events = await database.get('events').query().fetch();
        const schedules = await database.get('schedule').query().fetch();
        const existingUser = await database.get('profile').query().fetch();
        await database.write(async () => {
            if (tasks.length > 0) await Promise.all(tasks.map(task => task.destroyPermanently()));
            if (events.length > 0) await Promise.all(events.map(event => event.destroyPermanently()));
            if (schedules.length > 0) await Promise.all(schedules.map(schedule => schedule.destroyPermanently()));
            if (existingUser.length > 0 && !isRestData) {
                await Promise.all(existingUser.map(user => user.destroyPermanently()));
                navigation.replace('Initial Stack');
            }
        });
        setIsModalVisible(false);
    }

    const onResetData = async () => {
        setIsResetData(true);
        setIsModalVisible(true);
    }

    const onDeleteAccount = async () => {
        setIsResetData(false);
        setIsModalVisible(true);
    }

    return (
        <View className='justify-between flex-1 w-full px-8 pb-4 bg-black pt-14'>
            <View className=''>
                <View className='flex-row items-center gap-3'>
                    <TouchableOpacity onPress={() => navigation.navigate('Home Screen')}>
                        <FontAwesomeIcon color='#ffffff' size={24} icon={faAngleLeft} />
                    </TouchableOpacity>
                    <Text className='text-2xl font-bold text-white'>Profile</Text>
                </View>
                <View className='bg-[#2E2E2E] rounded-md px-7 py-4 w-full mt-8 flex-row justify-between items-start'>
                    <View className='flex-row gap-2'>
                        <ProfileImage userData={userData} />
                        <View>
                            <Text className='text-base font-bold text-white'>{userData.name}</Text>
                            <Text className='text-sm text-white'>{userData.profession}</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Edit Profile Screen')}>
                        <FontAwesomeIcon color='#ffffff' size={24} icon={faEdit} />
                    </TouchableOpacity>
                </View>
                <View className='mt-6 bg-[#2E2E2E] rounded-md px-4 py-4 w-full justify-between items-start'>
                    <View className='flex-row gap-2'>
                        <FontAwesomeIcon size={24} icon={faPhone} color='#ffffff' />
                        <Text className='text-sm font-light text-white'>{userData.phoneNumber}</Text>
                    </View>
                    <View className='w-full h-[1px] my-4 bg-[#786D6D] ' />
                    <View className='flex-row gap-2'>
                        <FontAwesomeIcon size={24} icon={faCalendar} color='#ffffff' />
                        <Text className='text-sm font-light text-white'>{userData.dob ? format(userData.dob, 'MMMM d, yyyy') : ''}</Text>
                    </View>
                </View>
            </View>
            <View className='gap-2'>
                <TouchableOpacity className='rounded-lg' activeOpacity={0.7} onPress={onResetData}>
                    <View className='w-full bg-[#424242] py-3 justify-center items-center  rounded-lg'>
                        <Text className='text-lg font-semibold text-white'>Reset Data</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity className='rounded-lg' activeOpacity={0.7} onPress={onDeleteAccount}>
                    <View className='w-full bg-[#424242] py-3 justify-center items-center font-semibold rounded-lg'>
                        <Text className='text-lg font-semibold text-red-500'>Delete Account</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <Modal isVisible={isModalVisible}>
                <View className='items-start gap-3 px-6 py-8 mx-4 bg-white rounded-md'>
                    <Text className='font-bold text-[#212121] text-lg'>Are you sure?</Text>
                    <Text className='text-[#4A4A4A] text-sm'>Your data will be permenantly deleted.</Text>
                    <View className='flex-row'>
                        <TouchableOpacity onPress={() => setIsModalVisible(false)} activeOpacity={0.7} className='h-7 w-24 mr-1 items-center justify-center border-[1px] border-[#26252C] rounded-md'>
                            <Text className='text-[#26252C] font-medium text-center'>No</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => deleteData()} activeOpacity={0.7} className='h-7 w-24 items-center justify-center bg-[#26252C] rounded-md'>
                            <Text className='font-medium text-center text-white'>Yes</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}


const ProfileImage = ({ userData }) => {
    const [imageUri, setImageUri] = useState(userData.imageUri);
    const selectImageHandler = () => {
        const options = {
            mediaType: 'photo',
            maxWidth: 300,
            maxHeight: 300,
            quality: 1,
            includeBase64: true
        }

        launchImageLibrary(options, async (res) => {
            if (res.didCancel) {
                console.log('User cancelled image picker');
                return;
            } else if (res.errorMessage) {
                console.log(res.errorMessage);
                return
            }
            const uri = res.assets[0] ? `data:${res.assets[0].type};base64,${res.assets[0].base64}` : '';
            setImageUri(uri);
            await database.write(async () => {
                await userData.update(user => {
                    user.imageUri = uri;
                }
                );
            })

        })
    }


    return (
        <TouchableOpacity onPress={selectImageHandler}>
            <View className='relative flex-row items-center justify-center w-16 h-16 bg-gray-300 rounded-full'>
                {imageUri ? <Image className='w-full h-full rounded-full' source={{ uri: imageUri }} /> : <Image className='w-full h-full rounded-full' source={placeholderImage} />}
                <View className='absolute bottom-0 right-0 p-1 bg-white rounded-full'>
                    <FontAwesomeIcon icon={faFileUpload} />
                </View>
            </View>
        </TouchableOpacity>
    )
}


const enhance = withObservables([], () => ({
    user: database.get('profile').query().observeWithColumns(['name', 'profession', 'img_uri', 'phone_number', 'dob']),
}));

const EnhanceDisplayProfileScreen = enhance(DisplayProfileScreeen);

export default EnhanceDisplayProfileScreen;
