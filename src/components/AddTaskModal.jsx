import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Modal from 'react-native-modal'
import TaskTextBox from './TaskTextBox';
import DatePicker from 'react-native-date-picker';
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClockFour } from '@fortawesome/free-regular-svg-icons';

const AddTaskModal = ({ isModalOpen, setIsModalOpen, task }) => {
    const [name, setName] = useState(task.name);
    const [description, setDescription] = useState(task.description);
    const [date, setDate] = useState(new Date());
    const [openDatePicker, setOpenDatePicker] = useState(false);

    return (
        <View className='rounded-xl'>
            <Modal isVisible={isModalOpen}>
                <View className='bg-[#4837B1] px-6 py-8 rounded-xl mx-2'>
                    <Text className='mb-2 text-white'>Name</Text>
                    <TaskTextBox value={name} setValue={setName} isMultiline={false} isLight={true} />

                    <Text className='mt-4 mb-2 text-white'>Description</Text>
                    <TaskTextBox value={description} setValue={setDescription} isMultiline={true} isLight={true} />

                    <Text className='mt-4 mb-2 text-white'>Select date and time</Text>
                    <TouchableOpacity onPress={() => setOpenDatePicker(true)}>
                        <View className='flex-row items-center justify-between p-4 bg-white rounded-xl'>
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

                    <View className='flex-row justify-between mt-8'>
                        <TouchableOpacity onPress={() => setIsModalOpen(false)} className='items-center justify-center w-[48%] p-4 bg-white rounded-lg'>
                            <Text className='text-[#26252C]'>Close</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setIsModalOpen(false)} className='items-center justify-center w-[48%] p-4 bg-[#26252C] rounded-lg'>
                            <Text className='text-white'>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default AddTaskModal