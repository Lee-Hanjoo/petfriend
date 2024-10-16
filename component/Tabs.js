import Home from "../pages/Home";
import Adopt from "../pages/Adopt";
import Story from "../pages/Story";
import Map from "../pages/Map";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CustomTabBar from "./CustomTabBar";
import CustomHeader from "./CustomHeader";
import Mypet from "../pages/Mypet";
import { useEffect, useState } from "react";
import { ImgPath } from "../ImgPath";

const Tab = createMaterialTopTabNavigator();

export default function Tabs(props) {

  const { menuActive, setMenuActive, menuItems } = props.route.params;

  return (
    <Tab.Navigator 
      initialRouteName="home"
      tabBarPosition="bottom"
      screenOptions={{
        swipeEnabled: false,
        lazy: true,
      }}
      tabBar={ tabBarProps => (
        <>
          <CustomTabBar {...tabBarProps} menuItems={menuItems} menuActive={menuActive} setMenuActive={setMenuActive} />
        </>
      )}
    >
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="adopt" component={Adopt} />
      <Tab.Screen name="story" component={Story} />
      <Tab.Screen name="map" component={Map} />
    </Tab.Navigator>
  );
}