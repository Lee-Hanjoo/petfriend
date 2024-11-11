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

  const sigunguApi = async (sidoCode) => {
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
    const filteredShelters = shelter.response.body.items.item
      .map((v, i) => ({
        key: i,
        name: v.careNm,
        orgName: v.orgNm,
        tel: v.careTel,
        lat: v.lat,
        lng: v.lng,
        closeDay: v.closeDay,
        startTime: v.weekOprStime,
        endTime: v.weekOprEtime,
      }))
      .filter((v) => {
        // 시도 코드에 맞는 지역 필터링 (예: 서울특별시)
        const selectedRegion = location.find((loc) => loc.value === sidoCode);
        const selectedCity = city.find((ct) => ct.value === sigunguCode);

        if (selectedRegion && selectedCity) {
          // 서울특별시와 강남구가 모두 포함된 보호소만 반환
          return (
            v.orgName.includes(selectedRegion.label) &&
            v.orgName.includes(selectedCity.label)
          );
        } else if (selectedRegion) {
          // 시도만 선택한 경우, 시도의 지역명이 포함된 보호소만 반환
          return v.orgName.includes(selectedRegion.label);
        } else if (selectedCity) {
          // 시군구만 선택한 경우, 시군구명이 포함된 보호소만 반환
          return v.orgName.includes(selectedCity.label);
        }
        return true; // 시도와 시군구 모두 선택되지 않은 경우
      });
    setShelterInfo(filteredShelters);
  }
  
  useEffect(() => {
    // 포커스가 false일때 (페이지를 벗어났을 때) 스크롤탑 0
    if(!isFocused) return 
    sidoApi()
    sigunguApi(sidoCode)
    shelterApi()
  }, [isFocused, sidoCode, sigunguCode]) 

  useEffect(() => {
    if (sigunguCode) {
      setSigunguCode(null); // sidoCode가 변경될 때 sigunguCode 초기화
    }
  }, [sidoCode]);

  if(!shelterInfo) return

  return (
    <View style={styles.container}>
      <Tab top icon title={['보호소', '동물병원', '놀이터']} tabIndex={tabIndex} setTabIndex={setTabIndex} />
      <View style={styles.selectWrap}>
        <Select placeholder='지역' items={location} setItems={setLocation} size={164} value={sidoCode} setValue={setSidoCode} />
        <Select placeholder='도시' items={city} setItems={setCity} size={163} value={sigunguCode} setValue={setSigunguCode} />
      </View>
      <FlatList
        keyExtractor={(item) => item.key}
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
