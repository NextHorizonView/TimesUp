import { createStackNavigator } from "@react-navigation/stack";
import CreateProfileScreen from "../screens/CreateProfileScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import SplashScreen from "../screens/SplashScreen";
import TutorialRoutes from "./TutorialRoutes";

const Stack = createStackNavigator();

function InitialStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen component={SplashScreen} name="Splash" />
            <Stack.Screen component={CreateProfileScreen} name="Create Profile" />
            <Stack.Screen component={OnboardingScreen} name="Onboarding" />
            <Stack.Screen component={TutorialRoutes} name="Tutorial" />
        </Stack.Navigator>
    )
}

export default InitialStack;
