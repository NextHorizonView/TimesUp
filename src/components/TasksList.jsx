import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAdd, faStar } from '@fortawesome/free-solid-svg-icons'
import { withObservables } from '@nozbe/watermelondb/react'
import database from '../watermellon.config'
import { Q } from '@nozbe/watermelondb'
import Modal from 'react-native-modal'
import { format } from 'date-fns'

const starsArray = [1, 2, 3, 4, 5];

const TasksList = ({ bottomSheetRef, tasks, setTask }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectTask, setSelectTask] = useState(null);
    const openBottomSheet = () => {
        setTask(null);
        bottomSheetRef.current?.expand()
    };

    const onSelectTask = (task) => {
        setIsModalVisible(true);
        setSelectTask(task);
    }

    const onCompleteTask = async () => {
        setIsModalVisible(false);
        await database.write(async () => {
            await selectTask.destroyPermanently()
                .then(() => {
                    setSelectTask(null);
                })
                .catch(err => console.log(err));
        });
    };

    onCancelTaskComplete = () => {
        setIsModalVisible(false);
        setSelectTask(null);
    }

    function formatTime(date) {
        return date.toLocaleTimeString([], {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
    }

    return (
        <View className='flex-1 pt-6 bg-white px-7 rounded-t-2xl'>
            <Text className='text-lg font-bold text-black'>Today's Task</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
                {
                    tasks.map(task => (
                        <TouchableOpacity className='my-2' key={task.id} onPress={() => {
                            setTask(task);
                            bottomSheetRef.current?.expand();
                        }} activeOpacity={0.7}>
                            <View className='bg-[#F2F2F2] mb-3 p-6 rounded-[28px] flex-row items-start gap-2 border-b-2 border-[#DBBEBE]'>
                                <TouchableOpacity className='mt-4' onPress={() => onSelectTask(task)}>
                                    <View className='bg-[#BDBDBD] items-center justify-center w-5 h-5 rounded-full mt-2'>
                                    </View>
                                </TouchableOpacity>
                                <View>
                                    <Text className='text-lg text-[#464242] font-semibold'>{task.name}</Text>
                                    <Text className='text-sm text-[#8C8080] '>{task.description}</Text>
                                    <Text className='text-sm text-[#8C8080]'>{format(task.dueDate, 'MMMM d, yyyy hh:mm')}</Text>
                                    <View className='mt-2'>
                                        <View className='flex-row gap-1'>
                                            {starsArray.map((star, index) => {
                                                return (
                                                    <View key={index}>
                                                        <FontAwesomeIcon size={20} icon={faStar} color={star > task.priority ? '#D9D9D9' : task.priority === 3 ? '#DF9620' : task.priority < 3 ? '#DB4837' : '#15A217'} />
                                                    </View>
                                                )
                                            })}
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
            <TouchableOpacity className='mt-4' onPress={openBottomSheet} activeOpacity={0.7}>
                <View className='bg-[#26252C] mb-3 p-6 flex-row justify-between items-center rounded-[18px]'>
                    <Text className='text-lg text-white'>Add Task</Text>
                    <View className='p-2 bg-white rounded-full'>
                        <FontAwesomeIcon icon={faAdd} size={18} color='#26252C' />
                    </View>
                </View>
            </TouchableOpacity>
            <Modal isVisible={isModalVisible}>
                <View className='items-start gap-3 px-6 py-8 mx-4 bg-white rounded-md'>
                    <Text className='font-bold text-[#212121] text-lg'>Mark task as done?</Text>
                    <Text className='text-[#4A4A4A] text-sm'>On marking task as done, it will be removed from the list. Are you sure you want to mark it as done?</Text>
                    <View className='flex-row'>
                        <TouchableOpacity onPress={onCancelTaskComplete} activeOpacity={0.7} className='h-7 w-24 mr-1 items-center justify-center border-[1px] border-[#26252C] rounded-md'>
                            <Text className='text-[#26252C] font-medium text-center'>No</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onCompleteTask} activeOpacity={0.7} className='h-7 w-24 items-center justify-center bg-[#26252C] rounded-md'>
                            <Text className='font-medium text-center text-white'>Yes</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}



const enhance = withObservables([], () => {
    return {
        tasks: database.get('tasks').query(
            Q.sortBy('priority', Q.desc),
            Q.sortBy('due_date', Q.asc)
        ).observeWithColumns(['name', 'description', 'due_date', 'priority'])
    }
});

const EnhanceCalendarEvents = enhance(TasksList);
export default EnhanceCalendarEvents;