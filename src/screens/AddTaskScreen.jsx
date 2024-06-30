import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEdit, faStar } from '@fortawesome/free-solid-svg-icons';
import { faSquarePlus, faStar as faStarOutlined } from '@fortawesome/free-regular-svg-icons';
import TaskDropdown from '../components/TaskDropdown';
import AddCategoryModal from '../components/AddCategoryModel';
import EditCategoryModal from '../components/EditCategoryModal';
import { useDatabase } from '../context/DatabaseContext';
import TaskListByCategory from '../components/TaskListByCategory';
import AddTaskModal from '../components/AddTaskModal';

const stars = new Array(5).fill(0);
const AddTaskScreen = ({ route }) => {
    const [addCategoryModel, setAddCategoryModel] = useState(false);
    const [addTaskModal, setAddTaskModal] = useState(false);
    const [editCategoryModal, setEditCategoryModal] = useState(false);

    const [categoryName, setCategoryName] = useState(route.params?.categoryName || '');
    const [category, setCategory] = useState({});

    const { getCategoryByName } = useDatabase();

    useEffect(() => {
        setCategoryName(route.params?.categoryName || '')
    }, [route.params])

    useEffect(() => {
        const fetchCategoryDetails = async () => {
            setCategory(await getCategoryByName(categoryName));
        }
        if (categoryName)
            fetchCategoryDetails();
    }, [categoryName])

    return (
        <View className='flex-1 px-2 bg-black'>
            <View className='flex-1 bg-[#4938B5] rounded-[78px] pt-4'>
                <View className='bg-purple-100 rounded-t-[48px] flex-1 relative'>
                    <View className='flex-row-reverse justify-between m-4'>
                        {categoryName !== 'Miscellaneous' &&
                            <TouchableOpacity onPress={() => setEditCategoryModal(true)} className='flex-row items-center justify-center p-2 bg-purple-300 rounded-xl'>
                                <FontAwesomeIcon icon={faEdit} size={18} color='#230BAF' />
                                <Text className='ml-2 text-[#230BAF]'>Edit Category</Text>
                            </TouchableOpacity>
                        }
                        <TouchableOpacity onPress={() => setAddCategoryModel(true)} className='flex-row items-center justify-center p-2 bg-purple-300 rounded-xl'>
                            <FontAwesomeIcon icon={faSquarePlus} size={18} color='#230BAF' />
                            <Text className='ml-2 text-[#230BAF]'>Add Category</Text>
                        </TouchableOpacity>
                    </View>

                    <View className='flex-1 px-4'>
                        <AddCategoryModal isModalOpen={addCategoryModel} setIsModalOpen={setAddCategoryModel} />
                        <EditCategoryModal isModalOpen={editCategoryModal} setIsModalOpen={setEditCategoryModal} categoryDetails={category} setCategoryName={setCategoryName} />
                        <View className='flex-row items-center justify-center'>
                            <TaskDropdown categoryName={categoryName} setCategoryName={setCategoryName} />
                        </View>

                        <View className='flex-row justify-center gap-4 mt-2'>
                            {stars.map((_, key) => category?.priority <= key ? <FontAwesomeIcon key={key} color='gray' icon={faStarOutlined} /> : <FontAwesomeIcon key={key} icon={faStar} color='#F7DC6F' />
                            )}
                        </View>

                        <View className='mt-4'>
                            <Text className='text-base font-bold text-black'>Description: </Text>
                            <Text className='text-black/80'>{category?.description}</Text>
                        </View>

                        <View className='flex-1'>
                            <TaskListByCategory categoryName={categoryName} addTaskModal={addTaskModal} setAddTaskModal={setAddTaskModal} />
                        </View>

                        <AddTaskModal isModalOpen={addTaskModal} setIsModalOpen={setAddTaskModal} category={categoryName} />

                    </View>
                </View>
            </View>
        </View>
    )
}

export default AddTaskScreen;

