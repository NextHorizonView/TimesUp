import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import EditProfile from '../screens/EditProfileScreen';
import DisplayProfileScreen from '../screens/DisplayProfileScreen';

const Stack = createStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Home Screen" component={HomeScreen} />
            <Stack.Screen name="Edit Profile Screen" component={EditProfile} />
            <Stack.Screen name="Display Profile Screen" component={DisplayProfileScreen} />
        </Stack.Navigator>
    )
}

export default HomeStack;
