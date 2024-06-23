import { View, Text } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const TaskListItem = ({ task }) => {
    return (
        <View className='flex-row'>
            {task.isCompleted ?
                <View className='w-4 h-4 mr-3 bg-[#230BAF] justify-center items-center'>
                    <FontAwesomeIcon icon={faCheck} color='white' />
                </View>
                :
                <View className='w-4 h-4 mr-3 border-[1px] border-[#D2D2D2]' />
            }
            <View className='pr-8'>
                <Text className={task.isCompleted ? 'text-black/30' : 'text-black'}>{task.name}</Text>
                <Text className={task.isCompleted ? 'text-black/30' : 'text-black'}>{task.description}</Text>
            </View>
        </View>
    )
}

export default TaskListItem