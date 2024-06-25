import { View, Text } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'

const SplashScreen = () => {
    return (
        <View className='items-center flex-1 pt-24'>
            <LottieView autoPlay loop style={{ width: 240, height: 240 }} source={require('../assets/splashScreenBg.json')} />
            <Text className='mx-4 mt-12 text-3xl font-bold text-center text-white'>Time Manager</Text>
        </View>
    )
}

export default SplashScreen