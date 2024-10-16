import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ImgPath } from '../ImgPath';
import { Pressable } from 'react-native';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMenu } from '../MenuProvider';

const CustomHeader = ({ menuItems }) => {

  const navigation = useNavigation();
  const { menuActive, setMenuActive } = useMenu(); 

  return (
    <View 
      style={[
        styles.CustomHeaderWrap, 
        menuActive !== 'home' && styles.CustomHeaderWrapDetail,
        menuActive === ( 'write' || 'detail' || 'mypet') && styles.CustomHeaderDetailWrap
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
        {
          menuActive === 'menu' &&
          <Pressable style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
            <Text style={styles.menuText}>로그인</Text>
            <Image source={ImgPath.login}/>
          </Pressable>
        }
      </View>
        <View style={styles.rowWrap}>
          {
            menuActive === 'menu' &&
            <Pressable style={styles.settingBtn} onPress={()=>{setMenuActive('mypet'); navigation.navigate('mypet') }}>
              <Image source={ImgPath.setting_black} />
            </Pressable>
          }
          <Pressable style={styles.alarmWrap}>
            <Image source={ImgPath.alarm} />
            <View style={styles.alarmUnread}></View>
          </Pressable>
        </View>
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
      borderBottomWidth: 4,
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
    alarmWrap: {
      position: 'relative',
      justifyContent: 'center'
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
    rowWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16
    },
    menuText: {
      color: '#8D96A4',
      fontSize: 18,
      fontWeight: '700'
    }
  });
  
export default CustomHeader