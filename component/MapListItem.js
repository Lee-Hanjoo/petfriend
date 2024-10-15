import React, { useRef, useState } from 'react'
import { Image, StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { Pressable, View } from 'react-native'
import TextPopup from './TextPopup';
import { ImgPath } from '../ImgPath';

const MapListItem = (props) => {
  const [textPopup, setTextPopup] = useState(false)
  const {title, location, callNum, licenseNum} = props;

  return (
    <>
      <View style={{position: 'relative'}}>
        <TextPopup textPopup={textPopup} item={['인허가번호', '길찾기']}/>
        <View style={styles.container}>
          <View style={styles.top}>
            <Text style={styles.title}>{title}</Text>
            <Pressable style={styles.moreBtn} onPress={()=>{setTextPopup(!textPopup)}}>
              <Image source={ImgPath.more_btn} />
            </Pressable>
          </View>
          <View style={styles.bottom}>
            <Text style={styles.location}>{location}</Text>
            <Pressable>
              <Text style={[styles.callNum, callNum === '' && styles.nonCallNum ]}>{callNum === '' ? '전화번호 미등록' : callNum}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#E7E9ED',
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  title: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '700',
    color: '#1F2329',
    // fontFamily: 'Wanted Sans'
  },
  moreBtn: {},
  location: {
    fontSize: 14,
    color: '#8D96A4',
    // fontFamily: 'Wanted Sans'
  },
  callNum: {
    fontSize: 14,
    color: '#00A8FF',
    // fontFamily: 'Wanted Sans',
    textDecorationLine: 'underline'
  },
  nonCallNum: {
    color: '#EE815E',
    textDecorationLine: 'none'
  },
})

export default MapListItem