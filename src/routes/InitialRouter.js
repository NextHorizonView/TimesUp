import { createStackNavigator } from "@react-navigation/stack";
import CreateProfileScreen from "../screens/CreateProfileScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import SplashScreen from "../screens/SplashScreen";

const Stack = createStackNavigator();

function InitialStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen component={SplashScreen} name="Splash" />
            <Stack.Screen component={CreateProfileScreen} name="Create Profile" />
            <Stack.Screen component={OnboardingScreen} name="Onboarding" />
        </Stack.Navigator>
    )
}

export default InitialStack;
