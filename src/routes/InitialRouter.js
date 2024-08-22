import { createStackNavigator } from "@react-navigation/stack";
import CreateProfileScreen from "../screens/CreateProfileScreen";
import SplashScreen from "../screens/SplashScreen";

const Stack = createStackNavigator();

function InitialStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen component={SplashScreen} name="Splash" />
            <Stack.Screen component={CreateProfileScreen} name="Create Profile" />
        </Stack.Navigator>
    )
}

export default InitialStack;
