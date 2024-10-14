import Adopt from "@/pages/Adopt";
import Home from "@/pages/Home";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

export default function Tabs() {
  
  return (
    <Tab.Navigator>
      <Tab.Screen name="홈" component={Home} />
      <Tab.Screen name="입양 대기 동물" component={Adopt} />
    </Tab.Navigator>
  );
}