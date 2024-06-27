import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import LottieView from 'lottie-react-native';

const TaskListItem = ({ task }) => {
    const [tick, setTick] = useState(false);
    const [isCompleted, setIsCompleted] = useState(task.isCompleted);
    const tickAnimationRef = useRef(null);
    const cancelAnimationRef = useRef(null);

    useEffect(() => {
        if (isCompleted) {
            // cancelAnimationRef.current?.reset();
            tickAnimationRef.current?.play();
        } else {
            // tickAnimationRef.current?.reset();
            cancelAnimationRef.current?.play();
        }
    }, [tick]);

    const onPress = () => {
        task.toggleCompletion();
        setIsCompleted(!isCompleted);
    }


    return (
        <View className='bg-[#F2F2F2] p-2 my-2 rounded-xl'>
            <View className='flex-row items-center gap-4'>
                {isCompleted ?
                    <TouchableOpacity onPress={onPress} className='items-center justify-center w-4 h-4 mr-3'>
                        <LottieView ref={tickAnimationRef} autoPlay={false} loop={false} source={require('../assets/tickAnimation.json')} style={{ width: 32, height: 32 }} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={onPress} className='items-center justify-center w-4 h-4 mr-3'>
                        <LottieView ref={cancelAnimationRef} autoPlay={false} loop={false} source={require('../assets/cancelAnimation.json')} style={{ width: 32, height: 32 }} />
                    </TouchableOpacity>
                }
                <View className='pr-8'>
                    <Text className={isCompleted ? 'text-black/30' : 'text-black font-bold text-base'}>{task.body}</Text>
                </View>
            </View>
        </View>
    )
}

export default TaskListItem

