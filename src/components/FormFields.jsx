import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCalendar, faClock, faExclamation, faStar } from '@fortawesome/free-solid-svg-icons'
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
            <View style={{ borderColor: !isValid ? '#dc2626' : `${isDarkTheme ? '#BDBDBD' : 'black'}` }} className='w-full h-12 p-2  border-[1px] rounded-xl relative'>
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
            <View style={{ borderColor: !isValid ? '#dc2626' : `${isDarkTheme ? '#BDBDBD' : 'black'}` }} className='w-full h-12 p-2 border-[1px] rounded-xl relative'>
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
            <View style={{ borderColor: !isValid ? '#dc2626' : `${isDarkTheme ? '#BDBDBD' : 'black'}`, color: isDarkTheme ? '#ffffff' : 'black' }} className='border-[1px] text-sm rounded-xl flex-row justify-between p-3'>
                <Text className='text-sm' style={{ color: isDarkTheme ? '#ffffff' : 'black' }}>{value ? format(value, 'MMMM d, yyyy') : ''}</Text>
                <TouchableOpacity onPress={() => setOpenDate(true)}>
                    <FontAwesomeIcon size={20} icon={faCalendar} color={isValid ? `${isDarkTheme ? '#BDBDBD' : 'black'}` : '#dc2626'} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export const DateTimeInputField = ({ value, setValue, name, isValid, setIsValid, isDarkTheme, maxDate, minDate }) => {
    const [openDate, setOpenDate] = useState(false);

    return (
        <View className='w-full'>
            <DatePicker
                mode="time"
                modal
                open={openDate}
                date={value || new Date()}
                onConfirm={(selectedDate) => {
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
            />
            <Text className='text-sm font-medium' style={{ color: isDarkTheme ? '#BDBDBD' : 'black' }}>{name}</Text>
            <View style={{ borderColor: !isValid ? '#dc2626' : `${isDarkTheme ? '#BDBDBD' : 'black'}`, color: isDarkTheme ? '#ffffff' : 'black' }} className='border-[1px] text-sm  rounded-xl flex-row justify-between p-3'>
                <Text className='text-sm' style={{ color: isDarkTheme ? '#ffffff' : 'black' }}>{value ? format(value, 'MMMM d, yyyy h:mm a') : ''}</Text>
                <TouchableOpacity onPress={() => setOpenDate(true)}>
                    <FontAwesomeIcon size={20} icon={faCalendar} color={isValid ? `${isDarkTheme ? '#BDBDBD' : 'black'}` : '#dc2626'} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export const TimeInputField = ({ value, setValue, name, isValid, setIsValid, isDarkTheme, minTime }) => {
    const [openDate, setOpenDate] = useState(false);

    return (
        <View className='w-full'>
            <DatePicker
                mode="time"
                modal
                open={openDate}
                date={value || new Date()}
                minimumDate={minTime || ''}
                onConfirm={(selectedDate) => {
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
            />
            <Text className='text-sm font-medium' style={{ color: isDarkTheme ? '#BDBDBD' : 'black' }}>{name}</Text>
            <View style={{ borderColor: !isValid ? '#dc2626' : `${isDarkTheme ? '#BDBDBD' : 'black'}` }} className='border-[1px] text-sm rounded-xl flex-row justify-between p-3'>
                <Text className='text-sm' style={{ color: isDarkTheme ? '#ffffff' : 'black' }}>{value ? format(value, 'h:mm a') : ''}</Text>
                <TouchableOpacity onPress={() => setOpenDate(true)}>
                    <FontAwesomeIcon size={20} icon={faClock} color={isValid ? `${isDarkTheme ? '#BDBDBD' : 'black'}` : '#dc2626'} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export const PriorityInputField = ({ value, setValue, name }) => {
    const starsArray = [1, 2, 3, 4, 5];
    return (
        <View>
            <Text className='text-sm font-medium text-black'>{name}</Text>
            <View className='flex-row gap-1'>
                {starsArray.map((star, index) => {
                    return (
                        <TouchableOpacity key={index} onPress={() => setValue(star)}>
                            <FontAwesomeIcon size={20} icon={faStar} color={star > value ? '#D9D9D9' : value === 3 ? '#DF9620' : value < 3 ? '#DB4837' : '#15A217'} />
                        </TouchableOpacity>
                    )
                })}
            </View>
        </View>
    )
}