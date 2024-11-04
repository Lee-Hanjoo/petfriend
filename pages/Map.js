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
  const [openMapIndex, setOpenMapIndex] = useState(null);
  const [activePopupIndex, setActivePopupIndex] = useState(null);
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
      return {
        name: v.careNm,
        tel: v.careTel,
        orgName: v.orgNm,
        lat: v.lat,
        lng: v.lng,
        closeDay: v.closeDay,
        startTime: v.weekOprStime,
        endTime: v.weekOprEtime,
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

  if(!shelterInfo) return

  return (
    <View style={styles.container}>
      <Tab top icon title={['보호소', '동물병원', '놀이터']} tabIndex={tabIndex} setTabIndex={setTabIndex} />
      <View style={styles.selectWrap}>
        <Select placeholder='지역' items={location} setItems={setLocation} size={164} value={sidoCode} setValue={setSidoCode} />
        <Select placeholder='도시' items={city} setItems={setCity} size={163} value={sigunguCode} setValue={setSigunguCode} />
      </View>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.scrollableContainer}
        data={shelterInfo}
        renderItem={({ item, index }) => {
          return (
            <MapListItem 
              title={item.name}
              location={item.orgName} 
              callNum={item.tel}
              lat={item.lat}
              lng={item.lng}
              closeDay={item.closeDay}
              startTime={item.startTime}
              endTime={item.endTime}
              openMapIndex={openMapIndex}
              setOpenMapIndex={setOpenMapIndex}
              activePopupIndex={activePopupIndex}
              setActivePopupIndex={setActivePopupIndex}
              index={index}
            />
          );
        }}
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
    borderColor: '#E7E9ED',
  },
  line: {
    width: 1,
    height: 20,
    backgroundColor: '#E7E9ED',
    marginHorizontal: 2,
  },
});

export default Map;
