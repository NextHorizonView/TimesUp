import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeStack from './HomeRoutes'
import CalendarScreen from '../screens/CalendarScreen'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome, faAdd, faCalendar } from '@fortawesome/free-solid-svg-icons'
import ScheduleScreen from '../screens/ScheduleScreen'

const Tab = createBottomTabNavigator();

function BottomTab() {
    return (
        <Tab.Navigator screenOptions={{
            tabBarHideOnKeyboard: true,
            tabBarActiveTintColor: '#ffffff',
            tabBarInactiveTintColor: '#5E5F60',
            tabBarStyle: { backgroundColor: '#2E2E2E', height: 60, paddingBottom: 10, paddingTop: 10, borderTopWidth: 0, },
            headerShown: false,
        }}>

            <Tab.Screen name="Home" component={HomeStack} options={{
                tabBarIcon: ({ color, size }) => <FontAwesomeIcon size={size} color={color} icon={faHome} />,
                headerTitle: 'Home',
            }} />

            <Tab.Screen name="Schedule" component={ScheduleScreen} options={{
                tabBarIcon: ({ color, size }) => <FontAwesomeIcon size={size} color={color} icon={faAdd} />
            }} />

            <Tab.Screen name="Calendar" component={CalendarScreen} options={{
                tabBarIcon: ({ color, size }) => <FontAwesomeIcon size={size} color={color} icon={faCalendar} />
            }} />
        </Tab.Navigator>
    )
}

export default BottomTab;
