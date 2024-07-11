import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { format, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns'
import { useDatabase } from '../context/DatabaseContext'

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const data = [
  {
    description: 'Change the date to view categories and task completion percentages for a specific day.',
  },
];

const TutorialCalendarScreen = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [weekDates, setWeekDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState(format(selectedDate, 'MMMM d, yyyy'));

  const { switchOfTutorial } = useDatabase();

  useEffect(() => {
    updateWeekDates(date);
    setSelectedDate(date)
  }, [date]);

  useEffect(() => {
    setFormattedDate(format(selectedDate, 'MMMM d, yyyy'))
  }, [selectedDate])

  const updateWeekDates = (selectedDate) => {
    const start = startOfWeek(selectedDate, { weekStartsOn: 0 });
    const end = endOfWeek(selectedDate, { weekStartsOn: 0 });
    const dates = eachDayOfInterval({ start, end });
    setWeekDates(dates);
  };

  const [step, setStep] = useState(0);

  const onSkipHandler = () => {
    navigation.navigate('Bottom Tab');
    switchOfTutorial();
  }


  return (
    <View className='flex-1 bg-black'>

      <View className='absolute left-0 right-0 z-10 flex-1 top-0 bottom-0'>
        <View className='p-4 bg-[#333a67] absolute bottom-8 left-4 right-4'>
          <Text className='text-white font-bold text-xl'>Task Page</Text>
          <Text>{data[step].description}</Text>
          <View className='flex-row gap-4 mt-2'>
            <TouchableOpacity onPress={onSkipHandler} className='mt-2 bg-[#1f233f] w-28 h-8 items-center justify-center rounded'>
              <Text className='text-white font-bold'>Finish Tutorial</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <LinearGradient start={{ x: 0.5, y: 0.2 }} end={{ x: 0.5, y: 1 }} colors={['#4838AF', '#1E1A37']} className='rounded-b-[32px]'>

        <View className='px-8 my-6'>

          <View className='flex flex-row justify-between'>
            <Text className='text-lg text-white'>Calendar</Text>
            <TouchableOpacity>
              <FontAwesomeIcon icon={faCalendar} size={24} color='#ffffff' />
            </TouchableOpacity>

            <View className='absolute -bottom-12 bg-[#333a67] rounded p-2 right-0'>
              <View className='bg-white w-0 h-0 absolute -top-2 right-0' style={{ borderLeftWidth: 6, borderRightWidth: 6, borderBottomWidth: 12, borderStyle: 'solid', backgroundColor: 'transparent', borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: '#333a67' }} />
              <Text className='text-white'>Change Date</Text>
            </View>

          </View>

          <Text className='mt-6 text-xl font-bold text-center text-white'>{formattedDate}</Text>

          <View className='flex flex-row justify-around mt-8'>
            {weekDates.map((date, key) => <View key={key} className='items-center gap-2'>
              <Text className='items-center text-sm text-white'>{weekDays[key]}</Text>
              <TouchableOpacity>
                <View className={(date.getDate() === selectedDate.getDate()) ? `bg-[#968CCC] w-8 h-8 bg-opacity-30 rounded-full items-center justify-center` : 'mt-1'}>
                  <Text className='text-white'>{date.getDate()}</Text>
                </View>
              </TouchableOpacity>
            </View>)}
          </View>

        </View>

      </LinearGradient>

      <View className='flex-1 px-4 pt-2 mb-16'>

      </View>

    </View>
  )
}

export default TutorialCalendarScreen;