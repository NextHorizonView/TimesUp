import { View, Text, Image } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const OnboardingScreen = ({ navigation }) => {

  const onPressHandler = () => {
    navigation.replace('Bottom Tab')
  }

  return (
    <View className='items-center justify-between flex-1 py-24 bg-black'>
      <View className=''>
        <View className=''>
          <LottieView autoPlay loop style={{ width: 240, height: 240 }} source={require('../assets/success.json')} />
        </View>
        <Text className='text-[#4938B5] text-xl text-center font-bold'>Success</Text>
      </View>
      <View className='w-56'>
        <Text className='text-lg font-bold text-center'>Congratulations!! your account was successfully created
        </Text>
      </View>
      <TouchableOpacity onPress={onPressHandler} className='bg-[#4938B5] p-4 mb-8 rounded w-48'>
        <Text className='text-center'>Continue</Text>
      </TouchableOpacity>
    </View>
  )
}

export default OnboardingScreen