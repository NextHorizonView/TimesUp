import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome, faCalendar, faAdd } from '@fortawesome/free-solid-svg-icons'

import HomeScreen from './screens/HomeScreen'
import AddTaskScreen from './screens/AddTaskScreen'
import CalendarScreen from './screens/CalendarScreen'

const BottomTab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <BottomTab.Navigator screenOptions={{
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#5E5F60',
        tabBarStyle: { backgroundColor: '#2E2E2E', height: 60, paddingBottom: 10, paddingTop: 10 },
        headerShown: false,

      }}>
        <BottomTab.Screen name="Home" component={HomeScreen} options={{
          tabBarIcon: ({ color, size }) => <FontAwesomeIcon size={size} color={color} icon={faHome} />
        }} />
        <BottomTab.Screen name="Add Task" component={AddTaskScreen} options={{
          tabBarIcon: ({ color, size }) => <FontAwesomeIcon size={size} color={color} icon={faAdd} />
        }} />
        <BottomTab.Screen name="Calendar" component={CalendarScreen} options={{
          tabBarIcon: ({ color, size }) => <FontAwesomeIcon size={size} color={color} icon={faCalendar} />
        }} />
      </BottomTab.Navigator>
    </NavigationContainer>
  )
}

export default App