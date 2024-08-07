import { View, Text, TouchableOpacity, ScrollView, LayoutAnimation, UIManager, Platform } from 'react-native';
import React, { useEffect, useState, useMemo } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAdd, faAngleLeft, faAngleRight, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { format, eachDayOfInterval, startOfMonth, endOfMonth, getDay, startOfYear } from 'date-fns';
import { withObservables } from '@nozbe/watermelondb/react';
import database from '../watermellon.config';
import { Q } from '@nozbe/watermelondb';
import { map } from '@nozbe/watermelondb/utils/rx';

if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const todayDate = new Date();
todayDate.setHours(0, 0, 0, 0);

const CalendarEvents = ({ selectedDate, setSelectedDate, bottomSheetRef, events, eventDates, setEvent }) => {
    const [isMonthView, setIsMonthView] = useState(false);
    const [weekDates, setWeekDates] = useState([]);
    const [monthDates, setMonthDates] = useState([]);
    const [formattedDate, setFormattedDate] = useState(format(selectedDate, 'MMMM d, yyyy'));

    const minDate = useMemo(() => {
        const startOfYearDate = startOfYear(new Date());
        const minEventDate = new Date(Math.min(...eventDates));
        return startOfYearDate < minEventDate ? startOfYearDate : minEventDate;
    }, [eventDates]);

    useEffect(() => {
        updateWeekDates(selectedDate);
        updateMonthDates(selectedDate);
        setFormattedDate(format(selectedDate, 'MMMM d, yyyy'));
    }, [selectedDate]);

    const toggleView = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsMonthView(!isMonthView);
    };

    const updateWeekDates = (date) => {
        date.setHours(0, 0, 0, 0);
        const startOfWeek = date.getDate() - date.getDay();
        const weekDates = [];
        for (let i = 0; i < 7; i++) {
            const newDate = new Date(date);
            newDate.setDate(startOfWeek + i);
            const dateObj = {
                date: newDate,
                hasEvent: eventDates.includes(newDate.getTime())
            };
            weekDates.push(dateObj);
        }
        setWeekDates(weekDates);
    };

    const updateMonthDates = (date) => {
        date.setHours(0, 0, 0, 0);
        const startOfMonthDate = startOfMonth(date);
        const endOfMonthDate = endOfMonth(date);
        const allDates = eachDayOfInterval({ start: startOfMonthDate, end: endOfMonthDate });
        const daysOfWeek = Array.from({ length: 7 }, () => []);

        const eventDatesSet = new Set(eventDates);

        allDates.forEach(currentDate => {
            const dayIndex = getDay(currentDate);
            const dateObj = {
                date: currentDate,
                hasEvent: eventDatesSet.has(currentDate.getTime())
            };
            daysOfWeek[dayIndex].push(dateObj);
        });

        const firstDayOfMonth = getDay(startOfMonthDate);
        for (let i = 0; i < firstDayOfMonth; i++) {
            daysOfWeek[i].unshift({ date: null, hasEvent: false });
        }

        const maxLength = Math.max(...daysOfWeek.map(days => days.length));
        daysOfWeek.forEach(dayArray => {
            while (dayArray.length < maxLength) {
                dayArray.push({ date: null, hasEvent: false });
            }
        });

        setMonthDates(daysOfWeek);
    };

    const handlePreviousMonth = () => {
        const newDate = new Date(selectedDate);
        newDate.setMonth(selectedDate.getMonth() - 1);
        if (newDate < minDate) {
            newDate.setMonth(minDate.getMonth());
            newDate.setFullYear(minDate.getFullYear());
        }
        setSelectedDate(newDate);
    };

    const handleNextMonth = () => {
        const newDate = new Date(selectedDate);
        newDate.setMonth(selectedDate.getMonth() + 1);
        setSelectedDate(newDate);
    };

    const openBottomSheet = () => {
        setEvent(null);
        bottomSheetRef.current?.expand();
    };

    return (
        <View className='flex-1'>
            <LinearGradient start={{ x: 0.5, y: 0.2 }} end={{ x: 0.5, y: 1 }} colors={['#26252C', '#1b1a1a']} className='rounded-b-[32px]' >
                <View className='px-6 my-6'>
                    <View className='flex flex-row justify-between'>
                        <Text className='text-lg text-white'>Calendar</Text>
                        <TouchableOpacity onPress={toggleView}>
                            <FontAwesomeIcon icon={faCalendar} size={24} color='#ffffff' />
                        </TouchableOpacity>
                    </View>
                    <View className='flex-row items-center justify-center gap-2 mt-4'>
                        <TouchableOpacity onPress={handlePreviousMonth} className={`${isMonthView ? '' : 'hidden'}`} >
                            <FontAwesomeIcon size={20} icon={faAngleLeft} color='#ffffff' />
                        </TouchableOpacity>
                        <Text className='mt-6 text-xl font-bold text-center text-white'>{formattedDate}</Text>
                        <TouchableOpacity onPress={handleNextMonth} className={`${isMonthView ? '' : 'hidden'}`}>
                            <FontAwesomeIcon size={20} icon={faAngleRight} color='#ffffff' />
                        </TouchableOpacity>
                    </View>
                    <View className='flex flex-row justify-around mt-8'>
                        {weekDays.map((day, key) => (
                            <View key={key} className='items-center justify-center w-8'>
                                <Text className='items-center text-sm text-white'>{day}</Text>
                            </View>
                        ))}
                    </View>
                    <View>
                        {isMonthView ? <RenderMonthView monthDates={monthDates} setSelectedDate={setSelectedDate} selectedDate={selectedDate} /> : <RenderWeekView weekDates={weekDates} setSelectedDate={setSelectedDate} selectedDate={selectedDate} />}
                    </View>
                </View>
            </LinearGradient>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View className='gap-2 p-3'>
                    {events.map((event, key) => (
                        <TouchableOpacity
                            onPress={() => {
                                setEvent(event);
                                bottomSheetRef.current?.expand();
                            }}
                            activeOpacity={0.7}
                            key={key}
                        >
                            <View className='bg-[#26252C] p-6 rounded-[22px]'>
                                <Text className='text-lg font-bold text-white'>{event.name}</Text>
                                <Text className='text-sm text-white'>{event.description}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            {todayDate.getTime() <= selectedDate.getTime() && <TouchableOpacity activeOpacity={0.7} onPress={openBottomSheet}>
                <View className='bg-[#26252C] mx-3 mb-3 p-6 flex-row justify-between items-center rounded-[18px]'>
                    <Text className='text-lg text-white'>Add Event</Text>
                    <View className='p-2 bg-white rounded-full'>
                        <FontAwesomeIcon icon={faAdd} size={18} color='#26252C' />
                    </View>
                </View>
            </TouchableOpacity>}
        </View>
    );
};

const RenderWeekView = ({ weekDates, setSelectedDate, selectedDate }) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    return (
        <View className='flex-row items-center justify-around'>
            {weekDates.map((weekDate, key) => (
                <TouchableOpacity key={key} onPress={() => setSelectedDate(weekDate.date)}>
                    <View className={`mt-1 w-8 h-8 items-center justify-center rounded-full ${currentDate.getTime() == weekDate.date.getTime() ? 'bg-[#275890]' : selectedDate.getTime() === weekDate.date.getTime() ? 'bg-[#4A465F] border-[1px] border-[#BFB4B4] ' : weekDate.hasEvent ? 'bg-[#564A94]' : ''}`}>
                        <Text className='text-sm text-white'>{weekDate.date.getDate()}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const RenderMonthView = ({ monthDates, setSelectedDate, selectedDate }) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return (
        <View className='flex-row justify-around mt-3'>
            {monthDates.map((week, weekIndex) => (
                <View key={weekIndex} className='flex-1'>
                    {week.map((day, dayIndex) => (
                        <TouchableOpacity key={dayIndex} onPress={() => day.date && setSelectedDate(day.date)} disabled={!day.date}>
                            <View className={`mt-1 w-8 h-8 items-center justify-center rounded-full ${day.date?.getTime() === currentDate.getTime() ? 'bg-[#275890]' : selectedDate.getTime() === day.date?.getTime() ? 'bg-[#4A465F] border-[1px] border-[#BFB4B4]' : day.hasEvent ? 'bg-[#564A94]' : ''}`}>
                                <Text className='text-sm text-white'>{day.date ? day.date.getDate() : ''}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            ))}
        </View>
    );
};

const enhance = withObservables(["selectedDate"], ({ selectedDate }) => {
    const queryDate = selectedDate instanceof Date ? selectedDate : new Date(selectedDate);
    queryDate.setHours(0, 0, 0, 0);
    return ({
        events: database.get('events').query(
            Q.where('date', queryDate.getTime())
        ).observeWithColumns(['name', 'description', 'date']),
        eventDates: database.get('events').query().observeWithColumns(['name', 'description', 'date'])
            .pipe(
                map(events => events.map(event => {
                    const eventDate = new Date(event.date);
                    return eventDate.getTime();
                })))
    })
});

const EnhanceCalendarEvents = enhance(CalendarEvents);
export default EnhanceCalendarEvents;