import { View, Text, Animated } from 'react-native'
import React, { useRef, useEffect } from 'react'
import LottieView from 'lottie-react-native'
import database from '../watermellon.config'

const SplashScreen = ({ navigation }) => {
    const imageOpacity = useRef(new Animated.Value(0)).current;

    const handleAnimationFinish = async () => {
        Animated.timing(imageOpacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start(async () => {
            const user = await database.get('profile').query().fetch();
            if (user.length === 0) {
                navigation.replace('Create Profile');
            } else {
                navigation.replace('Bottom Tab');
            }
        });
    };


    return (
        <View className='items-center flex-1 pt-24 bg-purple-100'>
            <LottieView onAnimationFinish={() => { handleAnimationFinish() }} autoPlay loop={false} style={{ width: 240, height: 240 }} source={require('../assets/splashScreenAnim.json')} />
            <Animated.Text
                className='mx-4 mt-12 text-5xl font-[900] text-center text-[#4938B5]'
                style={{ opacity: imageOpacity, marginTop: 48 }}
            >
                Taskify
            </Animated.Text>
        </View>
    )
}

export default SplashScreen