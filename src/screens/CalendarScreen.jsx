import { View, Text, Touchable, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAdd, faCalendar } from '@fortawesome/free-solid-svg-icons'
import CalendarTaskContainer from '../components/CalendarTaskContainer'
import DatePicker from 'react-native-date-picker'
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isDate } from 'date-fns'
import AddTaskModal from '../components/AddTaskModal'

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarScreen = () => {
    const [date, setDate] = useState(new Date());
    const [openDatePicker, setOpenDatePicker] = useState(false);
    const [weekDates, setWeekDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [formattedDate, setFormattedDate] = useState(format(selectedDate, 'MMMM d, yyyy'));
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        updateWeekDates(date);
        setSelectedDate(date)
    }, [date]);

    useEffect(() => {
        setFormattedDate(format(selectedDate, 'MMMM d, yyyy'))
        // console.log(selectedDate);
    }, [selectedDate])

    const updateWeekDates = (selectedDate) => {
        const start = startOfWeek(selectedDate, { weekStartsOn: 0 });
        const end = endOfWeek(selectedDate, { weekStartsOn: 0 });
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
                            mode="date"
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
            <AddTaskModal date={selectedDate} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            <CalendarTaskContainer date={selectedDate} />
            <TouchableOpacity onPress={() => setIsModalOpen(true)} className='absolute bottom-0 left-0 right-0 mx-4 mb-3'>
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

export default CalendarScreen;