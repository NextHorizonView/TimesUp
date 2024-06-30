import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Modal from 'react-native-modal'
import TaskTextBox from './TaskTextBox';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-native-date-picker'
import { format } from 'date-fns'
import TaskDropdown from './TaskDropdown';
import Toast from "react-native-toast-message"
import { useDatabase } from '../context/DatabaseContext';

const AddTaskModal = ({ isModalOpen, setIsModalOpen, date, category }) => {
    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState(date || new Date());
    const [dueDate, setDueDate] = useState(new Date(new Date().getTime() + 60 * 24 * 60000));
    const [openStartDate, setOpenStartDate] = useState(false);
    const [openDueDate, setOpenDueDate] = useState(false);
    const [categoryName, setCategoryName] = useState(category || '');

    const { addNewTask } = useDatabase();

    useEffect(() => {
        setCategoryName(category || '')
    }, [category]);

    useEffect(() => {
        if (date) {
            setStartDate(date);
            setDueDate(new Date(date.getTime() + 60 * 24 * 60000));
        }
    }, [date])

    useEffect(() => {
        if (dueDate < startDate) {
            setDueDate(new Date(startDate.getTime() + 60 * 24 * 60000));
        }
    }, [startDate])

    useEffect(() => {
        setStartDate(new Date());
        setDueDate(new Date(startDate.getTime() + 60 * 24 * 60000));
    }, [isModalOpen])


    const onSave = () => {
        if (name.length == 0) {
            Toast.show({
                type: 'error',
                text1: 'Please don\'t keep task empty',
                swipeable: true
            })
            return;
        }
        setIsModalOpen(false);
        addNewTask(name, startDate, dueDate, categoryName).then(() => {
            setName('');
        }).catch(err => {
            Toast.show({
                type: 'error',
                text1: err.message,
                swipeable: true
            })
        });
    }

    const onClose = () => {
        setIsModalOpen(false);
        setName('');
    }

    return (
        <View>
            <Modal isVisible={isModalOpen}>
                <Toast />
                <View className='px-6 py-8 mx-2 bg-white rounded-3xl'>
                    <Text className='mb-2 text-black'>Task</Text>
                    <TaskTextBox taskLength={100} value={name} setValue={setName} isMultiline={false} isLight={false} />

                    <Text className='mt-4 mb-2 text-black'>Task Category</Text>
                    <TaskDropdown setCategoryName={setCategoryName} isLight={false} categoryName={categoryName} />

                    <Text className='mt-4 mb-2 text-black'>Task Start Date</Text>
                    <TouchableOpacity onPress={() => setOpenStartDate(true)} className='rounded min-w-[200] border-black/30 border-2 flex-row p-2 items-center justify-between'>
                        <Text className='text-lg text-black'>{format(startDate, 'MMMM d, hh:mm')}</Text>
                        <FontAwesomeIcon icon={faClock} size={24} color='black' />
                    </TouchableOpacity>

                    <Text className='mt-4 mb-2 text-black'>Task End Date</Text>
                    <TouchableOpacity onPress={() => setOpenDueDate(true)} className='rounded min-w-[200] border-black/30 border-2 flex-row p-2 items-center justify-between'>
                        <Text className='text-lg text-black'>{format(dueDate, 'MMMM d, hh:mm')}</Text>
                        <FontAwesomeIcon icon={faClock} size={24} color='black' />
                    </TouchableOpacity>
                    <DatePicker
                        mode="datetime"
                        modal
                        open={openStartDate}
                        date={startDate}
                        onConfirm={(selectedDate) => {
                            setStartDate(selectedDate);
                            setOpenStartDate(false);
                        }}
                        onCancel={() => {
                            setOpenStartDate(false);
                        }}
                        minimumDate={new Date()}
                    />
                    <DatePicker
                        mode="datetime"
                        modal
                        open={openDueDate}
                        date={dueDate}
                        onConfirm={(selectedDate) => {
                            setDueDate(selectedDate);
                            setOpenDueDate(false);
                        }}
                        onCancel={() => {
                            setOpenDueDate(false);
                        }}
                        minimumDate={startDate}
                    />

                    <View className='flex-row justify-between mt-8'>
                        <TouchableOpacity onPress={onClose} className='items-center justify-center w-[48%] p-4 bg-[#4837B1] rounded-lg'>
                            <Text className='text-white'>Close</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onSave} className='items-center justify-center w-[48%] p-4 bg-[#26252C] rounded-lg'>
                            <Text className='text-white'>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default AddTaskModal;

