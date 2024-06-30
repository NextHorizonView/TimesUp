import { View, FlatList, Text } from 'react-native'
import React from 'react'
import TodayTask from './TodayTask'
import { withObservables } from '@nozbe/watermelondb/react'
import { Q } from '@nozbe/watermelondb'
import database from '../watermellon.config'
import { switchMap } from '@nozbe/watermelondb/utils/rx'
import LottieView from 'lottie-react-native'
import { Dimensions } from 'react-native'

const SCREEN_WIDTH = Dimensions.get('window').width;

const TodayTaskContainer = ({ tasks, navigateToTaskScreen }) => {
    return (
        <View className='flex-1 pt-6 rounded-t-3xl' style={{ width: SCREEN_WIDTH }}>
            <View className='flex-1 gap-2 px-6 pt-6'>
                <Text className='text-2xl font-bold text-white'>Today's Task</Text>
                <View className='flex-1 pt-2'>
                    {tasks && tasks.length > 0 ?
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
                                    category={item.categoryName}
                                    isCompleted={item.isCompleted}
                                    navigateToTaskScreen={navigateToTaskScreen}
                                />
                            )}
                            keyExtractor={(item, index) => index}
                        />
                        :
                        <View className='items-center mt-8'>
                            <LottieView autoPlay loop style={{ width: 240, height: 240 }} source={require('../assets/todayNoTask.json')} />
                        </View>
                    }
                </View>
            </View>
        </View>
    )
}


const getStartOfDayLocal = () => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date.getTime();
};

const getEndOfDayLocal = () => {
    const date = new Date();
    date.setHours(23, 59, 59, 999);
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
        ).observeWithColumns(['category_id', 'is_completed']).pipe(
            switchMap(async tasks => {
                const tasksWithCategory = await Promise.all(
                    tasks.map(async task => {
                        const category = await task.category.fetch();
                        return {
                            name: task.body,
                            categoryName: category.name,
                            priority: category.priority,
                            startTime: task.startDate,
                            due: task.dueDate,
                            isDue: task.dueDate < new Date() && !task.isCompleted,
                            isCompleted: task.isCompleted,
                        };
                    })
                );
                // Sort tasks by priority
                tasksWithCategory.sort((a, b) => b.priority - a.priority);
                return tasksWithCategory;
            })
        )
    };
});

const EnhancedTaskList = enhance(TodayTaskContainer);

export default EnhancedTaskList;
