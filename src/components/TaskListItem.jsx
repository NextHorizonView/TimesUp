import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import LottieView from 'lottie-react-native';

const TaskListItem = ({ task, index }) => {
    const [isCompleted, setIsCompleted] = useState(task.isCompleted);
    const tickAnimationRef = useRef(null);

    useEffect(() => {
        if (isCompleted) {
            tickAnimationRef.current?.play();
        }
    }, [isCompleted]);

    const onPress = () => {
        task.toggleCompletion();
        setIsCompleted(!isCompleted);
    }


    return (
        <View className={`bg-[#F2F2F2] p-2 my-2 rounded-xl`}>
            <View className='flex-row items-center gap-4'>
                {isCompleted ?
                    <TouchableOpacity onPress={onPress} className='items-center justify-center w-4 h-4 mr-3'>
                        <LottieView ref={tickAnimationRef} autoPlay={false} loop={false} source={require('../assets/tickAnimation.json')} style={{ width: 32, height: 32 }} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={onPress} className='items-center justify-center w-4 h-4 mr-3'>
                        <View className='p-1 '>
                            <Image width={4} height={4} source={require('../assets/check_box.png')} />
                        </View>
                    </TouchableOpacity>
                }
                <View className='pr-8'>
                    <Text className={isCompleted ? 'text-black/30 font-bold text-base' : 'text-black font-bold text-base'}>Task {index}</Text>
                    <Text className={isCompleted ? 'text-black/30 text-base' : 'text-black text-base'}>{task.body}</Text>
                </View>
            </View>
        </View>
    )
}

export default TaskListItem

