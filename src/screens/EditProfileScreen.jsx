import { View, Text, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Dimensions } from 'react-native'
import TaskTextBox from '../components/TaskTextBox';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { launchImageLibrary } from 'react-native-image-picker';
import database from '../watermellon.config';
import { faBackward } from '@fortawesome/free-solid-svg-icons/faBackward';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons/faRightToBracket';
import { faLeftLong } from '@fortawesome/free-solid-svg-icons/faLeftLong';

const SCREEN_WIDTH = Dimensions.get('window').width;

const EditProfile = ({ route, navigation }) => {
    const { userData, setUserData } = route.params;
    const [newName, setNewName] = useState(userData.username);
    const [newProfession, setNewProfession] = useState(userData.profession);
    const [newImageUri, setNewImageUri] = useState(userData.imageUri);
    const [image, setImage] = useState('')

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
            setImage(res.assets[0]);
        })
    }

    useEffect(() => {
        setNewImageUri(`data:${image.type};base64,${image.base64}`);
    }, [image])

    const navigateBack = () => {
        navigation.navigate('Bottom Tab');
    }

    const saveUser = async () => {
        if (newName.length == 0) {
            Toast.show({
                type: 'error',
                text1: 'Please enter a username',
                swipeable: true
            })
            return;
        }
        const existingUser = await database.get('profiles').query().fetch();

        if (existingUser.length > 0) {
            await database.write(async () => {
                await existingUser[0].update(user => {
                    user.username = newName;
                    user.profession = newProfession;
                    user.imageUri = newImageUri ? `${newImageUri}` : '';
                }
                );
            })
        };

        navigateBack();
    }

    useEffect(() => {
        setNewName(userData.username);
        setNewProfession(userData.profession);
        setNewImageUri(userData.imageUri);
    }, [userData])


    return (
        <View className='items-center justify-between flex-1 bg-purple-100'>
            <View className='flex-row justify-start w-full'>
                <TouchableOpacity onPress={navigateBack} className='pl-4'>
                    <FontAwesomeIcon className='mr-20' size={50} color='#EEBA00' icon={faLeftLong} />
                </TouchableOpacity>
            </View>
            <View className='bg-[#4938B5] p-8 rounded-lg flex items-center'>
                <Text className='text-xl font-bold text-white'>Edit Profile</Text>
                <View className='items-center mt-4'>
                    <TouchableOpacity onPress={() => selectImageHandler()}>
                        <View className='flex-row items-end'>
                            {
                                newImageUri ?
                                    <Image className='w-20 h-20 rounded-xl' source={{ uri: newImageUri }} />
                                    :
                                    <Image className='w-20 h-20 rounded-xl' source={require('../assets/placeholderUserImg.png')} />
                            }
                            <View className='bg-[#EEBA00] p-2 items-center justify-center rounded-full absolute -right-4'>

                                <FontAwesomeIcon color='white' size={16} icon={faPen} />
                            </View>
                        </View>
                    </TouchableOpacity>

                    <View className=''>
                        <Text className='mt-2 text-white'>Name</Text>
                        <TaskTextBox value={newName} setValue={setNewName} isLight={true} />
                        <Text className='mt-4 text-white'>Profession</Text>
                        <TaskTextBox value={newProfession} setValue={setNewProfession} isLight={true} />

                        <View className='flex-row justify-between mt-4'>
                            <TouchableOpacity onPress={saveUser} className='items-center justify-center p-4 bg-[#26252C] rounded-lg'>
                                <Text className='text-white'>Save Changes</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>
            </View>
            <Image className='p-0 m-0' source={require('../assets/editprofile.png')} />
        </View>
    )
}

export default EditProfile;