import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./component/Tabs";
import Missing from "./pages/Missing";
import { ImgPath } from "./ImgPath";


const Stack = createNativeStackNavigator();

/* 
    바텀탭이 있으면 Tabs
    없으면 Stack.screen
*/

export default function Navigation() {
  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen
        name="Tabs"
        component={Tabs}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Stack.Screen
        name="missing"
        component={Missing}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
    </Stack.Navigator>
  )
}