import Home from "../pages/Home";
import Adopt from "../pages/Adopt";
import Story from "../pages/Story";
import Map from "../pages/Map";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CustomTabBar from "./CustomTabBar";
import { useMenu } from '../MenuProvider';
import Missing from "../pages/Missing";
import Community from "../pages/Community";

const Tab = createMaterialTopTabNavigator();

export default function Tabs(props) {

  const { menuItems } = props.route.params;
  const { menuActive, setMenuActive } = useMenu(); 

  return (
    <Tab.Navigator 
      initialRouteName="community"
      tabBarPosition="bottom"
      screenOptions={{
        swipeEnabled: false,
        lazy: true,
      }}
      tabBar={ tabBarProps => (
        <>
          <CustomTabBar {...tabBarProps} menuItems={menuItems} />
        </>
      )}
    >
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="adopt" component={Adopt} />
      <Tab.Screen name="story" component={Story} />
      <Tab.Screen name="map" component={Map} />
      <Tab.Screen name="missing" component={Missing} />
      <Tab.Screen name="community" component={Community} />
    </Tab.Navigator>
  );
}