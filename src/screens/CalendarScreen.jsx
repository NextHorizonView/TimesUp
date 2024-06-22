import { View, Text, Touchable, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAdd, faCalendar } from '@fortawesome/free-solid-svg-icons'
import CalendarTask from '../components/CalendarTask'
import DatePicker from 'react-native-date-picker'
import { format, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns'

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const tasks = [
    {
        name: 'English Class Homework',
        description: 'Complete Homework',
        priority: 4,
        numOfCompletedTask: 2,
        goals: [
            'Solve practice set',
            'Sleep',
        ]
    },
    {
        name: 'Maths Class Homework',
        description: 'Complete Math Homework',
        priority: 3,
        numOfCompletedTask: 2,
        goals: [
            'Solve practice set',
            'Sleep',
            'Eat'
        ]
    },
    {
        name: 'Science Class Homework',
        description: 'Complete Homework',
        priority: 1,
        numOfCompletedTask: 2,
        goals: [
            'Solve practice set',
            'Sleep',
            'Gym'
        ]
    },
    {
        name: 'Geography Class Homework',
        description: 'Complete Homework',
        priority: 5,
        numOfCompletedTask: 2,
        goals: [
            'Solve practice set',
            'Sleep',
            'Cycling',
            'Exercise'
        ]
    },
]

const CalendarScreen = () => {
    const [date, setDate] = useState(new Date());
    const [openDatePicker, setOpenDatePicker] = useState(false);
    const [weekDates, setWeekDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [formattedDate, setFormattedDate] = useState(format(selectedDate, 'MMMM d, yyyy'));

    useEffect(() => {
        updateWeekDates(date);
        setSelectedDate(date)
    }, [date]);

    useEffect(() => {
        setFormattedDate(format(selectedDate, 'MMMM d, yyyy'))
    }, [selectedDate])

    const updateWeekDates = (selectedDate) => {
        const start = startOfWeek(selectedDate, { weekStartsOn: 0 }); // Start of the week (Sunday)
        const end = endOfWeek(selectedDate, { weekStartsOn: 0 }); // End of the week (Saturday)
        const dates = eachDayOfInterval({ start, end });
        setWeekDates(dates);
    };


    return (
        <View className='flex-1 bg-black'>
            <LinearGradient start={{ x: 0.5, y: 0.2 }} end={{ x: 0.5, y: 1 }} colors={['#4838AF', '#1E1A37']} className='rounded-b-[32px]' >
                <View className='px-8 my-6'>
                    <View className='flex flex-row justify-between'>
                        <Text className='text-lg text-white'>Calendar</Text>
                        <TouchableOpacity onPress={() => { setOpenDatePicker(true) }}>
                            <FontAwesomeIcon icon={faCalendar} size={24} color='#ffffff' />
                        </TouchableOpacity>
                        <DatePicker
                            modal
                            open={openDatePicker}
                            date={date}
                            onConfirm={(selectedDate) => {
                                setOpenDatePicker(false);
                                setDate(selectedDate);
                            }}
                            onCancel={() => {
                                setOpenDatePicker(false);
                            }}
                        />
                    </View>
                    <Text className='mt-6 text-xl font-bold text-center text-white'>{formattedDate}</Text>
                    <View className='flex flex-row justify-around mt-8'>
                        {weekDates.map((date, key) => <View key={key} className='items-center gap-2'>
                            <Text className='items-center text-sm text-white'>{weekDays[key]}</Text>
                            <TouchableOpacity onPress={() => {
                                setSelectedDate(date)
                            }}
                            >
                                <View className={(date.getDate() === selectedDate.getDate()) ? `bg-[#968CCC] w-8 h-8 bg-opacity-30 rounded-full items-center justify-center` : 'mt-1'}>
                                    <Text className='text-white'>{date.getDate()}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>)}
                    </View>
                </View>
            </LinearGradient>
            <ScrollView className='px-8 mt-6 mb-8' showsVerticalScrollIndicator={false} >
                {tasks.map((task, key) => <TouchableOpacity key={key}>
                    <CalendarTask goals={task.goals} name={task.name} numOfCompletedTask={task.numOfCompletedTask} />
                </TouchableOpacity>)}
            </ScrollView>
            <TouchableOpacity className='mx-4 mb-3'>
                <View className='p-4 bg-[#26252C] rounded-xl flex-row justify-between items-center'>
                    <Text className='font-medium text-white'>Add Task</Text>
                    <View className='items-center justify-center p-2 bg-white rounded-full'>
                        <FontAwesomeIcon icon={faAdd} color='#26252C' />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default CalendarScreen