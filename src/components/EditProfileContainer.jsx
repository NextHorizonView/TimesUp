import { View, Text, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Dimensions } from 'react-native'
import TaskTextBox from './TaskTextBox';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { launchImageLibrary } from 'react-native-image-picker';
import database from '../watermellon.config';

const SCREEN_WIDTH = Dimensions.get('window').width;

const EditProfileContainer = ({ userData, setUserData }) => {
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

          setUserData({
            username: newName,
            profession: newProfession,
            imageUri: newImageUri ? `${newImageUri}` : ''
          })
        }
        );
      })
    };

  }

  const cancelUser = () => {
    setNewName(userData.username);
    setNewProfession(userData.profession);
    setNewImageUri(userData.imageUri);
  }

  useEffect(() => {
    setNewName(userData.username);
    setNewProfession(userData.profession);
    setNewImageUri(userData.imageUri);
  }, [userData])


  return (
    <View className='flex-1 pt-6 rounded-t-3xl' style={{ width: SCREEN_WIDTH }}>
      <KeyboardAwareScrollView>
        <View className='flex-1 p-6'>
          <Text className='text-2xl font-bold text-white'>Edit Profile</Text>
          <View className='items-center flex-1 mt-8'>
            <TouchableOpacity onPress={() => selectImageHandler()}>
              <View className='flex-row items-end'>
                {
                  newImageUri ?
                    <Image className='w-[100px] h-[100px] rounded-xl' source={{ uri: newImageUri }} />
                    :
                    <Image className='w-[100px] h-[100px] rounded-xl' source={require('../assets/placeholderUserImg.png')} />
                }
                <View className='bg-[#EEBA00] p-2 items-center justify-center rounded-full absolute -right-4'>

                  <FontAwesomeIcon color='white' size={16} icon={faPen} />
                </View>
              </View>
            </TouchableOpacity>

            <View className='flex-1'>
              <Text className='mt-6 text-white'>Name</Text>
              <TaskTextBox value={newName} setValue={setNewName} isLight={true} />
              <Text className='mt-4 text-white'>Profession</Text>
              <TaskTextBox value={newProfession} setValue={setNewProfession} isLight={true} />

              <View className='flex-row justify-between mt-8'>
                <TouchableOpacity onPress={() => { cancelUser() }} className='items-center justify-center w-[40%]  p-4 bg-[#26252C] rounded-lg'>
                  <Text className='text-white'>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { saveUser() }} className='items-center justify-center w-[40%] p-4 bg-white rounded-lg'>
                  <Text className='text-black'>Save Profile</Text>
                </TouchableOpacity>
              </View>

            </View>

          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}

export default EditProfileContainer;