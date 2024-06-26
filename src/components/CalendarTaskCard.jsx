import { View, Text } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { format } from 'date-fns'
import { withObservables } from '@nozbe/watermelondb/react'
import database from '../watermellon.config'
import { Q } from '@nozbe/watermelondb'
import { switchMap } from '@nozbe/watermelondb/utils/rx'

const CalendarTaskCard = ({ categoryDetails: { categoryName, numOfTaskLeft, totalTask, nextTaskDesc, nextTaskDate, nextTaskDueDate }, isLast }) => {
    const isComplete = numOfTaskLeft == 0;
    const percentageOfTtaskCompleted = ((totalTask - numOfTaskLeft) / totalTask).toFixed(0) * 100;
    console.log(isLast);
    return (
        <View>
            <LinearGradient start={{ x: 0, y: 0.5 }} end={{ x: 1.8, y: 0.5 }} colors={[!isComplete ? '#93A8F1' : '#4fc049', '#ffffff']} className='rounded-[20px] min-h-[120px] my-1 px-4 py-2' style={{ marginBottom: isLast && 30 }}>
                <View className='flex-row justify-start gap-2'>
                    {!isComplete && <View className='bg-[#4938B5] py-1 px-4 rounded-xl'>
                        <Text className='font-bold text-white'>{nextTaskDesc > 15 ? nextTaskDesc.slice(0, 15) + '...' : nextTaskDesc}</Text>
                    </View>}
                    <View className='px-4 py-1 bg-white rounded-xl'>
                        <Text className='font-bold text-[#4938B5]'>{numOfTaskLeft} Left</Text>
                    </View>
                </View>
                <Text className='mt-3 text-base font-bold text-white'>{categoryName}</Text>
                <View className='gap-2'>
                    {!isComplete && <Text className='font-medium text-white'>{format(nextTaskDate, 'MMMM d, yyyy')} - {format(nextTaskDueDate, 'MMMM d, yyyy')}</Text>}
                    <View className='flex-row items-center gap-2'>
                        <View className='w-[120px] h-2 bg-white rounded-full'>
                            <View className='bg-[#4938B5] h-2 rounded-full' style={{ width: `${percentageOfTtaskCompleted}%` }} />
                        </View>
                        <Text className='text-white'>{percentageOfTtaskCompleted}%</Text>
                    </View>
                </View>
            </LinearGradient>
        </View>
    )
}

const getStartOfDayLocal = (dateString) => {
    const date = new Date(dateString);
    date.setHours(0, 0, 0, 0); // set to the start of the day in local time
    return date.getTime();
};

const getEndOfDayLocal = (dateString) => {
    const date = new Date(dateString);
    date.setHours(23, 59, 59, 999); // set to the end of the day in local time
    return date.getTime();
};


const enhance = withObservables(['category', 'date'], ({ category, date }) => {
    const startOfDay = getStartOfDayLocal(date);
    const endOfDay = getEndOfDayLocal(date);

    const tasksObservable = database.collections.get('tasks').query(
        Q.and(
            Q.where('category_id', category.id),
            Q.where('start_date', Q.gte(startOfDay)),
            Q.where('start_date', Q.lte(endOfDay))
        )
    ).observeWithColumns(['is_completed']);

    return {
        categoryDetails: tasksObservable.pipe(
            switchMap(async tasksForTheDay => {
                let earliestTask = null;
                tasksForTheDay.forEach(task => {
                    if (!task.isCompleted) {
                        if (earliestTask === null || task.startDate < earliestTask.startDate) {
                            earliestTask = task;
                        }
                    }
                });

                const earliestTaskDetails = earliestTask ? {
                    nextTaskDesc: earliestTask.body,
                    nextTaskDate: earliestTask.startDate,
                    nextTaskDueDate: earliestTask.dueDate,
                } : {
                    nextTask: null,
                    nextTaskDate: null,
                    nextTaskDueDate: null,
                };

                return {
                    categoryName: category.name,
                    numOfTaskLeft: tasksForTheDay.reduce((acc, task) => !task.isCompleted ? acc + 1 : acc, 0),
                    totalTask: tasksForTheDay.length,
                    ...earliestTaskDetails,
                };
            })
        ),
    };
});

const EnhancedCalendar = enhance(CalendarTaskCard);
export default EnhancedCalendar

/*
categoryName, numOfTaskLeft, totalTask, nextTaskDesc, nextTaskDate, nextTaskDueDate, isLast
*/