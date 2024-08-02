import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DateInputField, DateTimeInputField, PriorityInputField, TextInputField } from './FormFields';
import { TouchableOpacity } from 'react-native-gesture-handler';
import database from '../watermellon.config';

const TaskForm = ({ task, bottomSheetRef }) => {
    const [name, setName] = useState('');
    const [isNameValid, setIsNameValid] = useState(true);
    const [description, setDescription] = useState('');
    const [isDescriptionValid, setIsDescriptionValid] = useState(true);
    const [priority, setPriority] = useState(1);
    const [dueDate, setDueDate] = useState(new Date());
    const [isDueDateValid, setIsDueDateValid] = useState(true);

    useEffect(() => {
        if (task) {
            setName(task.name);
            setDescription(task.description);
            setPriority(task.priority);
        } else {
            setName('');
            setDescription('');
            setPriority(1);
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
            })
                .then(() => {
                    bottomSheetRef.current?.close();
                    setName('');
                    setDescription('');
                    setPriority(1);
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
            })
                .then(() => {
                    bottomSheetRef.current?.close();
                    setName('');
                    setDescription('');
                    setPriority(1);
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
                    <DateTimeInputField value={dueDate} setValue={setDueDate} name='Task Due Date' minDate={dueDate} isValid={isDueDateValid} setIsValid={setIsDueDateValid} />
                </View>
                <TouchableOpacity activeOpacity={0.7} onPress={task ? updateTask : saveTask}>
                    <View className='items-center justify-center p-3 bg-[#424242] rounded-xl'>
                        <Text className='text-lg font-bold text-white'>{task ? 'Update' : 'Save'}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default TaskForm