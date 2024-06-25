import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import LottieView from 'lottie-react-native';

const TaskListItem = ({ task, handleChangeTaskStatus }) => {
    const [shouldDisplay, setShouldDisplay] = useState(false); // Change this condition based on your logic
    const animationRef = useRef(null);

    useEffect(() => {
        if (shouldDisplay) {
            animationRef.current?.play();
        } else {
            animationRef.current?.reset();
        }
    }, [shouldDisplay]);

    const onPress = () => {
        setShouldDisplay(true);
        handleChangeTaskStatus(task["startDate"]);
    }


    return (
        <View className='bg-[#F2F2F2] p-2 my-2 rounded-xl'>
            <View className='flex-row items-center'>
                {shouldDisplay ?
                    <TouchableOpacity onPress={onPress} className='items-center justify-center w-4 h-4 mr-3'>
                        <LottieView loop={false} ref={animationRef} style={{ width: 24, height: 24 }} source={require('../assets/tickAnimation.json')} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={onPress} className='w-4 h-4 mr-3 border-[1px] border-[#D2D2D2]' />
                }
                <View className='pr-8'>
                    <Text className={task.isCompleted ? 'text-black/30' : 'text-black font-bold text-base'}>{task.name}</Text>
                    <Text className={task.isCompleted ? 'text-black/30' : 'text-black'}>{task.description}</Text>
                </View>
            </View>
        </View>
    )
}

export default TaskListItem