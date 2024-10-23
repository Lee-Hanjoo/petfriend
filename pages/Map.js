import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, FlatList, View, Text, Dimensions, Pressable, Image } from 'react-native';
import Tab from '../component/Tab';
import Select from '../component/Select';
import MapListItem from '../component/MapListItem';
import { useMenu } from '../MenuProvider'
import { api } from '../api/api';
import { useIsFocused } from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import {REACT_APP_KAKAO_KEY} from '@env';

const {width, height} = Dimensions.get('window')

const Map = () => {

  const [text, setText] = useState('');

  const [tabIndex, setTabIndex] = useState(0)

  // 이 페이지를 진입했을 때.
  const isFocused = useIsFocused()
  
  //시도
  const [sidoCode, setSidoCode] = useState(6110000)
  const [location, setLocation] = useState([])
  
  const sidoApi = async () => {
    const sido = await api.sido()
    setLocation(sido.response.body.items.item.map((v) => {
      return {
        label: v.orgdownNm,
        value: v.orgCd
      }
    }))
  }
  
  //시군구
  const [sigunguCode, setSigunguCode] = useState(3220000)
  const [city, setCity] = useState([])

  const sigunguApi = async () => {
    const sigungu = await api.sigungu(sidoCode)
    setCity(sigungu.response.body.items.item.map((v) => {
      return {
        label: v.orgdownNm,
        value: v.orgCd
      }
    }))
  }
  
  //보호소
  const [shelterInfo, setShelterInfo] = useState([])

  const shelterApi = async () => {
    const shelter = await api.shelter(sidoCode, sigunguCode)
    setShelterInfo(shelter.response.body.items.item.map((v) => {
      console.log(v);
      return {
        // label: v.orgdownNm,
        // value: v.orgCd
      }
    }))
  }
  

  useEffect(() => {
    // 포커스가 false일때 (페이지를 벗어났을 때) 스크롤탑 0
    if(!isFocused) return 
    sidoApi()
    sigunguApi()
    shelterApi()
  }, [isFocused, sidoCode, sigunguCode]) 

  const renderItem = () => (
    <MapListItem 
      title='(주)에니멀클리닉컨설팅(출장진료전문병원)' 
      location='경기도 용인시 기흥구 신갈동' 
      callNum='031-222-2233' 
      licenseNum='1234' 
    />
  );

//   const kakaoMap = `
//   <!DOCTYPE html>
//   <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <meta http-equiv="Content-Security-Policy" content="default-src *; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval' *;">
//     <title>Kakao Map</title>
//     <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${REACT_APP_KAKAO_KEY}"></script>
//   </head>
//   <body>
//     <div id="map" style="width:calc(100% + 20px);height:360px;margin-left:-10px;margin-top:-10px;"></div>
//     <script>
//       document.addEventListener("DOMContentLoaded", function() {
//         var mapContainer = document.getElementById('map'),
//         mapOption = { 
//             center: new kakao.maps.LatLng(37.5665, 126.9780), // 서울 좌표
//             level: 3 // 확대 레벨
//         };

//         var map = new kakao.maps.Map(mapContainer, mapOption);

//         // 마커를 생성합니다
//         var markerPosition  = new kakao.maps.LatLng(37.5665, 126.9780); 
//         var marker = new kakao.maps.Marker({
//             position: markerPosition
//         });
//         marker.setMap(map);
//       });
//     </script>
//   </body>
//   </html>
// `;


  // const renderScrollableContent = () => (
  //   <View style={styles.mapWrap}>
  //     <Pressable style={styles.closeBtn} onPress={()=>{setOpenMap(false)}}>
  //       <Text style={styles.closeBtnText}>닫기</Text>
  //     </Pressable>
  //     <WebView
  //       originWhitelist={['*']}
  //       javaScriptEnabled={true}
  //       domStorageEnabled={true}
  //       source={{html:kakaoMap}}
  //       style={{zIndex: 999, width:width, height:360, backgroundColor: '#E7E9ED'}}
  //       onError={(syntheticEvent) => {
  //         const { nativeEvent } = syntheticEvent;
  //         console.warn('WebView error: ', nativeEvent);
  //       }}
  //     />
  //   </View>
  // );


  return (
    <View style={styles.container}>
      <Tab top icon title={['보호소', '동물병원', '놀이터']} tabIndex={tabIndex} setTabIndex={setTabIndex} />
      <View style={styles.selectWrap}>
        <Select placeholder='지역' items={location} setItems={setLocation} size={164} value={sidoCode} setValue={setSidoCode} />
        <Select placeholder='도시' items={city} setItems={setCity} size={163} value={sigunguCode} setValue={setSigunguCode} />
        {/* <TextInput 
          placeholder='인허가번호' 
          style={styles.input} 
          placeholderTextColor='#8D96A4' 
          value={text} 
          onChangeText={setText} 
        /> */}
      </View>
      <FlatList
        data={new Array(12).fill()}
        // ListHeaderComponent={renderScrollableContent}
        // ListHeaderComponentStyle={[
        //   {zIndex:1, width:width, height:360, display: 'none'},
        //   openMap && styles.openMap
        // ]}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.scrollableContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollableContainer: {
    paddingBottom: 48,
  },
  input: {
    width: 122,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E7E9ED',
    borderRadius: 6,
    color: '#1F2329',
    fontSize: 14,
  },
  selectWrap: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    zIndex: 9999,
    width: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderColor: '#8D96A4',
  },
  line: {
    width: 1,
    height: 20,
    backgroundColor: '#E7E9ED',
    marginHorizontal: 2,
  },
});

export default Map;
