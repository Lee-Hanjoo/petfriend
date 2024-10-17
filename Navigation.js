import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./component/Tabs";
import Missing from "./pages/Missing";
import { ImgPath } from "./ImgPath";
import Menu from "./pages/Menu";
import CustomHeader from "./component/CustomHeader";
import { useEffect, useState } from "react";
import Mypet from "./pages/Mypet";
import Write from "./pages/Write";
import Detail from "./pages/Detail";
import DetailHeader from "./component/DetailHeader";
import { MenuProvider } from './MenuProvider';


const Stack = createNativeStackNavigator();

/* 
    바텀탭이 있으면 Tabs
    없으면 Stack.screen
*/

export default function Navigation() {

  const [menuActive, setMenuActive] = useState('home');
  const menuItems = [
    { title: 'home', icon: ImgPath.home, activeIcon: ImgPath.home_white },
    { title: 'adopt', krTitle:'입양 대기 동물', icon: ImgPath.adopt, activeIcon: ImgPath.adopt_white },
    { title: 'story', krTitle:'스토리', icon: ImgPath.story, activeIcon: ImgPath.story_white },
    { title: 'map', krTitle:'시설 찾기', icon: ImgPath.map, activeIcon: ImgPath.map_white },
    { title: 'missing', krTitle:'실종 동물 찾기 및 신고'},
    { title: 'community', krTitle:'커뮤니티'},
  ];

  // useEffect(()=>{
  //   setMenuActive(menuActive)
  // },[menuActive, menuItems])

  return (
    <MenuProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{
            headerShown: true,
            unmountOnBlur: true,
            header: ({props}) => (
              <CustomHeader {...props} 
                menuActive={menuActive}
                setMenuActive={setMenuActive}
                menuItems={menuItems}
              />
            ),
          }}
          initialParams={{ 
            menuItems 
          }}
        />
        <Stack.Screen
          name="menu"
          component={Menu}
          options={{
            headerShown: true,
            unmountOnBlur: true,
            header: ({props}) => (
              <DetailHeader {...props} 
                menuActive={menuActive}
                setMenuActive={setMenuActive}
                menuItems={menuItems}
              />
            ),
          }}
          initialParams={{ 
            menuItems,
          }}
        />
        <Stack.Screen
          name="mypet"
          component={Mypet}
          options={{
            headerShown: true,
            unmountOnBlur: true,
            header: ({props}) => (
              <DetailHeader {...props} 
                menuActive={menuActive}
                setMenuActive={setMenuActive}
                menuItems={menuItems}
              />
            ),
          }}
          initialParams={{ 
            menuItems 
          }}
        />
        <Stack.Screen
          name="write"
          component={Write}
          options={{
            headerShown: true,
            unmountOnBlur: true,
            header: ({props}) => (
              <DetailHeader {...props} 
                menuActive={menuActive}
                setMenuActive={setMenuActive}
                menuItems={menuItems}
              />
            ),
          }}
          initialParams={{ 
            menuItems 
          }}
        />
        <Stack.Screen
          name="detail"
          component={Detail}
          options={{
            headerShown: true,
            unmountOnBlur: true,
            header: ({props}) => (
              <DetailHeader {...props} 
                menuActive={menuActive}
                setMenuActive={setMenuActive}
                menuItems={menuItems}
              />
            ),
          }}
          initialParams={{ 
            menuItems 
          }}
        />
      </Stack.Navigator>
    </MenuProvider>
  )
}