import React, { useEffect, useState } from 'react'
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { ImgPath } from '../ImgPath'
import { useNavigation } from '@react-navigation/native'
import { useMenu } from '../MenuProvider';

const {width, height} = Dimensions.get('window')

const Complete = () => {

  const navigation = useNavigation();
  const { menuActive, setMenuActive, findActive, setFindActive, completeActive, setCompleteActive } = useMenu(); 

  const [btnActive, setBtnActive] = useState(false) 

  return (
    <View style={styles.container}>
      <View style={styles.contents}>
        <Text style={styles.title}>
          { completeActive === 'join' && '회원가입 완료' }
          { completeActive === 'id' && '아이디 찾기 완료' }
          { completeActive === 'pw' && '비밀번호 재설정' }
        </Text>
        <Text style={styles.desc}>
          { completeActive === 'join' && '펫프렌드의 회원이 되신걸 축하드립니다!' }
          { completeActive === 'id' && '고객님의 정보와 일치하는 아이디 입니다.' }
          { completeActive === 'pw' && '재설정할 새 비밀번호를 입력해주세요.' }
        </Text>
        <View>
          { completeActive === 'join' &&
            <View style={styles.rowWrap}>
              <Pressable style={[styles.bottomBtn, {backgroundColor: '#64C7FA'}]}
                onPress={()=>{
                  setMenuActive('login'); 
                  navigation.navigate('login'); 
                }}
              >
                <Text style={[styles.bottomBtnText, {fontWeight: '700'}]}>
                  로그인
                </Text>
              </Pressable>
              <Pressable style={styles.bottomBtn}
                onPress={()=>{
                  setMenuActive('home'); 
                  navigation.navigate('home'); 
                }}
              >
                <Text style={styles.bottomBtnText}>
                  홈으로 돌아가기
                </Text>
              </Pressable>
            </View>
          }{
          completeActive === 'id' &&
            <>
              <View style={{marginBottom: 24}}>
                <Text style={{fontSize: 16}}>gkswnehcl@gmail.com</Text>
              </View>
              <View style={styles.rowWrap}>
                <Pressable style={[styles.bottomBtn, {backgroundColor: '#64C7FA'}]}
                  onPress={()=>{
                    setMenuActive('login'); 
                    navigation.navigate('login'); 
                  }}
                >
                  <Text style={[styles.bottomBtnText, {fontWeight: '700'}]}>
                    로그인
                  </Text>
                </Pressable>
                <Pressable style={styles.bottomBtn}
                  onPress={()=>{
                    setMenuActive('find'); 
                    navigation.navigate('find'); 
                    setFindActive('pw')
                  }}
                >
                  <Text style={styles.bottomBtnText}>
                    비밀번호 찾기
                  </Text>
                </Pressable>
              </View>
            </>
            }
            { completeActive === 'pw' &&
            <>
              <View style={{gap:8}}>
                <TextInput style={styles.input} placeholder='새 비밀번호' secureTextEntry />
                <TextInput style={styles.input} placeholder='새 비밀번호 확인' secureTextEntry />
              </View>
              <View style={styles.rowWrap}>
                <Pressable style={[styles.bottomBtn, {width: width - 40}]}
                  onPress={()=>{
                    alert('비밀번호가 재설정되었습니다.')
                    setMenuActive('login'); 
                    navigation.navigate('login'); 
                  }}
                >
                  <Text style={styles.bottomBtnText}>
                    재설정
                  </Text>
                </Pressable>
              </View>
            </>
          }
        </View>
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
    marginTop: 65,
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 12
  },
  desc: {
    fontSize: 16,
    color: '#8D96A4',
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
  bottomBtn: {
    width: width / 2 - 24,
    height: 48,
    backgroundColor: '#1F2329',
    borderRadius: 6,
  },
  bottomBtnText: {
    fontSize: 16,
    lineHeight: 48,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
  },
  rowWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  }
})

export default Complete