import React, { useState } from 'react'
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { ImgPath } from '../ImgPath'
import { useNavigation } from '@react-navigation/native'
import { useMenu } from '../MenuProvider';

const {width, height} = Dimensions.get('window')

const Login = () => {

  const navigation = useNavigation();
  const { menuActive, setMenuActive, findActive, setFindActive } = useMenu(); 

  const [btnActive, setBtnActive] = useState(false)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인</Text>
      <View style={styles.contents}>
        <View>
          <View style={styles.inputWrap}>
            <TextInput style={styles.input} placeholder='아이디 입력' placeholderTextColor='#8D96A4' />
            <TextInput style={styles.input} placeholder='비밀번호 입력' placeholderTextColor='#8D96A4' secureTextEntry />
          </View>
          <Pressable style={[styles.loginBtn, btnActive && {backgroundColor: '#1F2329'}]}>
            <Text style={[styles.loginBtnText, btnActive && {color: '#fff'}]}>로그인</Text>
          </Pressable>
        </View>
        <View style={[styles.menuWrap]}>
          <Pressable 
            onPress={()=>{
              setMenuActive('find'); 
              navigation.navigate('find'); 
              setFindActive('id');
            }}
          >
            <Text style={styles.menuBtnText}>아이디 찾기</Text>
          </Pressable>
          <View style={styles.line}></View>
          <Pressable 
            onPress={()=>{
              setMenuActive('find'); 
              navigation.navigate('find'); 
              setFindActive('pw');
            }}
          >
            <Text style={styles.menuBtnText}>비밀번호 찾기</Text>
          </Pressable>
          <View style={styles.line}></View>
          <Pressable 
            onPress={()=>{
              setMenuActive('join'); 
              navigation.navigate('join'); 
            }}
          >
            <Text style={styles.menuBtnText}>회원가입</Text>
          </Pressable>
        </View>
        <View style={styles.snsWrap}>
          <Pressable style={[styles.snsBtn, {backgroundColor: '#F7E04B'}]}>
            <Image source={ImgPath.kakao} style={[styles.snsBtnImg, {width: 24, height: 23, top: 13}]}/>
            <Text style={[styles.snsBtnText]}>카카오로 계속하기</Text>
          </Pressable>
          <Pressable style={[styles.snsBtn, {borderWidth: 1, borderColor: '#8D96A4'}]}>
            <Image source={ImgPath.google} style={[styles.snsBtnImg, {width: 24, height: 24}]}/>
            <Text style={[styles.snsBtnText]}>구글로 계속하기</Text>
          </Pressable>
          <Pressable style={[styles.snsBtn, {backgroundColor: '#03C75A'}]}>
            <Image source={ImgPath.naver} style={[styles.snsBtnImg, {width: 21, height: 20, left: 24, top: 15}]}/>
            <Text style={[styles.snsBtnText, {color: '#fff'}]}>네이버로 계속하기</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20
  },
  contents: {},
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 40
  },
  inputWrap: {
    gap: 8,
    marginBottom: 12
  },
  input: {
    width: width - 40,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#E7E9ED',
    borderRadius: 6,
    fontSize: 16,
    color: '#1F2329',
    placeholderColor: '#8D96A4'
  },
  loginBtn: {
    width: width - 40,
    paddingVertical: 16,
    backgroundColor: '#E7E9ED',
    borderRadius: 6,
  },
  loginBtnText: {
    fontSize: 16,
    color: '#8D96A4',
    textAlign: 'center',
    fontWeight: '500',
  },
  menuWrap: {
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16
  },
  menuBtnText: {
    color: '#8D96A4'
  },
  line: {
    width: 1,
    height: 12,
    backgroundColor: '#E7E9ED',
  },
  snsWrap: {
    gap: 8,
    marginTop: 24
  },
  snsBtn: {
    width: width - 40,
    paddingVertical: 16,
    borderRadius: 6,
  },
  snsBtnText: {
    fontWeight: '500',
    color: '#1F2329',
    textAlign: 'center',
  },
  snsBtnImg: {
    position: 'absolute',
    left: 20,
    top: 12
  },
})

export default Login