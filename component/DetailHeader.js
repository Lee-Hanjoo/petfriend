import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ImgPath } from '../ImgPath';
import { Pressable } from 'react-native';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMenu } from '../MenuProvider';

const DetailHeader = ({ menuItems }) => {
  
    const navigation = useNavigation();
    const { menuActive, setMenuActive, previousMenuActive, detailActive, setDetailActive } = useMenu();     

    const getTitle = () => {
      if (menuActive === 'mypet') return '설정';
      if (menuActive === 'write') return '글쓰기';
      if (menuActive === 'detail') {
        if (detailActive === 'adopt') return '입양 대기 동물';
        if (detailActive === 'story') return '스토리';
        if (detailActive === 'missing') return '실종 동물 찾기 및 신고';
        if (detailActive === 'community') return '커뮤니티';
        if (detailActive === 'notice') return '공지사항';
      }
      return ''; // 아무 조건도 해당하지 않으면 빈 문자열
    };

  return (
    <View style={[styles.DetailHeaderWrap]}>
      <View style={[styles.titleWrap, menuActive === 'menu' && {justifyContent: 'space-between'}]}>
        {
          menuActive === 'menu' ?
          <Pressable style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
            <Text style={styles.menuText}>로그인</Text>
            <Image source={ImgPath.login}/>
          </Pressable>
          :
          <Pressable style={styles.backBtn} 
            onPress={() =>{ 
              if(menuActive === 'mypet') {
                navigation.navigate('menu')
                setMenuActive('menu'); 
              } else {
                navigation.goBack()
                setMenuActive(previousMenuActive)
              }
            }}
          >
            <Image source={ImgPath.back_arrow}/>
          </Pressable>
        }
        {
          menuActive === 'menu' ?
          <View style={styles.rowWrap}>
            <Pressable onPress={()=>{setMenuActive('mypet'); navigation.navigate('mypet') }}>
              <Image source={ImgPath.setting_black} />
            </Pressable>
            <Pressable>
              <Image source={ImgPath.alarm} />
              <View style={styles.alarmUnread}></View>
            </Pressable>
          </View>
          :
          <Text style={styles.title}>
            {menuActive === 'mypet' && '설정'}
            {menuActive === 'write' && '글쓰기'}
            {menuActive === 'detail' && getTitle()}
          </Text>
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  DetailHeaderWrap: {  
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    zIndex: 999,
    borderBottomWidth: 1,
    borderColor: '#E7E9ED',
    position: 'relative',
  },
  titleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  backBtn: {
    position: 'absolute',
    left: 0,
    top: -5,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2329'
  },
  menuText: {
    color: '#8D96A4',
    fontSize: 18,
    fontWeight: '700'
  },
  rowWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16
  },
});
  
export default DetailHeader