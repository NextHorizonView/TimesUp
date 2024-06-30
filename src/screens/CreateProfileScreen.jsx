import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import TaskTextBox from '../components/TaskTextBox'
import database from '../watermellon.config';
import { launchImageLibrary } from 'react-native-image-picker'
import Toast from 'react-native-toast-message';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const CreateProfileScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [profession, setProfession] = useState('');
  const [image, setImage] = useState('');

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

  const saveUser = async () => {
    
    if (username.length == 0) {
      Toast.show({
        type: 'error',
        text1: 'Please enter a username',
        swipeable: true
      })
      return;
    }
    const existingUser = await database.get('profiles').query().fetch();
    if (existingUser.length > 0) {
      throw new Error('This category already exists');
    }
    await database.write(async () => {
      await database.get('profiles').create(user => {
        user.username = username;
        user.profession = profession;
        user.imageUri = image ? `data:${image.type};base64,${image.base64}` : '';
      }).then(() => navigation.replace('Onboarding', { username, profession, image })).catch(err => console.log(err));

    });
  };

  return (
    <View className='items-center justify-between flex-1 pt-20 bg-purple-100'>
      <View className='bg-[#4938B5] p-8 rounded-lg flex items-center'>
        <Toast />
        <Text className='text-lg text-center text-white'>Create your profile</Text>
        <TouchableOpacity onPress={selectImageHandler}>
          {image ?
            <Image className='w-20 h-20 mt-4 rounded-full' source={{ uri: `data:${image.type};base64,${image.base64}` }} />
            :
            <View className='w-20 h-20 mt-4 rounded-full'>
              <Image className='w-20 h-20' source={require('../assets/placeholderUserImg.png')} />
            </View>
          }
          <View className='bg-[#EEBA00] p-2 items-center justify-center rounded-full absolute bottom-0 -right-4'>
            <FontAwesomeIcon color='white' size={16} icon={faPen} />
          </View>
        </TouchableOpacity>
        <View>
          <Text className='mt-4 text-left text-white'>Name</Text>
          <TaskTextBox value={username} setValue={setUsername} isLight={true} />
          <Text className='mt-4 text-left text-white'>Profession</Text>
          <TaskTextBox value={profession} setValue={setProfession} isLight={true} />
          <TouchableOpacity onPress={saveUser} className='bg-[#26252C] p-2 mt-4 w-32 rounded-lg'>
            <Text className='text-center text-white'>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Image className='' source={require('../assets/profileformbg.png')} />
    </View>
  )
}

export default CreateProfileScreen