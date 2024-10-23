import React, { useRef, useState } from 'react'
import { Dimensions, Image, StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { Pressable, View } from 'react-native'
import TextPopup from './TextPopup';
import { ImgPath } from '../ImgPath';
import {WebView} from 'react-native-webview';
import {REACT_APP_KAKAO_KEY} from '@env';

const {width, height} = Dimensions.get('window')

const MapListItem = (props) => {
  const [textPopup, setTextPopup] = useState(false)
  const {title, location, callNum, lat, lng, startTime, endTime } = props;
  
  const [openMap, setOpenMap] = useState(false)

  const kakaoMap = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Security-Policy" content="default-src *; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval' *;">
    <title>Kakao Map</title>
    <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${REACT_APP_KAKAO_KEY}"></script>
  </head>
  <body>
    <div id="map" style="width:calc(100% + 20px);height:360px;margin-left:-10px;margin-top:-10px;"></div>
    <script>
      document.addEventListener("DOMContentLoaded", function() {
        var mapContainer = document.getElementById('map'),
        mapOption = { 
            center: new kakao.maps.LatLng(${lat}, ${lng}),
            level: 3 // 확대 레벨
        };

        var map = new kakao.maps.Map(mapContainer, mapOption);

        // 마커를 생성합니다
        var markerPosition  = new kakao.maps.LatLng(${lat}, ${lng}); 
        var marker = new kakao.maps.Marker({
            position: markerPosition
        });
        marker.setMap(map);
      });
    </script>
  </body>
  </html>
`;

  return (
    <View>
      <TextPopup textPopup={textPopup} setTextPopup={setTextPopup} item={[`${startTime}~${endTime}`, '지도보기']} openMap={openMap} setOpenMap={setOpenMap} />
      <View style={styles.container}>
        <View style={[styles.mapWrap, openMap && styles.openMap]}>
          <Pressable style={styles.closeBtn} onPress={()=>{setOpenMap(false)}}>
            <Text style={styles.closeBtnText}>닫기</Text>
          </Pressable>
          <WebView
            originWhitelist={['*']}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            source={{html:kakaoMap}}
            style={{zIndex: 999, width:width, height:360, backgroundColor: '#E7E9ED'}}
            onError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              console.warn('WebView error: ', nativeEvent);
            }}
          />
        </View>
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
  )
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: '#E7E9ED',
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingTop:20,
    paddingHorizontal:20
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingBottom: 20,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '700',
    color: '#1F2329',
    // fontFamily: 'Wanted Sans'
  },
  moreBtn: {
  },
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
  mapWrap: {
    width: '100%',
    height: 240,
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#8D96A4',
    display: 'none'
  },
  openMap: {
    display: 'block',
  },
  closeBtn: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#1F2329',
    zIndex: 999
  },
  closeBtnText: {
    color: '#fff'
  },
})

export default MapListItem