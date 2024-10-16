import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ImgPath } from '../ImgPath';
import { Pressable } from 'react-native';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMenu } from '../MenuProvider';

const CustomHeader = ({ menuItems }) => {

  const navigation = useNavigation();
  const { menuActive, setMenuActive, previousMenuActive } = useMenu(); 


  useEffect(()=>{
    if(menuActive === ('write' || menuActive === 'detail' || menuActive === 'menu')) {
      setMenuActive(previousMenuActive)
    }
  },[])

  return (
    <View 
      style={[
        styles.CustomHeaderWrap, 
        menuActive !== 'home' && styles.CustomHeaderWrapDetail,
        menuActive === 'write' || menuActive === 'detail' || menuActive === 'mypet' && styles.CustomHeaderDetailWrap
      ]}
    >
      <View>
        {
          menuActive === 'home' ? 
            <Image source={ImgPath.logo_black}/>
          :
            <View style={styles.titleWrap}>
              {menuItems.map((item, i) => {
                if (item.title === menuActive) {
                  return (
                    <View style={styles.titleWrap} key={i}>
                      <Text style={styles.title}>{item.krTitle}</Text>
                      <Text style={styles.desc}>{item.title}</Text>
                    </View>
                  )
                }
              })}
          </View>
        }
      </View>
      <Pressable>
        <Image source={ImgPath.alarm} />
        <View style={styles.alarmUnread}></View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    CustomHeaderWrap: {  
      flexDirection: 'row',  
      width: '100%',
      padding: 20,
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#fff',
      zIndex: 999,
      borderBottomWidth: 1,
      borderColor: '#E7E9ED'
    },
    CustomHeaderWrapDetail: {
      borderBottomWidth: 1,
    },
    CustomHeaderDetailWrap: {
      justifyContent: 'center',
      position: 'relative'
    },
    titleWrap: {
      flexDirection: 'row',
      alignItems: 'flex-end'
    },
    title: {
      fontSize: 20,
      lineHeight: 24,
      fontWeight: '700',
      marginRight: 8
    },
    desc: {
      fontSize: 12,
      color: '#8D96A4'
    },
    alarmUnread: {
      width: 10,
      height: 10,
      borderWidth: 2,
      borderColor: '#fff',
      backgroundColor: '#EE815E',
      position: 'absolute',
      right: 1,
      top: 4,
      borderRadius: '50%',
    },
    backBtn: {
      position: 'absolute',
      left: 0,
      top: 0
    },
  });
  
export default CustomHeader