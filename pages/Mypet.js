import React, { useState } from 'react'
import { Dimensions, Image, Pressable, StyleSheet, Switch, Text, View } from 'react-native'
import { ImgPath } from '../ImgPath';

const {width, height} = Dimensions.get('window')

const Mypet = () => {

  const [switchOn, setSwitchOn] = useState(false);
  const toggleSwitch = () => setSwitchOn(previousState => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.profileWrap}>
        <Image source={ImgPath.profile_sample} style={styles.profileImg}/>
        <View>
          <Text style={styles.profName}>이한주</Text>
          <Text style={styles.profMail}>leehanjoo9355@gmail.com</Text>
        </View>
      </View>
      <View style={styles.linkWrap}>
        <View style={[styles.link, {borderColor: '#64C7FA', backgroundColor: 'rgba(100, 199, 250, 0.2)'}]}>
          <Text style={[styles.linkTitle, {color: '#64C7FA'}]}>동물등록</Text>
          <Image source={ImgPath.link_blue} />
        </View>
        <View style={[styles.link, {borderColor: '#F3B255', backgroundColor: 'rgba(243, 178, 85, 0.2)'}]}>
          <Text style={[styles.linkTitle, {color: '#F3B255'}]}>동물사랑사진전</Text>
          <Image source={ImgPath.link_yellow} />
        </View>
      </View>
      <View style={styles.menuWrap}>
        <View>
          <Text style={styles.menuTitle}>마이메뉴</Text>
          <View>
            <Pressable  style={styles.menuBox}>
              <Text style={styles.menuName}>관심 동물</Text>
              <Image source={ImgPath.right_arrow} />
            </Pressable>
            <Pressable  style={styles.menuBox}>
              <Text style={styles.menuName}>관심 스토리</Text>
              <Image source={ImgPath.right_arrow} />
            </Pressable>
          </View>
        </View>
        <View>
        <Text style={styles.menuTitle}>알림</Text>
          <View>
            <Pressable  style={styles.menuBox}>
              <Text style={styles.menuName}>알림 설정</Text>
              <Switch
                trackColor={{false: '#E7E9ED', true: '#E0F4FE'}}
                thumbColor={switchOn ? '#64C7FA' : '#8D96A4'}
                ios_backgroundColor="#E7E9ED"
                onValueChange={toggleSwitch}
                value={switchOn}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 20
  },
  profileWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32
  },
  profileImg: {
    width: 64,
    height: 64,
    borderRadius: 999,
    backgroundColor: '#E7E9ED',
    marginRight: 12
  },
  profName:{
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2329',
    marginBottom: 4
  },
  profMail:{
    color: '#8D96A4'
  },
  linkWrap: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    marginBottom: 64
  },
  link: {
    width: width / 2 - 24,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4
  },
  linkTitle: {
    fontWeight: '700',
  },
  menuWrap: {
    gap: 40
  },
  menuBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#E7E9ED'
  },
  menuTitle: {
    fontWeight: '700',
    marginBottom: 8
  },
  menuName: {
    fontSize: 16,
    marginRight: 'auto'
  },
})

export default Mypet