import { View, Text, Image, TouchableOpacity, Modal } from 'react-native'
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAdd } from '@fortawesome/free-solid-svg-icons'
import LinearGradient from 'react-native-linear-gradient'
import { withObservables } from '@nozbe/watermelondb/react'
import database from '../watermellon.config'
import TodayTask from '../components/TodayTask'
import { Popable } from 'react-native-popable'
import { useDatabase } from '../context/DatabaseContext'

const data = [
  {
    description: 'Click your profile image to navigate to the edit profile page and update your details.',
  },
  {
    description: 'Click this button to schedule a new task.',
  }
];

const TutorialHomeScreen = ({ user, navigation }) => {
  const [userData, setUserData] = useState(user[0])
  const [step, setStep] = useState(0);
  const { switchOfTutorial } = useDatabase();

  const onNextHandler = () => {
    if (step === data.length - 1) {
      navigation.navigate('Tutorial Add Task')
    } else {
      setStep(step + 1);
    }
  }

  const onSkipHandler = () => {
    navigation.navigate('Bottom Tab');
    switchOfTutorial();
  }

  useEffect(() => {
    if (user.length > 0) {
      setUserData(user[0])
    }
  }, [user])

  return (
    <View className='flex-1 bg-black'>
      <View className='absolute left-0 right-0 z-10 flex-1 top-0 bottom-0'>
        <View className='p-4 bg-[#333a67] absolute bottom-8 left-4 right-4'>
          <Text className='text-white font-bold text-xl'>Home Page</Text>
          <Text>{data[step].description}</Text>
          <View className='flex-row gap-4 mt-2'>
            <TouchableOpacity onPress={onNextHandler} className='mt-2 bg-[#1f233f] w-24 h-8 items-center justify-center rounded'>
              <Text className='text-white font-bold'>Next</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onSkipHandler} className='mt-2 bg-[#1f233f] w-24 h-8 items-center justify-center rounded'>
              <Text className='text-white font-bold'>Skip Tutorial</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className='gap-4 p-6'>
        <View className='flex flex-row justify-between mb-8'>
          <View className='flex flex-row gap-4'>
            <TouchableOpacity>
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

          {step === 0 && <View className='absolute -bottom-12 bg-[#333a67] rounded p-2'>
            <View className='bg-white w-0 h-0 absolute -top-2' style={{ borderLeftWidth: 6, borderRightWidth: 6, borderBottomWidth: 12, borderStyle: 'solid', backgroundColor: 'transparent', borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: '#333a67' }} />
            <Text className='text-white'>Edit Profile</Text>
          </View>}
        </View>

        <View>
          <TouchableOpacity className='mx-4 mb-8'>
            <View className='p-4 bg-[#26252C] rounded-xl flex-row justify-between items-center z-50 border-2'>
              <Text className='font-medium text-white'>Add Task</Text>
              <View className='items-center justify-center p-2 bg-white rounded-full'>
                <FontAwesomeIcon icon={faAdd} color='#26252C' />
              </View>
            </View>
            {step === 1 && <View className='absolute -bottom-12 right-2 bg-[#333a67] rounded p-2'>
              <View className='bg-white w-0 h-0 absolute -top-2' style={{ borderLeftWidth: 6, borderRightWidth: 6, borderBottomWidth: 12, borderStyle: 'solid', backgroundColor: 'transparent', borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: '#333a67' }} />
              <Text className='text-white'>Add Task</Text>
            </View>}
          </TouchableOpacity>
        </View>

      </View>
      <View className='flex-1 rounded-t-3xl'>
        <LinearGradient start={{ x: 0.5, y: 0.2 }} end={{ x: 0.5, y: 1 }} colors={['#4838AF', '#1E1A37']} className='flex-1 rounded-t-3xl'>
          <View className='flex-1 gap-2 px-6 pt-6'>
            <Text className='text-2xl font-bold text-white mb-4'>Today's Task</Text>
          </View>
        </LinearGradient>
      </View>
    </View>
  )
}

const enhance = withObservables([], () => ({
  user: database.get('profiles').query().observeWithColumns(['username', 'profession', 'img_uri'])
}))

const EnhanceHomeScreen = enhance(TutorialHomeScreen);

export default EnhanceHomeScreen;
