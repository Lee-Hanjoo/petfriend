import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import { ImgPath } from '../ImgPath'
import { useNavigation } from '@react-navigation/native';
import { useMenu } from '../MenuProvider';

const CustomTabBar = ({menuItems}) => {
    
  const navigation = useNavigation();
  const { menuActive, setMenuActive } = useMenu(); 

  return (
    <View style={styles.container}>
      <View style={styles.menuList}>
        {
          menuItems.filter(item => item.title !== 'missing' && item.title !== 'community').map((item,i) => (
            <Pressable
              key={i}
              style={menuActive === item.title ? styles.active : ''}
              onPress={() => {
                setMenuActive(item.title);
                navigation.navigate(item.title);
              }}
            >
              {menuActive === item.title ? (
                <>
                  <Image source={item.activeIcon} />
                  <Text style={styles.textActive}>{item.title}</Text>
                </>
              ) : (
                <Image source={item.icon} />
              )}
            </Pressable>
          ))
        }
        <Pressable 
          style={[styles.menu]} 
          onPress={() => {setMenuActive('menu'); navigation.navigate('menu')}}
        >
          <Image source={ImgPath.menu} />
        </Pressable>
      </View>
      { (menuActive === 'story' || menuActive === 'missing') &&
        <Pressable style={styles.writeBtn} 
          onPress={()=>{
            setMenuActive('write');
            navigation.navigate('write')
          }}
        >
          <Image source={ImgPath.write} />
        </Pressable>
      }
    </View>
  )
}

export default CustomTabBar



const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 64,
        padding: 12,
        backgroundColor: '#fff',
        position: 'fixed',
        left: 0,
        bottom: 0,
        borderTopWidth: 1,
        borderColor: '#E7E9ED',
    },
    menuList: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    active: {
      width: 100,
      flexDirection: 'row',
      backgroundColor: '#64C7FA',
      paddingVertical: 8,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 999,
    },
    textActive: {
      paddingHorizontal: 4,
      fontSize: 12,
      fontWeight: '700',
      color: '#fff',
      textTransform: 'uppercase',
    },
    menu: {
      padding: 8,
      backgroundColor: 'rgba(231,233,237,0.4)',
      borderRadius: 8
    },
    activeMenu: {
      backgroundColor: '#64C7FA',
    },
    writeBtn: {
      width: 44,
      height: 44,
      borderRadius: 999,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#64C7FA',
      position: 'absolute',
      right: 20,
      bottom: 120,
      shadowColor: '#1F2329',
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 12,
      elevation: 4, // Android
    },
  });