import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import LottieView from 'lottie-react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import database from '../watermellon.config';
import { useDatabase } from '../context/DatabaseContext';

const OnboardingScreen = ({ navigation }) => {
  const { addNewCategory } = useDatabase();
  useEffect(() => {
    const createInitialData = async () => {
      const categories = await database.get('categories').query().fetch();
      if (categories.length === 0) {
        addNewCategory("Work", "Tasks related to your job or professional life.", 5);
        addNewCategory("Personal", "Personal tasks and errands.", 4);
        addNewCategory("Health", "Tasks related to maintaining physical and mental health.", 5);
        addNewCategory("Home", "Household chores and maintenance tasks.", 3);
        addNewCategory("Finance", "Tasks related to managing finances, bills, and budgeting.", 4);
        addNewCategory("Education", "Tasks related to learning and self-improvement.", 3);
        addNewCategory("Shopping", "Shopping lists and tasks.", 2);
        addNewCategory("Social", "Tasks related to social activities and events.", 2);
        addNewCategory("Travel", "Planning and organizing trips and travels.", 3);
        addNewCategory("Miscellaneous", "Other tasks that don't fit into specific categories.", 1);

      }
    }
    createInitialData();

  }, [])

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