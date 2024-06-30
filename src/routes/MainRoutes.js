import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTab from "./BottomRoutes";
import InitialStack from "./InitialRouter";
import EditProfile from "../screens/EditProfileScreen";

const Stack = createStackNavigator();

function MainRoutes() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen component={InitialStack} name="Initial Stack" />
                <Stack.Screen component={BottomTab} name="Bottom Tab" />
                <Stack.Screen component={EditProfile} name="Edit Profile" />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainRoutes;
