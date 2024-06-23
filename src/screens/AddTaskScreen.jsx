import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAdd, faCheck, faClose, faEdit, faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarOutlined } from '@fortawesome/free-regular-svg-icons';
import TaskDropdown from '../components/TaskDropdown';
import TaskListItem from '../components/TaskListItem';
import TaskTextBox from '../components/TaskTextBox';
import TaskListEditItem from '../components/TaskListEditItem';
import AddTaskModal from '../components/AddTaskModal';
import DatePicker from 'react-native-date-picker';
import { format } from 'date-fns';
import { faClockFour } from '@fortawesome/free-regular-svg-icons';

const categories = [
    {
        id: 0,
        name: 'General',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea...',
        priority: 1,
    },
    {
        id: 1,
        name: 'Play',
        description: 'I have to play',
        priority: 2
    },
    {
        id: 2,
        name: 'Study',
        description: 'I have to study',
        priority: 4
    },
]

const tasks = [
    {
        id: 0,
        name: 'Task 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea...',
        isCompleted: false
    },
    {
        id: 1,
        name: 'Task 2',
        description: 'Lorem ipsum dolor sit amet, adipiscing,  tempor incididunt ...',
        isCompleted: true,
    },
    {
        id: 2,
        name: 'Task 3',
        description: 'Lorem ipsum dolor sit amet, adipiscing,  tempor incididunt ...',
        isCompleted: false
    },
]

const AddTaskScreen = () => {
    const [shouldEdit, setShouldEdit] = useState(false);
    const [date, setDate] = useState(new Date());
    const [categoryId, setCategoryId] = useState(0);
    const [editCategory, setEditCategory] = useState(0);
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const stars = new Array(5).fill(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openDatePicker, setOpenDatePicker] = useState(false);

    useEffect(() => {
        if (editCategory == -1) {
            setTaskName('New Task');
            setTaskDescription('You can add a description here')
        } else {
            setTaskName(categories[editCategory].name);
            setTaskDescription(categories[editCategory].description);
        }
    }, [categories, editCategory])

    const onSave = () => {
        setShouldEdit(false);
    }

    const onCancel = () => {
        setShouldEdit(false);
    }

    const onEditCurrentCategory = () => {
        setShouldEdit(true);
        setEditCategory(categoryId);
    }

    const onAddNewCategory = () => {
        setShouldEdit(true);
        setEditCategory(-1);
    }

    const onSelectTask = () => {

    }

    return (
        <View className='flex-1 px-2 bg-black'>
            <View className='flex-1 mt-16 bg-[#4938B5] rounded-[78px] pt-4'>
                <View className='bg-white rounded-t-[48px] flex-1 relative'>
                    {
                        shouldEdit ?
                            <View className='flex-row justify-between m-4'>
                                <TouchableOpacity onPress={onCancel} className='bg-[#DBD7F2] rounded-full w-12 h-12 justify-center items-center'>
                                    <FontAwesomeIcon icon={faClose} size={24} color='#230BAF' />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={onSave} className='bg-[#DBD7F2] rounded-full w-12 h-12 justify-center items-center'>
                                    <FontAwesomeIcon icon={faCheck} size={24} color='#230BAF' />
                                </TouchableOpacity>
                            </View>
                            :
                            <View className='flex-row justify-end m-4'>
                                <TouchableOpacity onPress={onEditCurrentCategory} className='bg-[#DBD7F2] rounded-full w-12 h-12 justify-center items-center'>
                                    <FontAwesomeIcon icon={faEdit} size={24} color='#230BAF' />
                                </TouchableOpacity>
                            </View>
                    }
                    <ScrollView>
                        <View className='px-4'>
                            {shouldEdit ?
                                <View className='flex-row justify-center'>
                                    <TaskTextBox value={taskName} setValue={setTaskName} isMultiline={false} />
                                </View>
                                :
                                <View className='flex-row items-center justify-center mt-4'>
                                    <TaskDropdown categories={categories} categoryId={categoryId} setCategoryId={setCategoryId} />
                                    <TouchableOpacity onPress={onAddNewCategory} className='bg-[#DBD7F2] rounded-full w-8 h-8 justify-center items-center ml-2'>
                                        <FontAwesomeIcon icon={faAdd} size={16} color='#230BAF' />
                                    </TouchableOpacity>
                                </View>

                            }

                            {shouldEdit ?
                                <View className='flex-row justify-center gap-4 mt-4'>
                                    {stars.map((_, key) => <TouchableOpacity key={key}>
                                        {editCategory != -1 ? categories[categoryId].priority <= key ? <FontAwesomeIcon color='gray' icon={faStarOutlined} /> : <FontAwesomeIcon icon={faStar} color='#F7DC6F' /> : <FontAwesomeIcon color='gray' icon={faStarOutlined} />}
                                    </TouchableOpacity>)}
                                </View> :
                                <View className='flex-row justify-center gap-4 mt-4'>
                                    {stars.map((_, key) => categories[categoryId].priority <= key ? <FontAwesomeIcon key={key} color='gray' icon={faStarOutlined} /> : <FontAwesomeIcon key={key} icon={faStar} color='#F7DC6F' />
                                    )}
                                </View>
                            }

                            <View className='items-center'>
                                {shouldEdit && <Text className='mt-2 font-bold text-gray-200'>Select Priority</Text>}
                                <View className='w-24 h-1 mt-4 bg-gray-200' />
                            </View>

                            {shouldEdit ?
                                <View className='mt-4'>
                                    <Text className='text-base font-bold text-black'>Description: </Text>
                                    <TaskTextBox value={taskDescription} setValue={setTaskDescription} isMultiline={true} />
                                </View>
                                :
                                <View className='mt-4'>
                                    <Text className='text-base font-bold text-black'>Description: </Text>
                                    <Text className='text-black'>{categories[categoryId].description}</Text>
                                </View>
                            }

                            <View className='mt-4'>
                                <Text className='text-base font-bold text-black'>Select date and time</Text>
                                <TouchableOpacity onPress={() => setOpenDatePicker(true)}>
                                    <View className='flex-row items-center justify-between p-4 bg-white border-[1px] rounded-xl'>
                                        <Text className='text-black'>{format(date, 'MMMM d, yyyy')}</Text>
                                        <FontAwesomeIcon icon={faClockFour} />
                                    </View>
                                </TouchableOpacity>
                                <DatePicker
                                    mode="datetime"
                                    modal
                                    open={openDatePicker}
                                    date={date}
                                    onConfirm={(selectedDate) => {
                                        setOpenDatePicker(false);
                                        setDate(selectedDate);
                                    }}
                                    onCancel={() => {
                                        setOpenDatePicker(false);
                                    }}
                                />
                            </View>


                            <View className='mt-4'>
                                <Text className='text-base font-bold text-black'>Task: </Text>
                                {tasks.map((task, key) => shouldEdit ?
                                    <TouchableOpacity key={key} className='bg-[#F2F2F2] p-2 my-2 rounded'>
                                        <TaskListEditItem task={task} />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity key={key} className='bg-[#F2F2F2] p-2 my-2 rounded'>
                                        <TaskListItem task={task} />
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>

                        <AddTaskModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} task={tasks[0]} />

                        {!shouldEdit && <TouchableOpacity className='mx-4 mb-3' onPress={() => setIsModalOpen(true)}>
                            <View className='p-4 bg-[#26252C] rounded-xl flex-row justify-between items-center'>
                                <Text className='font-medium text-white'>Add Task</Text>
                                <View className='items-center justify-center p-2 bg-white rounded-full'>
                                    <FontAwesomeIcon icon={faAdd} color='#26252C' />
                                </View>
                            </View>
                        </TouchableOpacity>}
                    </ScrollView>
                </View>
            </View>
        </View>
    )
}

export default AddTaskScreen