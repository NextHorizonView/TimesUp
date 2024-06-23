import { View, Text } from 'react-native'
import React from 'react'

const TaskListEditItem = ({ task }) => {
    return (
        <View className='rounded'>
            <Text className='my-2 text-lg text-black rounded'>
                {task.name}
            </Text>
            <Text className='my-2 text-black rounded'>
                {task.description}
            </Text>
        </View>
    )
}

export default TaskListEditItem;