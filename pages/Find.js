import React, { useState } from 'react'
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { ImgPath } from '../ImgPath'
import { useNavigation } from '@react-navigation/native'
import { useMenu } from '../MenuProvider';

const {width, height} = Dimensions.get('window')

const Find = () => {

  const navigation = useNavigation();
  const { menuActive, setMenuActive, findActive, setFindActive } = useMenu(); 

  const [btnActive, setBtnActive] = useState(true) 

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>{findActive === 'id' ? '아이디' : '비밀번호'} 찾기</Text> */}
      <View style={styles.contents}>
        <View style={styles.tab}>
          <Pressable 
            style={[
              styles.tabItem, 
              findActive === 'id' && styles.tabActive
            ]} 
            onPress={()=>{
              setFindActive('id')
            }}
          >
            <Text style={[styles.tabText, findActive === 'id' && styles.tabActiveText]}>아이디 찾기</Text>
          </Pressable>
          <Pressable 
            style={[
              styles.tabItem, 
              findActive === 'pw' && styles.tabActive, 
              {marginLeft: -1}
            ]} 
            onPress={()=>{
              setFindActive('pw')
            }}
          >
            <Text style={[styles.tabText, findActive === 'pw' && styles.tabActiveText]}>비밀번호 찾기</Text>
          </Pressable>
        </View>
        {
          findActive === 'id' ? 
          <View>
            <View style={styles.inputWrap}>
              <View style={styles.rowWrap}>
                <TextInput style={styles.input} placeholder="휴대폰번호 입력 ('-'제외)" placeholderTextColor='#8D96A4' />
                <Pressable style={styles.numChkBtn}
                  onPress={()=>{
                    alert('123456')
                  }}
                >
                  <Text style={[styles.numChkBtnText, {fontWeight: '700'}]}>
                    인증번호 전송
                  </Text>
                </Pressable>
              </View>
              <View style={styles.rowWrap}>
                <TextInput style={styles.input} placeholder='인증번호 입력' placeholderTextColor='#8D96A4' />
                <Pressable style={[styles.numChkBtn, {borderColor: '#E7E9ED'}]}>
                  <Text style={[styles.numChkBtnText, {color: '#8D96A4'}]}>
                    확인
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
          :
          <View>
            <View style={styles.inputWrap}>
              <TextInput style={[styles.input, {width: width - 40}]} placeholder="아이디 입력" placeholderTextColor='#8D96A4' />
              <View style={styles.rowWrap}>
                <TextInput style={styles.input} placeholder="휴대폰번호 입력 ('-'제외)" placeholderTextColor='#8D96A4' />
                <Pressable style={styles.numChkBtn}
                  onPress={()=>{
                    alert('123456')
                  }}
                >
                  <Text style={[styles.numChkBtnText, {fontWeight: '700'}]}>
                    인증번호 전송
                  </Text>
                </Pressable>
              </View>
              <View style={styles.rowWrap}>
                <TextInput style={styles.input} placeholder='인증번호 입력' placeholderTextColor='#8D96A4' />
                <Pressable style={[styles.numChkBtn, {borderColor: '#E7E9ED'}]}>
                  <Text style={[styles.numChkBtnText, {color: '#8D96A4'}]}>
                    확인
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        }
        <Pressable style={[styles.loginBtn, btnActive && {backgroundColor: '#1F2329'}]}
          onPress={()=>{
            setMenuActive('complete'); 
            navigation.navigate('complete'); 
          }}
        >
          <Text style={[styles.loginBtnText, btnActive && {color: '#fff'}]}>
            {findActive === 'id' ? '아이디' : '비밀번호'} 찾기
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    height: height
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
    width: width - 156,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#E7E9ED',
    borderRadius: 6,
    fontSize: 14,
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
  rowWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  numChkBtn: {
    width: width - 268,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#64C7FA',
    borderRadius: 6
  },
  numChkBtnText: {
    color: '#64C7FA',
    textAlign: 'center',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabItem: {
    width: width / 2 - 20,
    marginBottom: 32,
    paddingVertical: 16,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: '#E7E9ED',
    backgroundColor: '#E7E9ED'
  },
  tabText: {
    textAlign: 'center',
    color: "#8D96A4"
  },
  tabActive: {
    borderColor: '#E7E9ED',
    backgroundColor: '#fff',
  },
  tabActiveText: {
    color: '#1F2329',
  },
})

export default Find