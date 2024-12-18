import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ImgPath } from '../ImgPath';
import { Pressable } from 'react-native';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMenu } from '../MenuProvider';

const DetailHeader = ({ menuItems }) => {
  
    const navigation = useNavigation();
    const { menuActive, setMenuActive, previousMenuActive, detailActive, setDetailActive, findActive, setFindActive } = useMenu();     

    const getTitle = () => {
      if (menuActive === 'mypet') return '설정';
      if (menuActive === 'write') return '글쓰기';
      if (menuActive === 'detail') {
        if (detailActive === 'adopt') return '입양 대기 동물';
        if (detailActive === 'story') return '스토리';
        if (detailActive === 'missing') return '실종 동물 찾기 및 신고';
        if (detailActive === 'event') return '캠페인&이벤트';
        if (detailActive === 'notice') return '공지사항';
      }
      if (menuActive === 'find') {
        if (findActive === 'id') return '아이디 찾기';
        if (findActive === 'pw') return '비밀번호 찾기';
      }
      if (menuActive === 'join') return '회원가입'
      
      return ''; // 아무 조건도 해당하지 않으면 빈 문자열
    };

  return (
    <View style={[styles.DetailHeaderWrap]}>
      <View style={[styles.titleWrap, menuActive === 'menu' && {justifyContent: 'space-between'}]}>
        {
          menuActive === 'menu' ?
          <Pressable 
            style={{flexDirection: 'row', alignItems: 'center', gap: 8}}
            onPress={()=>{
              setMenuActive('login'); 
              navigation.navigate('login'); 
            }}
          >
            <Text style={styles.menuText}>로그인</Text>
            <Image source={ImgPath.login}/>
          </Pressable>
          :
            menuActive !== 'complete' &&
            <Pressable style={styles.backBtn} 
              onPress={() =>{ 
                if((menuActive === 'mypet' || menuActive === 'login')) {
                  navigation.navigate('menu')
                  setMenuActive('menu')
                } else if ((menuActive === 'find' || menuActive === 'join')){
                  setMenuActive('login')
                  navigation.navigate('login')
                } else {
                  setMenuActive(previousMenuActive)
                  navigation.goBack()
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
            {getTitle()}
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