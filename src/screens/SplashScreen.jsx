import {View, Text, Animated} from 'react-native';
import React, {useRef, useEffect} from 'react';
import LottieView from 'lottie-react-native';
import database from '../watermellon.config';
import logoImg from '../assets/logo.png';

const SplashScreen = ({navigation}) => {
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


  useEffect(() => {
    handleAnimationFinish();
  }, []);

  return (
    <View className="items-center justify-center flex-1 bg-black">
      <Animated.Image
        resizeMode="contain"
        className=""
        style={{opacity: imageOpacity}}
        source={logoImg}
      />
    </View>
  );
};

export default SplashScreen;
