import React, { useState, useEffect, useRef, useMemo } from 'react';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { withObservables } from '@nozbe/watermelondb/react';
import database from '../watermellon.config';
import placeholderImage from '../assets/placeholder-image.png';
import ScheduleList from '../components/ScheduleList';
import ScheduleForm from '../components/ScheduleForm';

const ScheduleScreen = ({ navigation, user }) => {
  const [schedule, setSchedule] = useState(null);
  const [userData, setUserData] = useState(user[0]);
  const bottomSheetRef = useRef(null);
  const snapShot = useMemo(() => ['80%'], []);

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
      <ScheduleList schedule={schedule} setSchedule={setSchedule} bottomSheetRef={bottomSheetRef} />
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapShot}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
      >
        <View className='flex-1 bg-white'>
          <ScheduleForm schedule={schedule} setSchedule={setSchedule} bottomSheetRef={bottomSheetRef} />
        </View>
      </BottomSheet>
    </View>
  )
}

const renderBackdrop = (backdropProps) => (
  <BottomSheetBackdrop
    {...backdropProps}
    enableTouchThrough={false} // Ensure touch through is disabled for backdrop interaction
    disappearsOnIndex={-1}
    appearsOnIndex={0}
  />
);

const enhance = withObservables([], () => ({
  user: database.get('profile').query().observeWithColumns(['name', 'profession', 'img_uri', 'phone_number', 'dob']),
}));

const EnhanceScheduleScreen = enhance(ScheduleScreen);

export default EnhanceScheduleScreen;

