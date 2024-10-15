import React, { useEffect } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { ImgPath } from '../ImgPath';
import { Pressable } from 'react-native';
import { Image } from 'react-native';

// // gap << native 지원x , fontWeight << string으로 들어가야함
// borderradius << 50% <<< XXX

const {height, width} = Dimensions.get("window");

const homeHeaderTop = -height + 149;
const HeaderTop = -height + 152;

const CustomHeader = ({navigation, menuItems, menuActive, setMenuActive }) => {
  
  return (
    <View 
      style={[
        styles.CustomHeaderWrap, 
        menuActive === 'home' ? {top:homeHeaderTop} : [styles.CustomHeaderWrapDetail, {top: HeaderTop}],
        menuActive === ( 'write' || 'detail') && styles.CustomHeaderDetailWrap
      ]}
    >
      <View>
        {
          menuActive === 'home' ? 
            <Image source={ImgPath.logo_black}/>
          :
            <View style={styles.titleWrap}>
              {
                menuActive === ( 'write' || 'detail') ?
                <>
                  <Pressable style={styles.backBtn} onPress={() => navigation.navigate('home')}>
                    <Image source={ImgPath.back_arrow}/>
                  </Pressable>
                  <Text>{menuActive}</Text>
                </>
                :
                <>
                {
                  menuItems.map((item, i) => {
                    if (item.title === menuActive) {
                      return (
                        <View style={styles.titleWrap} key={i}>
                          <Text style={styles.title}>{item.krTitle}</Text>
                          <Text style={styles.desc}>{item.title}</Text>
                        </View>
                      )
                    }
                  })
                }
                </>
              }
            </View>
        }
        {
          menuActive === 'menu' &&
          <Pressable>
            <Text>로그인</Text>
          </Pressable>
        }
      </View>
      {
        menuActive !== ( 'write' || 'detail') &&
        <View style={styles.rowWrap}>
          {
            menuActive === 'menu' &&
            <Pressable style={styles.settingBtn}>
              <Image source={ImgPath.setting} />
            </Pressable>
          }
          <Pressable style={styles.alarmWrap}>
            <Image source={ImgPath.alarm} />
            <View style={styles.alarmUnread}></View>
          </Pressable>
        </View>
      }
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
      position: 'fixed',
      left: 0,
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
      alignItems: 'center'
    },
    settingBtn: {
      marginRight: 16
    }
  });
  
export default CustomHeader