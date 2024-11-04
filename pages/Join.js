import React, { useState } from 'react'
import { Dimensions, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { ImgPath } from '../ImgPath'
import { useNavigation } from '@react-navigation/native'
import { useMenu } from '../MenuProvider';
import Select from '../component/Select';
import { RadioGroup } from 'react-native-radio-buttons-group';

const {width, height} = Dimensions.get('window')

const Join = () => {

  const navigation = useNavigation();
  const { setMenuActive, sex, completeActive, setCompleteActive } = useMenu(); 

  const [btnActive, setBtnActive] = useState(true)
  const [sexId, setSexId] = useState('sex_default');

  return (
    <FlatList 
      keyExtractor={(item) => item.key}
      contentContainerStyle={styles.container}
      data={[{ key: 'content' }]}
      renderItem={() => (
        <View style={styles.contents}>
          <View style={{gap:24}}>
            <View style={styles.labelWrap}>
              <Text style={styles.label}>아이디<Text style={styles.essential}>*</Text></Text>
              <View style={styles.submitWrap}>
                <TextInput style={styles.input} placeholder='아이디' />
              </View>
            </View>
            <View style={styles.labelWrap}>
              <Text style={styles.label}>비밀번호<Text style={styles.essential}>*</Text></Text>
              <View style={styles.submitWrap}>
                <TextInput style={styles.input} placeholder='비밀번호 입력' secureTextEntry/>
                <TextInput style={styles.input} placeholder='비밀번호 재입력' secureTextEntry/>
              </View>
            </View>
            <View style={styles.labelWrap}>
              <Text style={styles.label}>이메일주소</Text>
              <View style={styles.submitWrap}>
                <TextInput style={styles.input} placeholder='이메일' />
              </View>
            </View>
            <View style={styles.labelWrap}>
              <Text style={styles.label}>닉네임<Text style={styles.essential}>*</Text></Text>
              <View style={styles.submitWrap}>
                <TextInput style={styles.input} placeholder='닉네임' />
              </View>
            </View>
            <View style={styles.labelWrap}>
              <Text style={styles.label}>생년월일</Text>
              <View style={styles.submitWrap}>
                <TextInput style={styles.input} placeholder='생년월일 8자리 (YYYYMMDD)' />
              </View>
            </View>
            <View style={styles.labelWrap}>
              <Text style={styles.label}>성별<Text style={styles.essential}>*</Text></Text>
              <View style={styles.submitWrap}>
                <RadioGroup
                  radioButtons={sex} 
                  onPress={setSexId}
                  selectedId={sexId}
                  layout='row'
                />
              </View>
            </View>
            <View style={[styles.labelWrap, {gap: 8}]}>
              <Text style={styles.label}>휴대폰번호</Text>
              <View style={[styles.submitWrap, styles.rowWrap, {marginTop: 4}]}>
                <TextInput style={[styles.input, {width: 220}]} placeholder="휴대폰번호 입력 ('-'제외)" />
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
              <View style={[styles.submitWrap, styles.rowWrap]}>
                <TextInput style={[styles.input, {width: 220}]} placeholder="인증번호 입력" />
                <Pressable style={[styles.numChkBtn, {borderColor: '#E7E9ED'}]}>
                  <Text style={[styles.numChkBtnText, {color: '#8D96A4'}]}>
                    확인
                  </Text>
                </Pressable>
              </View>
            </View>
            <Pressable 
              style={[
                styles.joinBtn, 
                btnActive && {backgroundColor: '#1F2329'}
              ]}
              onPress={()=>{
                setMenuActive('complete'); 
                navigation.navigate('complete'); 
                setCompleteActive('join')
              }}
            >
              <Text style={[styles.joinBtnText, btnActive && {color: '#fff'}]}>가입하기</Text>
            </Pressable>
          </View>
        </View>
      )}
    >
    </FlatList>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingBottom: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  contents: {
  },
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
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E7E9ED',
    borderRadius: 6,
    color: '#1F2329',
    fontSize: 14,
    // fontFamily: 'Wanted Sans',
    placeholderColor: '#8D96A4'
  },
  joinBtn: {
    width: width - 40,
    paddingVertical: 16,
    backgroundColor: '#E7E9ED',
    borderRadius: 6,
  },
  joinBtnText: {
    fontSize: 16,
    color: '#8D96A4',
    textAlign: 'center',
    fontWeight: '500',
  },
  labelWrap: {
    gap: 12,
  },
  label: {
    fontSize: 12,
    color: '#8D96A4',
  },
  submitWrap: {
    gap: 8
  },
  rowWrap: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  numChkBtn: {
    width: width - 268,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#64C7FA',
    borderRadius: 6
  },
  numChkBtnText: {
    color: '#64C7FA',
    textAlign: 'center',
  },
  essential: {
    fontSize: 14,
    color: '#EE815E',
  },
})

export default Join