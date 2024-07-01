import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import LottieView from 'lottie-react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, runOnJS } from 'react-native-reanimated';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const SCREEN_WIDTH = Dimensions.get('window').width;

const TOUCH_SLOP = 5;
const TIME_TO_ACTIVATE_PAN = 400;

const TaskListItem = ({ task, index, handleDelete }) => {
    const [isCompleted, setIsCompleted] = useState(task.isCompleted);
    const tickAnimationRef = useRef(null);

    const offset = useSharedValue({ x: 0, y: 0 });
    const start = useSharedValue({ x: 0, y: 0 });
    const opacity = useSharedValue(0);
    const touchStart = useSharedValue({ x: 0, y: 0, time: 0 });

    const gesture = Gesture.Pan()
        .manualActivation(true)
        .onTouchesDown((e) => {
            touchStart.value = {
                x: e.changedTouches[0].x,
                y: e.changedTouches[0].y,
                time: Date.now(),
            };
        })
        .onTouchesMove((e, state) => {
            if (Date.now() - touchStart.value.time > TIME_TO_ACTIVATE_PAN) {
                state.activate();
            } else if (
                Math.abs(touchStart.value.x - e.changedTouches[0].x) > TOUCH_SLOP ||
                Math.abs(touchStart.value.y - e.changedTouches[0].y) > TOUCH_SLOP
            ) {
                state.fail();
            }
        })
        .onUpdate((e) => {
            if (e.translationX > -100 && e.translationX < 0) {
                offset.value = {
                    x: e.translationX + start.value.x,
                };
                opacity.value = (Math.abs(e.translationX) / 100);
            }
        })
        .onEnd((e) => {
            if (e.translationX < -90) {
                runOnJS(handleDelete)(task.id)
                console.log('Item deleted');
            }
            offset.value = {
                x: 0,
            };
            opacity.value = withTiming(0);
        });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: withSpring(offset.value.x) },
            ]
        };
    });
    const animatedIconStyle = useAnimatedStyle(() => {
        return {
            opacity: withTiming(opacity.value),
        };
    });

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
        <GestureDetector gesture={gesture}>
            <Animated.View className='flex-row items-center' style={[animatedStyle]} >
                <View className={`bg-[#F2F2F2] p-2 my-2 rounded-xl`} style={{ width: SCREEN_WIDTH - 50 }}  >
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
                <Animated.View className='ml-2' style={[animatedIconStyle]}>
                    <FontAwesomeIcon color='red' size={24} icon={faTrash} />
                </Animated.View>
            </Animated.View>
        </GestureDetector>
    )
}

export default TaskListItem

