import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Dimensions } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import database from '../watermellon.config';
import { withObservables } from '@nozbe/watermelondb/react';
import { DateInputField, NumberInputField, TextInputField, PhoneInputField } from '../components/FormFields';
import welcomeImg from '../assets/rafiki.png'

const EditProfileScreen = ({ user, navigation }) => {
    const [name, setName] = useState(user[0].name || '');
    const [isNameValid, setIsNameValid] = useState(true);
    const [profession, setProfession] = useState(user[0].profession || '');
    const [isProfessionValid, setIsProfessionValid] = useState(true);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [cca2, setCca2] = useState(user[0].countryCode || '');
    const [callingCode, setCallingCode] = useState(user[0].countryCode || '');
    const [phoneNumber, setPhoneNumber] = useState(user[0].phoneNumber || '');
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
    const [dob, setDob] = useState(user[0].dob || '')
    const [isDobValid, setIsDobValid] = useState(true)

    const saveUser = async () => {
        if (name.length === 0) {
            setIsNameValid(false);
        } if (profession.length === 0) {
            setIsProfessionValid(false);
        } if (phoneNumber.length === 0) {
            setIsPhoneNumberValid(false);
        } if (dob.length === 0) {
            setIsDobValid(false);
        }
        if (name.length === 0 || profession.length === 0 || phoneNumber.length === 0 || dob.length === 0) {
            return;
        }

        await database.write(async () => {
            await user[0].update(user => {
                user.name = name;
                user.profession = profession;
                user.phoneNumber = phoneNumber;
                user.countryCode = cca2;
                user.dob = dob;
            }
            );
        })

        navigation.navigate('Home Screen');
    }

    return (
        <View className='flex-1 w-full bg-black pt-14'>
            <View className='flex-row items-center gap-3 px-8'>
                <TouchableOpacity onPress={() => navigation.navigate('Display Profile Screen')}>
                    <FontAwesomeIcon color='#ffffff' size={24} icon={faAngleLeft} />
                </TouchableOpacity>
                <Text className='text-2xl font-bold text-white'>Edit Profile</Text>
            </View>
            <View className='flex-1 w-full mt-4'>
                <ScrollView contentContainerStyle={{ flex: 1 }} className='w-full'>
                    <View className='justify-between flex-1 w-full px-12 pb-3'>
                        <View className='w-full gap-2 pt-4'>
                            <TextInputField isDarkTheme={true} isValid={isNameValid} setIsValid={setIsNameValid} value={name} setValue={setName} name='Name' />
                            <TextInputField isDarkTheme={true} isValid={isProfessionValid} setIsValid={setIsProfessionValid} value={profession} setValue={setProfession} name='Profession' />
                            <PhoneInputField isDarkTheme={true} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} isPhoneNumberValid={isPhoneNumberValid} setIsPhoneNumberValid={setIsPhoneNumberValid} cca2={cca2} setCca2={setCca2} callingCode={callingCode} setCallingCode={setCallingCode} />
                            <DateInputField isDarkTheme={true} value={dob} setValue={setDob} isValid={isDobValid} setIsValid={setIsDobValid} name='Date of birth' />
                        </View>
                        <View className='items-center justify-center w-full'>
                            <Image source={welcomeImg} />
                            <Text className='mt-4 text-sm font-medium text-center text-white'>Edit your profile.</Text>
                        </View>
                        <TouchableOpacity onPress={saveUser} className='bg-[#424242] w-full p-3 rounded-md'>
                            <View className='items-center justify-center '>
                                <Text className='text-white'>Save Changes</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}


const enhance = withObservables([], () => ({
    user: database.get('profile').query().observeWithColumns(['name', 'profession', 'phone_number', 'dob']),
}));

const EnhanceEditProfileScreen = enhance(EditProfileScreen);

export default EnhanceEditProfileScreen;

