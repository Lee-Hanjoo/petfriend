import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ImgPath } from '../ImgPath';
import { Pressable } from 'react-native';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DetailHeader = ({ menuItems, menuActive, setMenuActive }) => {

  const navigation = useNavigation();

  return (
    <View style={[styles.DetailHeaderWrap]}>
      <View style={styles.titleWrap}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()} >
          <Image source={ImgPath.back_arrow}/>
        </Pressable>
        <Text>{menuActive}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  DetailHeaderWrap: {  
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
  
export default DetailHeader