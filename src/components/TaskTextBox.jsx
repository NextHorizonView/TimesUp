import { View, Text, TextInput } from 'react-native'
import React from 'react'

const TaskTextBox = ({ value, setValue, isMultiline, isLight, taskLength }) => {
    return (
        <View className={isLight ? 'rounded min-w-[200] bg-white' : 'border-2 rounded min-w-[200] border-black/30'}>
            <TextInput textAlignVertical='top' value={value} onChangeText={setValue} className={isLight ? 'text-base text-black' : 'text-base text-black'} maxLength={isMultiline ? 100 : taskLength} multiline={isMultiline} numberOfLines={isMultiline ? 4 : 1} />
        </View>
    )
}

export default TaskTextBox