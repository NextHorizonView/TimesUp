import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Modal from 'react-native-modal'
import TaskTextBox from './TaskTextBox';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarReg } from '@fortawesome/free-regular-svg-icons';
import Toast from "react-native-toast-message"

import { useDatabase } from '../context/DatabaseContext';

const refStarArray = new Array(5).fill(0);

const AddCategoryModal = ({ isModalOpen, setIsModalOpen }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState(1);

    const { addNewCategory } = useDatabase();

    const onSave = () => {
        addNewCategory(name, description, priority).then(() => {
            setIsModalOpen(false);
            setName('');
            setDescription('');
            setPriority(1);
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
        setDescription('');
        setPriority(1);
    }

    return (
        <View>
            <Modal isVisible={isModalOpen}>
                <Toast />
                <View className='px-6 py-8 mx-2 bg-white rounded-3xl'>
                    <Text className='mb-2 text-black'>Category name</Text>
                    <TaskTextBox value={name} setValue={setName} isMultiline={false} isLight={false} />

                    <Text className='mt-4 mb-2 text-black'>Category Description</Text>
                    <TaskTextBox value={description} setValue={setDescription} isMultiline={true} isLight={false} />

                    <Text className='mt-4 mb-2 text-black'>Category Priority</Text>
                    <View className='flex-row justify-between'>
                        {refStarArray.map((_, key) => <TouchableOpacity key={key} onPress={() => setPriority(key + 1)}>
                            <FontAwesomeIcon size={24} color={priority > key ? '#EEBA00' : 'black'} icon={priority > key ? faStar : faStarReg} />
                        </TouchableOpacity>)}
                    </View>

                    <View className='flex-row justify-between mt-8'>
                        <TouchableOpacity onPress={onClose} className='items-center justify-center w-[48%] p-4 bg-[#4938B5] rounded-lg'>
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

export default AddCategoryModal