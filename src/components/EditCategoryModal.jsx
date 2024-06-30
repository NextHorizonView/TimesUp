import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Modal from 'react-native-modal'
import TaskTextBox from './TaskTextBox';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClose, faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarReg } from '@fortawesome/free-regular-svg-icons';
import { useDatabase } from '../context/DatabaseContext';
import Toast from 'react-native-toast-message';

const refStarArray = new Array(5).fill(0);

const EditCategoryModal = ({ isModalOpen, setIsModalOpen, categoryDetails, setCategoryName }) => {
    const { editCategory, deleteCategory, checkIfCategoryExist } = useDatabase()
    const [name, setName] = useState(categoryDetails.name);
    const [description, setDescription] = useState(categoryDetails.description);
    const [priority, setPriority] = useState(categoryDetails.priority);

    useEffect(() => {
        setName(categoryDetails.name);
        setDescription(categoryDetails.description);
        setPriority(categoryDetails.priority);
    }, [categoryDetails])

    const onSave = async () => {
        if (name.length == 0) {
            Toast.show({
                type: 'error',
                text1: `Category name cannot be empty already exist`
            })
        }
        const doesCategoryExist = await checkIfCategoryExist(name);
        if (doesCategoryExist && categoryDetails.name != name) {
            Toast.show({
                type: 'error',
                text1: `Category ${name} already exist`
            })
            return;
        }
        editCategory(name, description, priority, categoryDetails);
        setCategoryName(name);
        setIsModalOpen(false);
    }

    const onDelete = () => {
        deleteCategory(categoryDetails);
        setIsModalOpen(false);
    }

    const onClose = () => {
        setIsModalOpen(false);
    }

    return (
        <View>
            <Modal isVisible={isModalOpen}>
                <Toast />
                <View className='px-6 py-8 mx-2 bg-white rounded-3xl'>
                    <View className='flex-row justify-end'>
                        <TouchableOpacity onPress={onClose} className='flex-row items-center justify-center p-2 bg-[#DBD7F2] rounded-full'>
                            <FontAwesomeIcon size={24} color='#230BAF' icon={faClose} />
                        </TouchableOpacity>
                    </View>
                    <Text className='mb-2 text-black'>Category name</Text>
                    <TaskTextBox value={name} setValue={setName} isMultiline={false} />

                    <Text className='mt-4 mb-2 text-black'>Category Description</Text>
                    <TaskTextBox value={description} setValue={setDescription} isMultiline={true} />

                    <Text className='mt-4 mb-2 text-black'>Category Priority</Text>
                    <View className='flex-row justify-between'>
                        {refStarArray.map((_, key) => <TouchableOpacity key={key} onPress={() => setPriority(key + 1)}>
                            <FontAwesomeIcon size={24} color={priority > key ? '#EEBA00' : 'black'} icon={priority > key ? faStar : faStarReg} />
                        </TouchableOpacity>)}
                    </View>

                    <View className='flex-row justify-between mt-8'>
                        <TouchableOpacity onPress={onDelete} className='items-center justify-center w-[48%] p-4 bg-red-400 rounded-lg'>
                            <Text className='text-white'>Delete</Text>
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

export default EditCategoryModal