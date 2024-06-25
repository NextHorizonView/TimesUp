import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Modal from 'react-native-modal'
import TaskTextBox from './TaskTextBox';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarReg } from '@fortawesome/free-regular-svg-icons';
import { addNewCategory } from '../store/category/categorySlice';

const refStarArray = new Array(5).fill(0);

const AddCategoryModal = ({ isModalOpen, setIsModalOpen }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState(1);

    const dispatch = useDispatch();

    const onSave = () => {
        dispatch(addNewCategory({ categoryName: name, categoryDetails: { description, priority } }))
        setIsModalOpen(false);
        setName('');
        setDescription('');
        setPriority(1);
    }

    const onClose = () => {
        setIsModalOpen(false);
        setName('');
        setDescription('');
        setPriority(1);
    }

    return (
        <View>
            <Modal isVisible={isModalOpen}>
                <View className='bg-[#4837B1] px-6 py-8 rounded-3xl mx-2'>
                    <Text className='mb-2 text-white'>Category name</Text>
                    <TaskTextBox value={name} setValue={setName} isMultiline={false} isLight={true} />

                    <Text className='mt-4 mb-2 text-white'>Category Description</Text>
                    <TaskTextBox value={description} setValue={setDescription} isMultiline={true} isLight={true} />

                    <Text className='mt-4 mb-2 text-white'>Category Priority</Text>
                    <View className='flex-row justify-between'>
                        {refStarArray.map((_, key) => <TouchableOpacity key={key} onPress={() => setPriority(key + 1)}>
                            <FontAwesomeIcon size={24} color={priority > key ? '#EEBA00' : 'white'} icon={priority > key ? faStar : faStarReg} />
                        </TouchableOpacity>)}
                    </View>

                    <View className='flex-row justify-between mt-8'>
                        <TouchableOpacity onPress={onClose} className='items-center justify-center w-[48%] p-4 bg-white rounded-lg'>
                            <Text className='text-[#26252C]'>Close</Text>
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

export default AddCategoryModal