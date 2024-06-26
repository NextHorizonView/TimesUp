import { View, Text, FlatList } from 'react-native'
import React from 'react'
import TodayTask from './TodayTask'
import { withObservables } from '@nozbe/watermelondb/react'
import { Q } from '@nozbe/watermelondb'
import database from '../watermellon.config'
import { endOfDay, startOfDay, format } from 'date-fns'
import { switchMap } from '@nozbe/watermelondb/utils/rx'

const TodayTaskContainer = ({ tasks }) => {
    return (
        <View className='pt-2'>
            <FlatList
                contentContainerStyle={{ paddingTop: 10 }}
                showsVerticalScrollIndicator={false}
                data={tasks}
                renderItem={({ item }) => (
                    <TodayTask
                        priority={item.priority}
                        name={item.name}
                        isDue={item.isDue}
                        due={item.due}
                        startTime={item.startTime}
                        category={item.category}
                        isCompleted={item.isCompleted}
                    />
                )}
                keyExtractor={(item, index) => index}
            />
        </View>
    )
}


const getStartOfDayLocal = () => {
    const date = new Date();
    date.setHours(0, 0, 0, 0); // set to the start of the day in local time
    return date.getTime();
};

const getEndOfDayLocal = () => {
    const date = new Date();
    date.setHours(23, 59, 59, 999); // set to the end of the day in local time
    return date.getTime();
};

const enhance = withObservables(['categoryName'], ({ categoryName }) => {
    const startDate = getStartOfDayLocal();
    const endDate = getEndOfDayLocal();
    return {
        tasks: database.collections.get('tasks').query(
            Q.or(
                Q.and(
                    Q.where('is_completed', false),
                    Q.where('start_date', Q.lt(startDate))
                ),
                Q.and(
                    Q.where('start_date', Q.gte(startDate)),
                    Q.where('start_date', Q.lte(endDate))
                )
            )
        ).observeWithColumns(['category_id', 'is_completed']).pipe(switchMap(tasks => {
            return Promise.all(
                tasks.map(async task => {
                    const category = await task.category.fetch();
                    return {
                        name: task.body,
                        categoryName: category.name,
                        priority: category.priority,
                        startTime: task.startDate,
                        due: task.dueDate,
                        isDue: task.dueDate < new Date() && task.isCompleted == false,
                        isCompleted: task.isCompleted,
                    };
                })
            );
        }),)
    };
});
const EnhancedTaskList = enhance(TodayTaskContainer);

export default EnhancedTaskList;

// all task of today
// pending task of previous days


/*
{pendingTasks.length > 0 ?
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={pendingTasks}
                                renderItem={({ item }) => (
                                    <TodayTask
                                        priority={item.priority}
                                        name={item.name}
                                        isDue={item.isDue}
                                        due={item.due}
                                        startTime={item.startTime}
                                        category={item.category}
                                    />
                                )}
                                keyExtractor={(item, index) => index}
                            />
                            :
                            <View className='items-center pt-20'>
                                <LottieView style={{ width: 240, height: 240 }} autoPlay loop source={require('../assets/homeBg.json')} />
                                <Text className='mt-2 font-bold text-white'>You do not have any task scheduled for today</Text>
                            </View>}

*/