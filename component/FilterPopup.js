import React, { useEffect, useState } from 'react'
import { Platform, StyleSheet, Text, TextInput } from 'react-native'
import { Pressable } from 'react-native'
import { View } from 'react-native'
import Select from './Select';
import { useMenu } from '../MenuProvider'
import { useIsFocused } from '@react-navigation/native';


const FilterPopup = (props) => {

  const {item, animal, filterPopup, setFilterPopup} = props;

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
  useEffect(() => {
    // 포커스가 false일때 (페이지를 벗어났을 때) 스크롤탑 0
    if(!isFocused) return 
    sidoApi()
    sigunguApi(sidoCode)
  }, [isFocused, sidoCode, sigunguCode]) 

  // 시도가 변경될 때 시군구가 선택되어있으면 초기화
  useEffect(() => {
    if (sigunguCode) {
      setSigunguCode(null)
    }
  }, [sidoCode]);

  return (
    <View style={[styles.filterPopup, filterPopup && styles.filterPopupActive]}>
      <View style={styles.datepickerWrap}>
        <TextInput style={styles.input} placeholder='날짜' />
        <Text style={styles.line}>~</Text>
        <TextInput style={styles.input} placeholder='날짜' />
      </View>
      <View style={styles.inputWrap}>
        {
          animal &&
            <View style={[styles.SelectWrap, styles.animalWrap]}>
              {/* 103,103, 103 */}
              <Select placeholder='지역' items={location} setItems={setLocation} size={103} value={sidoCode} setValue={setSidoCode} />
              <Select placeholder='지역' items={location} setItems={setLocation} size={103} value={sidoCode} setValue={setSidoCode} />
              <Select placeholder='도시' items={city} setItems={setCity} size={103} value={sigunguCode} setValue={setSigunguCode} />
            </View>
        }
          <View style={styles.SelectWrap}>
            {/* 178, 140 */}
            <Select placeholder='지역' items={location} setItems={setLocation} size={178} value={sidoCode} setValue={setSidoCode} />
            <Select placeholder='도시' items={city} setItems={setCity} size={140} value={sigunguCode} setValue={setSigunguCode} />
          </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  filterPopup: {
    width: 350,
    position: 'absolute',
    left: 13,
    top: 64,
    backgroundColor: '#fff',
    display: 'none',
    zIndex: 999,
    borderRadius: 8,
    shadowColor: '#1F2329',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4, // Android
  },
  filterPopupActive: {
    display: 'block'
  },
  datepickerWrap: {
    width: '100% + 24',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#E7E9ED'
  },
  input: {
    width: 150,
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
  line: {
    fontSize: 14,
    // fontFamily: 'Wanted Sans',
    color: '#8D96A4'
  },
  inputWrap: {
    flexDirection: 'column-reverse',
    padding: 12
  },
  SelectWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  animalWrap: {
    marginTop: 8
  }
})

export default FilterPopup