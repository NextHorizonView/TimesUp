import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeStack from './HomeRoutes'
import AddTaskScreen from '../screens/AddTaskScreen'
import CalendarScreen from '../screens/CalendarScreen'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome, faAdd, faCalendar } from '@fortawesome/free-solid-svg-icons'
import { View } from 'react-native'

const Tab = createBottomTabNavigator();

function BottomTab() {
    return (
        <Tab.Navigator screenOptions={{
            tabBarActiveTintColor: '#ffffff',
            tabBarInactiveTintColor: '#5E5F60',
            tabBarStyle: { backgroundColor: '#2E2E2E', height: 60, paddingBottom: 10, paddingTop: 10, borderTopWidth: 0, },
            headerShown: false,
        }}>

            <Tab.Screen name="Home Stack" component={HomeStack} options={{
                tabBarIcon: ({ color, size }) => <FontAwesomeIcon size={size} color={color} icon={faHome} />
            }} />

            <Tab.Screen name="Add Task" component={AddTaskScreen} options={{
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

            <Tab.Screen name="Calendar" component={CalendarScreen} options={{
                tabBarIcon: ({ color, size }) => <FontAwesomeIcon size={size} color={color} icon={faCalendar} />
            }} />
        </Tab.Navigator>
    )
}

export default BottomTab;
