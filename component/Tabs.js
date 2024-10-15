import Home from "../pages/Home";
import Adopt from "../pages/Adopt";
import Story from "../pages/Story";
import Map from "../pages/Map";
import Menu from "../pages/Menu";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CustomTabBar from "./CustomTabBar";
import CustomHeader from "./CustomHeader";
import { ImgPath } from "../ImgPath";
import { useEffect, useState } from "react";

const Tab = createMaterialTopTabNavigator();

export default function Tabs() {
  
  const [menuActive, setMenuActive] = useState('home');
  const menuItems = [
    { title: 'home', krTitle:'', icon: ImgPath.home, activeIcon: ImgPath.home_white },
    { title: 'adopt', krTitle:'입양 대기 동물', icon: ImgPath.adopt, activeIcon: ImgPath.adopt_white },
    { title: 'story', krTitle:'스토리', icon: ImgPath.story, activeIcon: ImgPath.story_white },
    { title: 'map', krTitle:'시설 찾기', icon: ImgPath.map, activeIcon: ImgPath.map_white },
  ];

  useEffect(()=>{
    setMenuActive(menuActive)
  },[menuActive, menuItems])

  return (
    <Tab.Navigator 
      tabBarPosition="bottom"
      initialRouteName="home"
      screenOptions={{
        swipeEnabled: false,
        lazy: true,
      }}
      tabBar={props => (
        <>
          <CustomHeader {...props} menuItems={menuItems} menuActive={menuActive} setMenuActive={setMenuActive} />
          <CustomTabBar {...props} menuItems={menuItems} menuActive={menuActive} setMenuActive={setMenuActive} />
        </>
      )}
    >
      <Tab.Screen name="home" component={Home} menuActive={menuActive} setMenuActive={setMenuActive}/>
      <Tab.Screen name="adopt" component={Adopt} />
      <Tab.Screen name="story" component={Story} />
      <Tab.Screen name="map" component={Map} />
      <Tab.Screen name="menu" component={Menu} />
    </Tab.Navigator>
  );
}