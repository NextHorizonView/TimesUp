import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { withObservables } from '@nozbe/watermelondb/react';
import database from '../watermellon.config';
import { Q } from '@nozbe/watermelondb';
import TaskListItem from './TaskListItem';
import LottieView from 'lottie-react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { useDatabase } from '../context/DatabaseContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const TaskListByCategory = ({ tasks, setAddTaskModal }) => {
    const [taskList, setTaskList] = useState([]);
    const { toggleTaskCompletion, deleteTask } = useDatabase();
    const [selectTask, setSelectTask] = useState('today')

    const categorizeTasks = () => {
        if (!tasks) return;
        const todaysTasks = [];
        const prevTasks = [];
        const futureTasks = [];
        const todayDate = new Date();
        for (let i = 0; i < tasks.length; i++) {
            const task = {
                body: tasks[i].body,
                startDate: tasks[i].startDate,
                dueDate: tasks[i].dueDate,
                isCompleted: tasks[i].isCompleted,
                id: tasks[i].id,
                toggleCompletion: () => toggleTaskCompletion(tasks[i]),
            }
            const taskDate = task.startDate;
            if (taskDate.getDate() == todayDate.getDate() && taskDate.getMonth() == todayDate.getMonth() && taskDate.getFullYear() == todayDate.getFullYear()) {
                todaysTasks.push(task);
            } else if (taskDate < todayDate) {
                prevTasks.push(task);
            } else {
                futureTasks.push(task);
            }
        }
        return {
            previous: prevTasks,
            today: todaysTasks,
            future: futureTasks
        }
    }

    useEffect(() => {
        setTaskList(categorizeTasks());
    }, [tasks]);

    const onDeleteTask = (id) => {
        setTaskList((prevTaskList) => ({
            ...prevTaskList,
            [selectTask]: prevTaskList[selectTask].filter((task) => task.id !== id)
        }));
        deleteTask(id);
    };

    const handleDelete = (id) => {
        onDeleteTask(id);
    }
    useEffect(() => {
        console.log(taskList);
    }, [taskList])
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
                        <View className='flex-row flex-wrap gap-1'>
                            <TouchableOpacity onPress={() => setSelectTask('previous')} className='p-2 m-2 rounded-xl' style={{ backgroundColor: selectTask === 'previous' ? '#4938B5' : '#DBD7F2' }}>
                                <Text style={{ color: selectTask === 'previous' ? 'white' : 'black' }}>Previous Tasks</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setSelectTask('today')} className='bg-[#DBD7F2] p-2 m-2 rounded-xl' style={{ backgroundColor: selectTask === 'today' ? '#4938B5' : '#DBD7F2' }} >
                                <Text style={{ color: selectTask === 'today' ? 'white' : 'black' }}>Todays Tasks</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setSelectTask('future')} className='bg-[#DBD7F2] p-2 m-2 rounded-xl' style={{ backgroundColor: selectTask === 'future' ? '#4938B5' : '#DBD7F2' }}>
                                <Text style={{ color: selectTask === 'future' ? 'white' : 'black' }}>Future Tasks</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <GestureHandlerRootView>
                        <FlatList
                            data={taskList[selectTask]}
                            keyExtractor={task => task.id}
                            renderItem={({ item, index }) => <TaskListItem task={item} index={index} handleDelete={handleDelete} />}
                            showsVerticalScrollIndicator={false}
                        />
                    </GestureHandlerRootView>
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
    ).observeWithColumns(['body', 'start_date', 'due_date', 'is_completed']),
}));

const EnhancedTaskList = enhance(TaskListByCategory);

export default EnhancedTaskList;
