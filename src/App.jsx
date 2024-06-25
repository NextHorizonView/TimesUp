import { View, Text, Platform } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome, faCalendar, faAdd } from '@fortawesome/free-solid-svg-icons'

import HomeScreen from './screens/HomeScreen'
import AddTaskScreen from './screens/AddTaskScreen'
import CalendarScreen from './screens/CalendarScreen'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './store/store'
import { SafeAreaView } from 'react-native-safe-area-context'

const BottomTab = createBottomTabNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaView className='flex-1'>
          <NavigationContainer>
            <BottomTab.Navigator screenOptions={{
              tabBarActiveTintColor: '#ffffff',
              tabBarInactiveTintColor: '#5E5F60',
              tabBarStyle: { backgroundColor: '#2E2E2E', height: 60, paddingBottom: 10, paddingTop: 10, borderTopWidth: 0, },
              headerShown: false,

            }}>
              <BottomTab.Screen name="Home" component={HomeScreen} options={{
                tabBarIcon: ({ color, size }) => <FontAwesomeIcon size={size} color={color} icon={faHome} />
              }} />
              <BottomTab.Screen name="Add Task" component={AddTaskScreen} options={{
                tabBarIcon: ({ color, size, focused }) => <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: focused ? '#26252C' : '#2E2E2E',
                    width: Platform.OS == "ios" ? 70 : 60,
                    height: Platform.OS == "ios" ? 50 : 60,
                    top: Platform.OS == "ios" ? -10 : -20,
                    borderRadius: Platform.OS == "ios" ? 25 : 30
                  }}
                >
                  <FontAwesomeIcon size={size} color={color} icon={faAdd} />
                </View>
              }} />
              <BottomTab.Screen name="Calendar" component={CalendarScreen} options={{
                tabBarIcon: ({ color, size }) => <FontAwesomeIcon size={size} color={color} icon={faCalendar} />
              }} />
            </BottomTab.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  )
}

export default App
