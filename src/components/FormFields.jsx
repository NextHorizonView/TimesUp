import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCalendar, faExclamation } from '@fortawesome/free-solid-svg-icons'
import DatePicker from 'react-native-date-picker'
import { format } from 'date-fns'

export const TextInputField = ({ value, setValue, name, isValid, setIsValid, isDarkTheme }) => {
    const handleBlur = () => {
        if (!value) {
            setIsValid(false);
        } else {
            setIsValid(true);
        }
    };
    const onChangeTextHandler = (text) => {
        setValue(text);
        if (!isValid && text) {
            setIsValid(true);
        }
    }
    return (
        <View>
            <Text className='text-sm font-medium ' style={{ color: isDarkTheme ? '#BDBDBD' : 'black' }}>{name}</Text>
            <View style={{ borderColor: !isValid ? '#dc2626' : `${isDarkTheme ? '#BDBDBD' : 'black'}` }} className='w-full h-12 p-2  border-[1px] border-black rounded-xl relative'>
                <TextInput onBlur={handleBlur} value={value} onChangeText={(text) => onChangeTextHandler(text)} className='p-0 text-sm' style={{ color: isDarkTheme ? 'white' : 'black' }} />
                {!isValid && <View className='absolute font-bold right-2 top-3'>
                    <FontAwesomeIcon size={20} color='#dc2626' icon={faExclamation} />
                </View>}

            </View>
        </View>
    )
}

export const NumberInputField = ({ value, setValue, name, isValid, setIsValid, isDarkTheme }) => {
    const handleBlur = () => {
        if (!value) {
            setIsValid(false);
        } else {
            setIsValid(true);
        }
    };
    const onChangeTextHandler = (text) => {
        setValue(text);
        if (!isValid && text) {
            setIsValid(true);
        }
    }
    return (
        <View className='w-full'>
            <Text className='text-sm font-medium' style={{ color: isDarkTheme ? '#BDBDBD' : 'black' }}>{name}</Text>
            <View style={{ borderColor: !isValid ? '#dc2626' : `${isDarkTheme ? '#BDBDBD' : 'black'}` }} className='w-full h-12 p-2 border-[1px] border-black rounded-xl relative'>
                <TextInput keyboardType='number-pad' maxLength={10} onBlur={handleBlur} value={value} onChangeText={(text) => onChangeTextHandler(text)} className='p-0 text-sm' style={{ color: isDarkTheme ? 'white' : 'black' }} />
                {!isValid && <View className='absolute font-bold right-2 top-3'>
                    <FontAwesomeIcon size={20} color='#dc2626' icon={faExclamation} />
                </View>}

            </View>
        </View>
    )
}

export const DateInputField = ({ value, setValue, name, isValid, setIsValid, isDarkTheme, maxDate, minDate }) => {
    const [openDate, setOpenDate] = useState(false);

    return (
        <View className='w-full'>
            <DatePicker
                mode="date"
                modal
                open={openDate}
                date={value || new Date()}
                onConfirm={(selectedDate) => {
                    selectedDate.setHours(0, 0, 0, 0);
                    setValue(selectedDate);
                    setOpenDate(false);
                    if (!isValid) {
                        setIsValid(true);
                    }
                }}
                onCancel={() => {
                    setOpenDate(false);
                    if (!value) {
                        setIsValid(false);
                    }
                }}
                maximumDate={maxDate || new Date()}
                minimumDate={minDate || ''}
            />
            <Text className='text-sm font-medium' style={{ color: isDarkTheme ? '#BDBDBD' : 'black' }}>{name}</Text>
            <View style={{ borderColor: !isValid ? '#dc2626' : `${isDarkTheme ? '#BDBDBD' : 'black'}`, color: isDarkTheme ? '#ffffff' : 'black' }} className='border-[1px] text-sm border-black rounded-xl flex-row justify-between p-3'>
                <Text className='text-sm' style={{ color: isDarkTheme ? '#ffffff' : 'black' }}>{value ? format(value, 'MMMM d, yyyy') : ''}</Text>
                <TouchableOpacity onPress={() => setOpenDate(true)}>
                    <FontAwesomeIcon size={20} icon={faCalendar} color={isValid ? `${isDarkTheme ? '#BDBDBD' : 'black'}` : '#dc2626'} />
                </TouchableOpacity>
            </View>
        </View>
    )
}