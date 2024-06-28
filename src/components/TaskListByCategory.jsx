import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { withObservables } from '@nozbe/watermelondb/react';
import database from '../watermellon.config';
import { Q } from '@nozbe/watermelondb';
import TaskListItem from './TaskListItem';
import LottieView from 'lottie-react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';

const TaskListByCategory = ({ tasks, addTaskModal, setAddTaskModal }) => {
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
        <View className='flex-1'>
            {tasks && tasks.length > 0 ?
                <View className='flex-1'>
                    <View>
                        <Text className='mt-4 text-base font-bold text-black'>Task: </Text>
                        <TouchableOpacity onPress={() => setAddTaskModal(true)} className='mb-3'>
                            <View className='p-4 bg-[#26252C] rounded-xl flex-row justify-between items-center'>
                                <Text className='font-medium text-white'>Add Task</Text>
                                <View className='items-center justify-center p-2 bg-white rounded-full'>
                                    <FontAwesomeIcon icon={faAdd} color='#26252C' />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={taskList}
                        keyExtractor={task => task.id}
                        renderItem={({ item, index }) => <TaskListItem task={item} index={index} />}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                :
                <View>
                    <TouchableOpacity onPress={() => setAddTaskModal(true)} className='mt-2'>
                        <View className='p-4 bg-[#26252C] rounded-xl flex-row justify-between items-center'>
                            <Text className='font-medium text-white'>Add Task</Text>
                            <View className='items-center justify-center p-2 bg-white rounded-full'>
                                <FontAwesomeIcon icon={faAdd} color='#26252C' />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View className='items-center mt-8'>
                        <LottieView autoPlay loop style={{ width: 240, height: 240 }} source={require('../assets/notask.json')} />
                        <Text className='font-bold text-black'>You do not have any task to do</Text>
                    </View>
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