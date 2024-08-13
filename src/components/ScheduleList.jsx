import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { withObservables } from '@nozbe/watermelondb/react'
import database from '../watermellon.config'
import { Q } from '@nozbe/watermelondb'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAdd } from '@fortawesome/free-solid-svg-icons'
import { format } from 'date-fns'

const ScheduleList = ({ setSchedule, bottomSheetRef, schedules }) => {
    const openBottomSheet = () => {
        setSchedule(null);
        bottomSheetRef.current?.expand();
    };
    function formatTime(date) {
        return date.toLocaleTimeString([], {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
    }
    const getStartOfToday = () => {
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        return now;
    };

    // Delete schedules before today
    const deleteSchedulesBeforeToday = async () => {
        const startOfToday = getStartOfToday();

        const schedulesToDelete = await database
            .get('schedule')
            .query(
                Q.where('date', Q.lt(startOfToday.getTime()))
            )
            .fetch();

        if (schedulesToDelete.length > 0) {
            await database.write(async () => {
                await database.batch(
                    ...schedulesToDelete.map(schedule => schedule.prepareDestroyPermanently())
                );
            });
        }
    };

    useEffect(() => {
        deleteSchedulesBeforeToday();
    }, [schedules]);

    return (
        <View className='flex-1 pt-6 bg-white px-7 rounded-t-2xl'>
            <Text className='text-lg font-bold text-black'>Your Schedule</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
                {
                    schedules.map(schedule => (
                        <TouchableOpacity key={schedule.id} onPress={() => {
                            setSchedule(schedule);
                            bottomSheetRef.current?.expand();
                        }}>
                            <View className='bg-[#F2F2F2] mb-3 p-6 rounded-[28px] items-start border-b-2 border-[#DBBEBE]'>
                                <Text className='text-lg text-[#464242] font-semibold'>{schedule.name}</Text>
                                <Text className='text-sm text-[#8C8080]'>{format(schedule.date, 'MMMM d, yyyy')}</Text>
                                <Text className='text-sm text-[#8C8080]'>{formatTime(schedule.startTime)} - {formatTime(schedule.endTime)}</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
            <TouchableOpacity className='mt-4' onPress={openBottomSheet} activeOpacity={0.7}>
                <View className='bg-[#26252C] mb-3 p-6 flex-row justify-between items-center rounded-[18px]'>
                    <Text className='text-lg text-white'>Add Schedule</Text>
                    <View className='p-2 bg-white rounded-full'>
                        <FontAwesomeIcon icon={faAdd} size={18} color='#26252C' />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const enhance = withObservables([], () => {
    return {
        schedules: database.get('schedule').query(
            Q.sortBy('date', Q.asc),
            Q.sortBy('start_time', Q.asc),
            Q.sortBy('end_time', Q.asc),
        ).observeWithColumns(['name', 'date', 'start_time', 'end_time'])
    }
});

const EnhanceScheduleEvents = enhance(ScheduleList);
export default EnhanceScheduleEvents;