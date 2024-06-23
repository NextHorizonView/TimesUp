import { View, Text, TextInput } from 'react-native'
import React from 'react'

const TaskTextBox = ({ value, setValue, isMultiline, isLight }) => {
    return (
        <View className={isLight ? 'rounded-xl min-w-[200] bg-white' : 'border-2 rounded-xl min-w-[200] border-black/30'}>
            <TextInput textAlignVertical='top' value={value} onChange={(e) => setValue(e.target.value)} className={isLight ? 'text-base text-black' : 'text-base text-black'} maxLength={isMultiline ? 100 : 20} multiline={isMultiline} numberOfLines={isMultiline ? 4 : 1} />
        </View>
    )
}

export default TaskTextBox