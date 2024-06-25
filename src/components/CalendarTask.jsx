import { View, Text } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { format } from 'date-fns';
import { markAllASCompleted } from '../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { onMarkAllTaskCompleted } from '../store/category/categorySlice';

const CalendarTask = ({ categoryDetail }) => {
    const { name, startTime, endTime, numOfTaskLeft, numOfTaskCompleted, description } = categoryDetail;
    const isComplete = (numOfTaskLeft == 0);
    let formattedEndTime = '';
    let formattedStartTime = '';
    if (startTime) {
        formattedStartTime = formattedStartTime = format(startTime, 'hh:mm');
    } if (endTime) {
        formattedEndTime = format(endTime, 'hh:mm');
    }
    const percentageOfTtaskCompleted = (numOfTaskCompleted / (numOfTaskCompleted + numOfTaskLeft)) * 100;
    const categories = useSelector(state => state.categories);
    const dispatch = useDispatch();

    const onMarkAllCompleted = () => {
        const date = format(startTime, 'MMMM d, yyyy')
        dispatch(onMarkAllTaskCompleted(markAllASCompleted(categories, name, date)));
    }

    return (
        <LinearGradient start={{ x: 0, y: 0.5 }} end={{ x: 1.8, y: 0.5 }} colors={['#93A8F1', '#ffffff']} className='rounded-[20px] min-h-[120px] my-1 px-4 py-2'>
            <View className='flex-row justify-start gap-2'>
                {!isComplete && <View className='bg-[#4938B5] py-1 px-4 rounded-xl'>
                    <Text className='font-bold text-white'>{description.length > 15 ? description.slice(0, 15) + '...' : description}</Text>
                </View>}
                <View className='px-4 py-1 bg-white rounded-xl'>
                    <Text className='font-bold text-[#4938B5]'>{numOfTaskLeft} Left</Text>
                </View>
            </View>
            <Text className='mt-3 text-base font-bold text-white'>{name}</Text>
            <View className='flex-row items-center gap-2'>
                {!isComplete && <Text className='font-medium text-white'>{formattedStartTime} - {formattedEndTime}</Text>}
                <View className='w-[120px] h-2 bg-white rounded-full'>
                    <View className='bg-[#4938B5] h-2 rounded-full' style={{ width: `${percentageOfTtaskCompleted}%` }} />
                </View>
                <Text className='text-white'>{percentageOfTtaskCompleted.toFixed(0)}%</Text>
            </View>
        </LinearGradient>
    )
}

export default CalendarTask



/**
 * category name
 * next task time
 * number of task left
 * number task completed
 */

/*
{
    name,
    startTime,
    endTime,
    numOfTaskLeft,
    numOfTaskCompleted
}
*/