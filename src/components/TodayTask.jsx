import { View, Text } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const TodayTask = ({ name, description, priority }) => {
    const activeStars = new Array(priority).fill(0);
    const inActiveStars = new Array(5 - priority).fill(0);

    return (
        <View className='bg-[#7165BB] p-2 my-4 gap-2 rounded-2xl min-h-[180] justify-between mx-2'>
            <View>
                <Text className='text-lg font-bold text-white'>{name}</Text>
                <Text className='text-white'>{description}</Text>
            </View>
            <View className='border-t-[1px] border-white/30 flex-row p-2 gap-2 mx-1'>
                {activeStars.map((_, key) => <FontAwesomeIcon color='#EEBA00' size={18} icon={faStar} key={key} />)}
                {inActiveStars.map((_, key) => <FontAwesomeIcon color='#D9D9D9' size={18} icon={faStar} key={key} />)}
            </View>
        </View>
    )
}

export default TodayTask