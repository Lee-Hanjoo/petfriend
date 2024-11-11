import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import Tab from '../component/Tab';
import Select from '../component/Select';
import MapListItem from '../component/MapListItem';
import { api } from '../api/api';
import { useIsFocused } from '@react-navigation/native';

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
        // 시도 코드 필터링
        const selectedLocation = location.find((locationItem) => locationItem.value === sidoCode);
        // 시군구 코드 필터링
        const selectedCity = city.find((cityItem) => cityItem.value === sigunguCode);

        // 둘 다 선택했을경우.
        if (selectedLocation && selectedCity) {
          return (
            v.orgName.includes(selectedLocation.label) &&
            v.orgName.includes(selectedCity.label)
          );
        // 시도만 선택했을 경우
        } else if (selectedLocation) {
          return v.orgName.includes(selectedLocation.label);
        // 시군구만 선택했을 경우
        } else if (selectedCity) {
          return v.orgName.includes(selectedCity.label);
        }
        // 선택되지 않은 경우
        return true;
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

  // 시도가 변경될 때 시군구가 선택되어있으면 초기화
  useEffect(() => {
    if (sigunguCode) {
      setSigunguCode(null)
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
