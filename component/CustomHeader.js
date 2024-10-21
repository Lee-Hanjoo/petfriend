import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { ImgPath } from '../ImgPath';
import { Pressable } from 'react-native';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMenu } from '../MenuProvider';

const CustomHeader = ({ menuItems }) => {

  const navigation = useNavigation();
  const { menuActive, setMenuActive, previousMenuActive } = useMenu(); 

  const [alarmPop, setAlarmPop] = useState(false)


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
      <Pressable onPress={()=>{setAlarmPop(!alarmPop)}}>
        <Image source={ImgPath.alarm} />
        <View style={styles.alarmUnread}></View>
      </Pressable>
      <View style={[styles.alarmPop, alarmPop && styles.alarmPopActive]}>
        <ScrollView style={styles.alarmList}>
          <View style={styles.alarmItem}>
            <View style={styles.rowWrap}>
              <View style={styles.alarmDot}></View>
              <Text>내 게시글에 새로운 댓글이 달렸어요!</Text>
            </View>
            <Text style={styles.alarmDate}>2024. 10. 21</Text>
          </View>
          <View style={[styles.alarmItem, {marginTop: 12, borderTopWidth: 1, borderColor: '#E7E9ED', paddingTop: 12}]}>
            <View style={styles.rowWrap}>
              <View style={styles.alarmDot}></View>
              <Text>내 게시글에 새로운 댓글이 달렸어요!</Text>
            </View>
            <Text style={styles.alarmDate}>2024. 10. 21</Text>
          </View>
        </ScrollView>
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
    alarmPop: {
      position: 'absolute',
      right: 20,
      top: 52,
      padding: 20,
      backgroundColor: '#fff',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#E7E9ED',
      shadowColor: '#1F2329',
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 12,
      elevation: 4, // Android
      display: 'none'
    },
    alarmPopActive: {
      display: 'block',
    },
    alarmDot: {
      width: 6,
      height: 6,
      backgroundColor: '#EE815E',
      borderRadius: '50%',
    },
    rowWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6
    },
    alarmDate: {
      color: '#8D96A4',
      fontSize: 12,
      marginTop: 4,
      textAlign: 'right'
    },
  });
  
export default CustomHeader