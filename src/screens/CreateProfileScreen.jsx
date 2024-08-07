import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import database from '../watermellon.config';
import logoImg from '../assets/logo.png'
import { TextInputField, NumberInputField, DateInputField } from '../components/FormFields';

const CreateProfileScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [isNameValid, setIsNameValid] = useState(true);
  const [profession, setProfession] = useState('');
  const [isProfessionValid, setIsProfessionValid] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
  const [dob, setDob] = useState('')
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
    const existingUser = await database.get('profile').query().fetch();
    await database.write(async () => {
      if (existingUser.length > 0) {
        await Promise.all(existingUser.map(user => user.destroyPermanently()));
      }
      await database.get('profile').create(user => {
        user.name = name;
        user.profession = profession;
        user.phoneNumber = +phoneNumber;
        user.dob = dob;
      })
        .then(() => navigation.replace('Bottom Tab'))
        .catch(err => console.log(err));
    });
  };

  return (
    <View className='justify-end flex-1 bg-[#242424]'>
      <View className='flex-row items-center justify-center h-[35%]'>
        <Image className='mb-10' source={logoImg} />
      </View>
      <View className='w-full h-[65%] pt-10 bg-white'>
        <ScrollView className='px-12'>
          <View className='w-full gap-4'>
            <Text className='mb-4 text-3xl font-bold text-black'>Create Profile</Text>
            <View className='w-full'>
              <TextInputField isValid={isNameValid} setIsValid={setIsNameValid} value={name} setValue={setName} name='Name' />
              <TextInputField isValid={isProfessionValid} setIsValid={setIsProfessionValid} value={profession} setValue={setProfession} name='Profession' />
              <NumberInputField value={phoneNumber} setValue={setPhoneNumber} isValid={isPhoneNumberValid} setIsValid={setIsPhoneNumberValid} name='Phone Number' />
              <DateInputField value={dob} setValue={setDob} isValid={isDobValid} setIsValid={setIsDobValid} name='Date of birth' />
            </View>
            <View className='w-full'>
              <TouchableOpacity onPress={saveUser} className='w-full p-3 rounded-md my-10 bg-[#424242] items-center'>
                <Text className='text-white'>Save Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

export default CreateProfileScreen