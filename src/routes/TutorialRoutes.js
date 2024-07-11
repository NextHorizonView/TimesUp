import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TutorialHomeScreen from '../screens/TutorialHomeScreen'
import TutorialAddTaskScreen from '../screens/TutorialAddTaskScreen'
import TutorialCalendarScreen from '../screens/TutorialCalendarScreen'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome, faAdd, faCalendar } from '@fortawesome/free-solid-svg-icons'
import { CopilotProvider } from 'react-native-copilot'

const Tab = createBottomTabNavigator();

function TutorialRoutes() {
    return (
        <Tab.Navigator screenOptions={{
            tabBarHideOnKeyboard: true,
            tabBarActiveTintColor: '#ffffff',
            tabBarInactiveTintColor: '#5E5F60',
            tabBarStyle: { backgroundColor: '#2E2E2E', height: 60, paddingBottom: 10, paddingTop: 10, borderTopWidth: 0, },
            headerShown: false,
        }}>

            <Tab.Screen name="Tutorial Home" component={TutorialHomeScreen} options={{
                tabBarIcon: ({ color, size }) => <FontAwesomeIcon size={size} color={color} icon={faHome} />
            }} />

            <Tab.Screen name="Tutorial Add Task" component={TutorialAddTaskScreen} options={{
                tabBarIcon: ({ color, size }) => <FontAwesomeIcon size={size} color={color} icon={faAdd} />
            }} />

            <Tab.Screen name="Tutorial Calendar" component={TutorialCalendarScreen} options={{
                tabBarIcon: ({ color, size }) => <FontAwesomeIcon size={size} color={color} icon={faCalendar} />
            }} />
        </Tab.Navigator>
    )
}

export default TutorialRoutes;
