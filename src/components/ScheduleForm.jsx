import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DateInputField, TextInputField, TimeInputField } from './FormFields';
import { TouchableOpacity } from 'react-native-gesture-handler';
import database from '../watermellon.config';
import { cancelNotification, scheduleNotification, scheduleTaskNotification, updateScheduleNotification, updateTaskNotification } from '../utils/notification';

const ScheduleForm = ({ schedule, setSchedule, bottomSheetRef }) => {
    const [name, setName] = useState('');
    const [isNameValid, setIsNameValid] = useState(true);
    const [date, setDate] = useState(new Date());
    const [isDateValid, setIsDateValid] = useState(true);
    const [startTime, setStartTime] = useState('');
    const [isStartTimeValid, setIsStartTimeValid] = useState(true);
    const [endTime, setEndTime] = useState('');
    const [isEndTimeValid, setIsEndTimeValid] = useState(true);

    useEffect(() => {
        if (schedule) {
            setName(schedule.name);
            setDate(schedule.date);
            setStartTime(schedule.startTime);
            setEndTime(schedule.endTime);
        } else {
            const date = new Date();
            setName('');
            setDate(date);
            setStartTime(new Date());
            setEndTime(new Date(date.getTime() + 60 * 60 * 1000));
        }
    }, [schedule]);

    useEffect(() => {
        if (startTime && startTime >= endTime) {
            setEndTime(new Date(startTime.getTime() + 60 * 60 * 1000));
        }
    }, [startTime]);

    useEffect(() => {
        if (endTime && endTime <= startTime) {
            setStartTime(new Date(endTime.getTime() - 60 * 60 * 1000));
        }
    }, [endTime])

    const saveSchedule = async () => {
        if (name.length === 0) {
            setIsNameValid(false);
        } if (date.length === 0) {
            setIsDateValid(false);
        } if (startTime.length === 0) {
            setIsStartTimeValid(false);
        } if (endTime.length === 0) {
            setIsEndTimeValid(false);
        }
        if (name.length === 0 || date.length === 0 || startTime.length === 0 || endTime.length === 0) {
            return;
        }

        await database.write(async () => {
            await database.get('schedule').create(schedule => {
                schedule.name = name;
                schedule.date = date;
                schedule.startTime = startTime;
                schedule.endTime = endTime;
            })
                .then((schedule) => {
                    bottomSheetRef.current?.close();
                    setName('');
                    setIsNameValid(true);
                    console.log(schedule.startTime.getTime());
                    scheduleTaskNotification(schedule.id, `Schedule: ${name} starts soon`, schedule.startTime);
                })
                .catch(err => console.log(err));
        });
    }

    const updateSchedule = async () => {
        if (name.length === 0) {
            setIsNameValid(false);
        } if (date.length === 0) {
            setIsDateValid(false);
        } if (startTime.length === 0) {
            setIsStartTimeValid(false);
        } if (endTime.length === 0) {
            setIsEndTimeValid(false);
        }
        if (name.length === 0 || date.length === 0 || startTime.length === 0 || endTime.length === 0) {
            return;
        }

        await database.write(async () => {
            await schedule.update(schedule => {
                schedule.name = name;
                schedule.date = date;
                schedule.startTime = startTime;
                schedule.endTime = endTime;
            })
                .then((schedule) => {
                    bottomSheetRef.current?.close();
                    updateTaskNotification(schedule.id, `Schedule: ${name} starts soon`, schedule.startTime);
                })
                .catch(err => console.log(err));
        });
    }

    const deleteSchedule = async () => {
        await database.write(async () => {
            await schedule.destroyPermanently()
                .then(() => {
                    bottomSheetRef.current?.close();
                    setName('');
                    setDate(new Date());
                    setStartTime('');
                    setEndTime('');
                    setIsNameValid(true);
                    cancelNotification(`${schedule.id}-5min`);
                    cancelNotification(`${schedule.id}-30min`);

                })
                .catch(err => console.log(err));
        });
    }

    return (
        <View className='flex-1 p-7'>
            <Text className='text-lg font-bold text-black'>Schedule</Text>
            <View className='justify-between flex-1 gap-4 mt-4'>
                <View className='gap-2'>
                    <TextInputField name='Schedule Name' value={name} setValue={setName} isValid={isNameValid} setIsValid={setIsNameValid} />
                    <DateInputField name='Schedule Date' value={date} setValue={setDate} isValid={isDateValid} setIsValid={setIsDateValid} minDate={new Date()} />
                    <TimeInputField name='Start Time' value={startTime} setValue={setStartTime} isValid={isStartTimeValid} setIsValid={setIsStartTimeValid} />
                    <TimeInputField minTime={startTime} name='End Time' value={endTime} setValue={setEndTime} isValid={isEndTimeValid} setIsValid={setIsEndTimeValid} />
                </View>
            </View>
            {schedule ?
                <View className='gap-2'>
                    <TouchableOpacity activeOpacity={0.7} onPress={updateSchedule}>
                        <View className='items-center justify-center p-3 bg-[#424242] rounded-xl'>
                            <Text className='text-lg font-bold text-white'>Update</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} onPress={deleteSchedule}>
                        <View className='items-center justify-center p-3 bg-red-500 rounded-xl'>
                            <Text className='text-lg font-bold text-white'>Delete</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                :
                <TouchableOpacity activeOpacity={0.7} onPress={saveSchedule}>
                    <View className='items-center w-full justify-center p-3 bg-[#424242] rounded-xl'>
                        <Text className='text-lg font-bold text-white'>Save</Text>
                    </View>
                </TouchableOpacity>
            }
        </View>
    )
}

export default ScheduleForm