import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';

const TodayTask = ({ name, category, priority, isDue, due, startTime, isCompleted, navigateToTaskScreen }) => {

    const activeStars = new Array(priority).fill(0);
    const inActiveStars = new Array(5 - priority).fill(0);

    return (
        <TouchableOpacity onPress={() => navigateToTaskScreen(category)} className='p-2 my-4 gap-2 rounded-2xl min-h-[180] justify-between mx-2' style={{ backgroundColor: isDue ? '#BB6565' : isCompleted ? '#65BB78' : '#7165BB' }}>
            <View>
                <Text className='text-lg font-bold text-white'>{name}</Text>
                <Text className='text-white'>{category}</Text>
                <View className='mt-2'>
                    <Text className='font-bold text-white'>{format(startTime, 'MMMM dd, hh:mm')} - {format(due, 'MMMM dd, hh:mm')}</Text>
                </View>
            </View>
            <View className='border-t-[1px] border-white/30 flex-row p-2 gap-2 mx-1'>
                {activeStars.map((_, key) => <FontAwesomeIcon color='#EEBA00' size={18} icon={faStar} key={key} />)}
                {inActiveStars.map((_, key) => <FontAwesomeIcon color='#D9D9D9' size={18} icon={faStar} key={key} />)}
            </View>
        </TouchableOpacity>
    )
}

export default TodayTask