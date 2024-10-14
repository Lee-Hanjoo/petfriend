import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./components/Tabs";

const Stack = createNativeStackNavigator();

/* 
    바텀탭이 있으면 Tabs
    없으면 Stack.screen
*/

export default function Navigation() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                name="Tabs"
                component={Tabs}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}