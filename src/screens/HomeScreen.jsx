import { View, Text, Image, TouchableOpacity, Animated, Button } from 'react-native';
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { withObservables } from '@nozbe/watermelondb/react';
import database from '../watermellon.config';
import placeholderImage from '../assets/placeholder-image.png';
import BottomSheet from '@gorhom/bottom-sheet';

const HomeScreen = ({ navigation, user }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userData, setUserData] = useState(user[0]);
    const bottomSheetRef = useRef(null);
    const snapShot = useMemo(() => ['25%', '50%', '80%'], []);

    useEffect(() => {
        if (user.length > 0) {
            setUserData(user[0]);
        }
    }, [user]);

    return (
        <View className='flex-1 bg-black'>
            <View className='h-[20%] justify-center '>
                <View className='flex-row items-center gap-3 px-6'>
                    <TouchableOpacity onPress={() => navigation.navigate('Display Profile Screen')}>
                        {userData.imageUri ? <Image className='w-12 h-12 rounded-full' source={{ uri: userData.imageUri }} /> : <Image className='w-10 h-10 rounded-full' source={placeholderImage} />}
                    </TouchableOpacity>
                    <Text className='text-lg font-semibold text-white'>Welcome {userData.name}!</Text>
                </View>
            </View>
            <View className='flex-1 bg-white rounded-t-3xl' />
            <BottomSheet
                ref={bottomSheetRef}
                index={0}
                snapPoints={snapShot}
                // onChange={(index) => console.log('snapped to', index)}
            >
                <View className='flex-1 bg-black'>

                </View>
            </BottomSheet>
        </View>
    );
};

const enhance = withObservables([], () => ({
    user: database.get('profile').query().observeWithColumns(['name', 'profession', 'img_uri', 'phone_number', 'dob']),
}));

const EnhanceHomeScreen = enhance(HomeScreen);

export default EnhanceHomeScreen;
