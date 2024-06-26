import { View, Text, FlatList, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { withObservables } from '@nozbe/watermelondb/react';
import database from '../watermellon.config';
import { Q } from '@nozbe/watermelondb';
import TaskListItem from './TaskListItem';

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
            <FlatList
                data={taskList}
                keyExtractor={task => task.id}
                renderItem={({ item }) => <TaskListItem task={item} />}
                showsVerticalScrollIndicator={false}
            />
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