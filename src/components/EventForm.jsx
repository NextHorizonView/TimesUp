import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import database from '../watermellon.config';
import { DateInputField, TextInputField } from '../components/FormFields';

const EventForm = ({ event, bottomSheetRef, selectedDate }) => {
    const [name, setName] = useState('');
    const [isNameValid, setIsNameValid] = useState(true);
    const [description, setDescription] = useState('');
    const [isDescriptionValid, setIsDescriptionValid] = useState(true);
    const [date, setDate] = useState(selectedDate || '');
    const [isDateValid, setIsDateValid] = useState(true);

    useEffect(() => {
        if (event) {
            setName(event.name);
            setDescription(event.description);
            setDate(event.date);
        } else {
            setName('');
            setDescription('');
            setDate(selectedDate);
        }
    }, [event])


    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    const saveEvent = async () => {
        if (name.length === 0) {
            setIsNameValid(false);
        } if (description.length === 0) {
            setIsDescriptionValid(false);
        } if (date.length === 0) {
            setIsDateValid(false);
        }
        if (name.length === 0 || description.length === 0 || date.length === 0) {
            return;
        }
        await database.write(async () => {
            await database.get('events').create(event => {
                event.name = name;
                event.description = description;
                event.date = date;
            })
                .then(() => {
                    bottomSheetRef.current?.close();
                    setName('');
                    setDescription('');
                    setDate('');
                })
                .catch(err => console.log(err));
        });
    }

    const updateEvent = async () => {
        if (name.length === 0) {
            setIsNameValid(false);
        } if (description.length === 0) {
            setIsDescriptionValid(false);
        } if (date.length === 0) {
            setIsDateValid(false);
        }
        if (name.length === 0 || description.length === 0 || date.length === 0) {
            return;
        }
        await database.write(async () => {
            await event.update(event => {
                event.name = name;
                event.description = description;
                event.date = date;
            })
                .then(() => {
                    bottomSheetRef.current?.close();
                    setName('');
                    setDescription('');
                    setDate('');
                })
                .catch(err => console.log(err));
        });
    }

    const deleteEvent = async () => {
        await database.write(async () => {
            await event.destroyPermanently()
                .then(() => {
                    bottomSheetRef.current?.close();
                    setName('');
                    setDescription('');
                    setDate('');
                })
                .catch(err => console.log(err));
        });
    }

    return (
        <View className='flex-1 p-7'>
            <Text className='text-lg font-bold text-black'>Event</Text>
            <View className='justify-between flex-1 gap-4 mt-4'>
                <View className='gap-2'>
                    <TextInputField value={name} setValue={setName} name='Event Name' isValid={isNameValid} setIsValid={setIsNameValid} isDarkTheme={false} />
                    <TextInputField value={description} setValue={setDescription} name='Description' isValid={isDescriptionValid} setIsValid={setIsDescriptionValid} isDarkTheme={false} />
                    <DateInputField minDate={new Date()} maxDate={maxDate} isMinDate={false} value={date} setValue={setDate} name='Date' isValid={isDateValid} setIsValid={setIsDateValid} isDarkTheme={false} />
                </View>
                {event ?
                    <View className='gap-2'>
                        <TouchableOpacity activeOpacity={0.7} onPress={updateEvent}>
                            <View className='items-center justify-center p-3 bg-[#424242] rounded-xl'>
                                <Text className='text-lg font-bold text-white'>Update</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} onPress={deleteEvent}>
                            <View className='items-center justify-center p-3 bg-red-500 rounded-xl'>
                                <Text className='text-lg font-bold text-white'>Delete</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    :
                    <TouchableOpacity activeOpacity={0.7} onPress={saveEvent}>
                        <View className='items-center w-full justify-center p-3 bg-[#424242] rounded-xl'>
                            <Text className='text-lg font-bold text-white'>Save</Text>
                        </View>
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

export default EventForm

