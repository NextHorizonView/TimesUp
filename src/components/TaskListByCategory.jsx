import { View, Text, FlatList, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { withObservables } from '@nozbe/watermelondb/react';
import database from '../watermellon.config';
import { Q } from '@nozbe/watermelondb';
import TaskListItem from './TaskListItem';
import LottieView from 'lottie-react-native';

const TaskListByCategory = ({ tasks }) => {
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        const tempTask = tasks.map(task => ({
            body: task.body,
            startDate: task.startDate,
            endDate: task.endDate,
            isCompleted: task.isCompleted,
            id: task.id,
            toggleCompletion: async () => {
                await database.write(async () => {
                    await task.update(t => {
                        t.isCompleted = !task.isCompleted;
                    });
                });
            },
        }));
        setTaskList(tempTask);
    }, [tasks]);

    return (
        <View className=''>
            {tasks && tasks.length > 0 ?
                <View>
                    <Text className='mt-4 text-base font-bold text-black'>Task: </Text>
                    <FlatList
                        data={taskList}
                        keyExtractor={task => task.id}
                        renderItem={({ item }) => <TaskListItem task={item} />}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                :
                <View className='items-center mt-8'>
                    <LottieView autoPlay loop style={{ width: 240, height: 240 }} source={require('../assets/notask.json')} />
                    <Text className='font-bold text-black'>You do not have any task to do</Text>
                </View>
            }
        </View>
    );
};

const enhance = withObservables(['categoryName'], ({ categoryName }) => ({
    tasks: database.collections.get('tasks').query(
        Q.on('categories', 'name', categoryName)
    ).observe(),
}));

const EnhancedTaskList = enhance(TaskListByCategory);

export default EnhancedTaskList;

/*
    database.get('categories')
*/