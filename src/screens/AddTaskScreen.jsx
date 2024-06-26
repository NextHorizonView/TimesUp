import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAdd, faEdit, faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarOutlined } from '@fortawesome/free-regular-svg-icons';
import TaskDropdown from '../components/TaskDropdown';
import AddCategoryModal from '../components/AddCategoryModel';
import EditCategoryModel from '../components/EditCategoryModel';
import { useDatabase } from '../context/DatabaseContext';
import TaskListByCategory from '../components/TaskListByCategory';

const stars = new Array(5).fill(0);
const AddTaskScreen = () => {
    const [addCategoryModel, setAddCategoryModel] = useState(false);
    const [editCategoryModel, setEditCategoryModel] = useState(false);
    const [addTaskModal, setAddTaskModal] = useState(false);

    const [categoryName, setCategoryName] = useState('');
    const [category, setCategory] = useState({});

    const { getCategoryByName } = useDatabase();

    const onEditCurrentCategory = () => {
        setEditCategoryModel(true);
    }

    useEffect(() => {
        const fetchCategoryDetails = async () => {
            setCategory(await getCategoryByName(categoryName));
        }
        if (categoryName)
            fetchCategoryDetails();
    }, [categoryName])

    return (
        <View className='flex-1 px-2 bg-black'>
            <View className='flex-1 mt-16 bg-[#4938B5] rounded-[78px] pt-4'>
                <View className='bg-white rounded-t-[48px] flex-1 relative'>
                    <View className='flex-row justify-end m-4'>
                        <TouchableOpacity onPress={() => onEditCurrentCategory(true)} className='bg-[#DBD7F2] rounded-full w-12 h-12 justify-center items-center'>
                            <FontAwesomeIcon icon={faEdit} size={24} color='#230BAF' />
                        </TouchableOpacity>
                    </View>

                    <View className='flex-1 px-4'>
                        <AddCategoryModal isModalOpen={addCategoryModel} setIsModalOpen={setAddCategoryModel} />
                        <EditCategoryModel isModalOpen={editCategoryModel} setIsModalOpen={setEditCategoryModel} categoryDetails={category} setCategoryName={setCategoryName} />
                        <View className='flex-row items-center justify-center mt-4'>
                            <TaskDropdown categoryName={categoryName} setCategoryName={setCategoryName} />
                            <TouchableOpacity onPress={() => setAddCategoryModel(true)} className='bg-[#DBD7F2] rounded-full w-8 h-8 justify-center items-center ml-2'>
                                <FontAwesomeIcon icon={faAdd} size={16} color='#230BAF' />
                            </TouchableOpacity>
                        </View>

                        <View className='flex-row justify-center gap-4 mt-4'>
                            {stars.map((_, key) => category?.priority <= key ? <FontAwesomeIcon key={key} color='gray' icon={faStarOutlined} /> : <FontAwesomeIcon key={key} icon={faStar} color='#F7DC6F' />
                            )}
                        </View>

                        <View className='mt-4'>
                            <Text className='text-base font-bold text-black'>Description: </Text>
                            <Text className='text-black/80'>{category?.description}</Text>
                        </View>


                        <Text className='mt-4 text-base font-bold text-black'>Task: </Text>

                        <View className='flex-1'>
                            <TaskListByCategory categoryName={categoryName} />
                        </View>

                    </View>
                </View>
            </View>
        </View>
    )
}

export default AddTaskScreen;

