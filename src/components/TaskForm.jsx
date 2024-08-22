import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DateTimeInputField, PriorityInputField, TextInputField } from './FormFields';
import { TouchableOpacity } from 'react-native-gesture-handler';
import database from '../watermellon.config';
import { cancelNotification, scheduleTaskNotification, updateTaskNotification } from '../utils/notification';
import { set } from 'date-fns';

const TaskForm = ({ task, bottomSheetRef }) => {
    const [name, setName] = useState('');
    const [isNameValid, setIsNameValid] = useState(true);
    const [description, setDescription] = useState('');
    const [isDescriptionValid, setIsDescriptionValid] = useState(true);
    const [priority, setPriority] = useState(1);
    const [dueDate, setDueDate] = useState(null);
    const [isDueDateValid, setIsDueDateValid] = useState(true);

    useEffect(() => {
        if (task) {
            setName(task.name);
            setDescription(task.description);
            setPriority(task.priority);
            setDueDate(task.dueDate);
        } else {
            setName('');
            setDescription('');
            setPriority(1);
            setDueDate(new Date());
        }
    }, [task])

    const saveTask = async () => {
        if (name.length === 0) {
            setIsNameValid(false);
        } if (description.length === 0) {
            setIsDescriptionValid(false);
        }
        if (name.length === 0 || description.length === 0) {
            return;
        }

        await database.write(async () => {
            await database.get('tasks').create(task => {
                task.name = name;
                task.description = description;
                task.priority = priority;
                task.dueDate = dueDate;
            })
                .then((task) => {
                    bottomSheetRef.current?.close();
                    scheduleTaskNotification(task.id, `Task: ${name} dues soon`, task.dueDate);
                    setName('');
                    setDescription('');
                    setPriority(1);
                    setDueDate(new Date());
                    setIsNameValid(true);
                    setIsDescriptionValid(true);
                })
                .catch(err => console.log(err));
        });
    }

    const updateTask = async () => {
        if (name.length === 0) {
            setIsNameValid(false);
        } if (description.length === 0) {
            setIsDescriptionValid(false);
        }
        if (name.length === 0 || description.length === 0) {
            return;
        }

        await database.write(async () => {
            await task.update(task => {
                task.name = name;
                task.description = description;
                task.priority = priority;
                task.dueDate = dueDate
            })
                .then((task) => {
                    bottomSheetRef.current?.close();
                    updateTaskNotification(task.id, `Task: ${name} dues soon`, dueDate);
                })
                .catch(err => console.log(err));
        });
    }

    const deleteTask = async () => {
        await database.write(async () => {
            await task.destroyPermanently()
                .then(() => {
                    bottomSheetRef.current?.close();
                    setName('');
                    setDescription('');
                    setPriority(1);
                    cancelNotification(`${task.id}-5min`);
                    cancelNotification(`${task.id}-30min`);
                })
                .catch(err => console.log(err));
        });
    }


    return (
        <View className='flex-1 p-7'>
            <Text className='text-lg font-bold text-black'>Task</Text>
            <View className='justify-between flex-1 gap-4 mt-4'>
                <View className='gap-2'>
                    <PriorityInputField value={priority} setValue={setPriority} name='Task priority' />
                    <TextInputField value={name} setValue={setName} name='Task name' isValid={isNameValid} setIsValid={setIsNameValid} isDarkTheme={false} />
                    <TextInputField value={description} setValue={setDescription} name='Task description' isValid={isDescriptionValid} setIsValid={setIsDescriptionValid} isDarkTheme={false} />
                    <DateTimeInputField value={dueDate} setValue={setDueDate} name='Task Due Date' minDate={new Date()} isValid={isDueDateValid} setIsValid={setIsDueDateValid} />
                </View>
                {task ?
                    <View className='gap-2'>
                        <TouchableOpacity activeOpacity={0.7} onPress={updateTask}>
                            <View className='items-center justify-center p-3 bg-[#424242] rounded-xl'>
                                <Text className='text-lg font-bold text-white'>Update</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} onPress={deleteTask}>
                            <View className='items-center justify-center p-3 bg-red-500 rounded-xl'>
                                <Text className='text-lg font-bold text-white'>Delete</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    :
                    <TouchableOpacity activeOpacity={0.7} onPress={saveTask}>
                        <View className='items-center w-full justify-center p-3 bg-[#424242] rounded-xl'>
                            <Text className='text-lg font-bold text-white'>Save</Text>
                        </View>
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

export default TaskForm