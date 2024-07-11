import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEdit, faStar, faAdd } from '@fortawesome/free-solid-svg-icons';
import { faSquarePlus, faStar as faStarOutlined } from '@fortawesome/free-regular-svg-icons';
import TaskDropdown from '../components/TaskDropdown';
import { useDatabase } from '../context/DatabaseContext';

const SCREEN_WIDTH = Dimensions.get('window').width;


const data = [
  {
    description: 'Add a new category, such as "Work," to organize related tasks.',
  },
  {
    description: 'Edit the selected category here.',
  },
  {
    description: 'Change the category using this dropdown menu.',
  },
  {
    description: 'Complete or delete a task by holding it for 2 seconds and swiping left.',
  }
];

const stars = new Array(5).fill(0);
const TutorialAddTaskScreen = ({ navigation }) => {
  const [categoryName, setCategoryName] = useState('');
  const [category, setCategory] = useState({});

  const { getCategoryByName, switchOfTutorial } = useDatabase();

  const [step, setStep] = useState(0);

  const onNextHandler = () => {
    if (step === data.length - 1) {
      navigation.navigate('Tutorial Calendar')
    } else {
      setStep(step + 1);
    }
  }

  const onSkipHandler = () => {
    navigation.navigate('Bottom Tab');
    switchOfTutorial();
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
      <View className='flex-1 bg-[#4938B5] rounded-[78px] pt-4'>
        <View className='absolute left-0 right-0 z-10 flex-1 top-0 bottom-0'>
          <View className='p-4 bg-[#333a67] absolute bottom-8 left-4 right-4'>
            <Text className='text-white font-bold text-xl'>Task Page</Text>
            <Text>{data[step].description}</Text>
            <View className='flex-row gap-4 mt-2'>
              <TouchableOpacity onPress={onNextHandler} className='mt-2 bg-[#1f233f] w-24 h-8 items-center justify-center rounded'>
                <Text className='text-white font-bold'>Next</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onSkipHandler} className='mt-2 bg-[#1f233f] w-24 h-8 items-center justify-center rounded'>
                <Text className='text-white font-bold'>Skip Tutorial</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className='bg-purple-100 rounded-t-[48px] flex-1 relative'>


          <View className='flex-row-reverse justify-between m-4'>
            <TouchableOpacity className='flex-row items-center justify-center p-2 bg-purple-300 rounded-xl'>
              <FontAwesomeIcon icon={faEdit} size={18} color='#230BAF' />
              <Text className='ml-2 text-[#230BAF]'>Edit Category</Text>
            </TouchableOpacity>
            <TouchableOpacity className='flex-row items-center justify-center p-2 bg-purple-300 rounded-xl'>
              <FontAwesomeIcon icon={faSquarePlus} size={18} color='#230BAF' />
              <Text className='ml-2 text-[#230BAF]'>Add Category</Text>
            </TouchableOpacity>

            {step === 0 && <View className='absolute left-0 -bottom-12 bg-[#333a67] rounded p-2'>
              <View className='bg-white w-0 h-0 right-0 absolute -top-2' style={{ borderLeftWidth: 6, borderRightWidth: 6, borderBottomWidth: 12, borderStyle: 'solid', backgroundColor: 'transparent', borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: '#333a67' }} />
              <Text className='text-white'>Add Category</Text>
            </View>}

            {step === 1 && <View className='absolute -bottom-12 bg-[#333a67] rounded p-2'>
              <View className='bg-white w-0 h-0 absolute -top-2' style={{ borderLeftWidth: 6, borderRightWidth: 6, borderBottomWidth: 12, borderStyle: 'solid', backgroundColor: 'transparent', borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: '#333a67' }} />
              <Text className='text-white'>Edit Category</Text>
            </View>}

          </View>

          <View className='flex-1 px-4'>
            <View className='flex-row items-center justify-center'>
              <TaskDropdown categoryName={categoryName} setCategoryName={setCategoryName} />

              {step === 2 && <View className='absolute -bottom-12 bg-[#333a67] rounded p-2 z-10'>
                <View className='bg-white w-0 h-0 absolute -top-2' style={{ borderLeftWidth: 6, borderRightWidth: 6, borderBottomWidth: 12, borderStyle: 'solid', backgroundColor: 'transparent', borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: '#333a67' }} />
                <Text className='text-white'>Change Category</Text>
              </View>}

            </View>
            <View className='flex-row justify-center gap-4 mt-2'>
              {stars.map((_, key) => <FontAwesomeIcon key={key} icon={faStar} color='#F7DC6F' />
              )}
            </View>

            <View className='mt-4'>
              <Text className='text-base font-bold text-black'>Description: </Text>
              <Text className='text-black/80'>All your task related to work will go here</Text>
            </View>

            <View className={`bg-[#F2F2F2] p-2 my-2 rounded-xl`} style={{ width: SCREEN_WIDTH - 50 }}  >
              <View className='flex-row items-center gap-4'>

                <TouchableOpacity className='items-center justify-center w-4 h-4 mr-3'>
                  <View className='p-1 '>
                    <Image width={4} height={4} source={require('../assets/check_box.png')} />
                  </View>
                </TouchableOpacity>

                <View className='pr-8'>
                  <Text className='text-black font-bold text-base'>Task 1</Text>
                  <Text className='text-black text-base'>Comple all your work</Text>
                </View>
                {step === 3 && <View className='absolute left-0 -bottom-12 bg-[#333a67] rounded p-2'>
                  <View className='bg-white w-0 h-0 right-0 absolute -top-2' style={{ borderLeftWidth: 6, borderRightWidth: 6, borderBottomWidth: 12, borderStyle: 'solid', backgroundColor: 'transparent', borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: '#333a67' }} />
                  <Text className='text-white'>Add Category</Text>
                </View>}
              </View>
            </View>

          </View>
        </View>
      </View>
    </View>

  )
}

export default TutorialAddTaskScreen;

