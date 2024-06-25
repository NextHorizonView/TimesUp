import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAdd, faCheck, faClose, faEdit, faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarOutlined } from '@fortawesome/free-regular-svg-icons';
import TaskDropdown from '../components/TaskDropdown';
import TaskListItem from '../components/TaskListItem';
import TaskTextBox from '../components/TaskTextBox';
import TaskListEditItem from '../components/TaskListEditItem';
import AddTaskModal from '../components/AddTaskModal';
import DatePicker from 'react-native-date-picker';
import { format } from 'date-fns';
import { faClockFour } from '@fortawesome/free-regular-svg-icons';
import AddCategoryModal from '../components/AddCategoryModel';
import EditCategoryModel from '../components/EditCategoryModel';
import { useDispatch, useSelector } from 'react-redux';
import { onChangeTaskStatus } from '../store/category/categorySlice';

const stars = new Array(5).fill(0);
const AddTaskScreen = () => {
    const [addCategoryModel, setAddCategoryModel] = useState(false);
    const [editCategoryModel, setEditCategoryModel] = useState(false);

    const [categoryIndex, setCategoryIndex] = useState(0);
    const [category, setCategory] = useState({});

    const categories = useSelector(state => state.categories);
    const [categoriesDict, setCategoriesDict] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        const temp = []
        for (let i = 0; i < categories?.categoriesList.length; i++) {
            temp.push({ name: categories.categoriesList[i], id: i });
        }
        setCategoriesDict(temp);
    }, [categories]);

    useEffect(() => {
        if (categories) {
            const name = categories.categoriesList[categoryIndex];
            const description = categories[name].description;
            const priority = categories[name].priority;
            let tasks = [];
            if (categories[name].tasks[format(new Date(), "MMMM d, yyyy")]) {
                tasks = categories[name].tasks[format(new Date(), "MMMM d, yyyy")]
            }
            const category = {
                name,
                description,
                priority,
                tasks
            }
            setCategory(category);
        }

        // console.log(category.tasks);
    }, [categories, categoryIndex])

    const onEditCurrentCategory = () => {
        setEditCategoryModel(true);
    }

    const handleChangeTaskStatus = (startDate) => {
        const category = categories.categoriesList[categoryIndex];
        dispatch(onChangeTaskStatus({ category, startDate }));
    }

    return (
        <View className='flex-1 px-2 bg-black'>
            <View className='flex-1 mt-16 bg-[#4938B5] rounded-[78px] pt-4'>
                <View className='bg-white rounded-t-[48px] flex-1 relative'>
                    <View className='flex-row justify-end m-4'>
                        <TouchableOpacity onPress={() => onEditCurrentCategory(true)} className='bg-[#DBD7F2] rounded-full w-12 h-12 justify-center items-center'>
                            <FontAwesomeIcon icon={faEdit} size={24} color='#230BAF' />
                        </TouchableOpacity>
                    </View>

                    <View className='px-4'>
                        <AddCategoryModal isModalOpen={addCategoryModel} setIsModalOpen={setAddCategoryModel} />
                        <EditCategoryModel isModalOpen={editCategoryModel} setIsModalOpen={setEditCategoryModel} categoryDetails={category} />
                        <View className='flex-row items-center justify-center mt-4'>
                            <TaskDropdown categories={categoriesDict} selectedCategory={categoryIndex} setCategoryIndex={setCategoryIndex} />
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
                        <ScrollView>
                            <View className='mt-2'>
                                <View className=''>
                                    {category.tasks?.map((task, key) =>
                                        <TaskListItem handleChangeTaskStatus={handleChangeTaskStatus} task={task} key={key} />
                                    )}
                                </View>
                            </View>
                        </ScrollView>

                    </View>

                    {/* <AddTaskModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} task={tasks[0]} /> */}
                </View>
            </View>
        </View>
    )
}

export default AddTaskScreen
{/* <TouchableOpacity onPress={() => handleChangeTaskStatus(task["startDate"])} key={key} className='bg-[#F2F2F2] p-2 my-2 rounded-xl'>
</TouchableOpacity> */}