import { View, Text, Animated } from 'react-native';
import React, { useRef, useEffect } from 'react';
import LottieView from 'lottie-react-native';

const SplashScreen = () => {
    const textOpacity = useRef(new Animated.Value(0)).current;
    const lottieRef = useRef(null);

    useEffect(() => {
        lottieRef.current?.play();
    }, []);

    const handleAnimationFinish = () => {
        // Animated.timing(textOpacity, {
        //     toValue: 1,
        //     duration: 1000,
        //     useNativeDriver: true,
        // }).start();
    };

    return (
        <View className='items-center flex-1 pt-24 bg-black'>
            <LottieView
                loop={false}
                ref={lottieRef}
                style={{ width: 240, height: 240 }}
                source={require('../assets/splashScreenAnim.json')}
                speed={1}
                onAnimationFinish={() => { }}
            />
            <Animated.Text
                className='mx-4 mt-12 text-3xl font-bold text-center text-[#4938B5]'
                style={{ opacity: textOpacity }}
            >
                Time Manager
            </Animated.Text>
        </View>
    );
};

export default SplashScreen;
