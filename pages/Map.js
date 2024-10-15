import React, { useState } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { ScrollView, View, Text } from 'react-native'
import Tab from '../component/Tab'
import Select from '../component/Select'
import MapListItem from '../component/MapListItem'

const Map = () => {

  const [text, setText] = useState('');
  
  const [location, setLocation] = useState([
    { label: '서울특별시', value: 'seoul' },
    { label: '부산', value: 'busan' },
    { label: '바나나', value: 'banana' },
    { label: '사과', value: 'apple' },
  ]);
  const [city, setCity] = useState([
    { label: '중랑구', value: 'junglanggu' },
  ]);

  return (
    <View>
      <Tab top title={['보호소', '동물병원', '놀이터']} icon />
      <ScrollView style={styles.container}>
        <View style={styles.mapWrap}></View>
        <View style={styles.selectWrap}>
          <Select placeholder='지역' items={location} setItems={setLocation} size={104} />
          <Select placeholder='도시' items={city} setItems={setCity} size={84} />
          <View style={styles.line}></View>
          <TextInput placeholder='인허가번호' style={styles.input} placeholderTextColor='#8D96A4' value={text} onChangeText={setText} />
        </View>
        <View>
          {new Array(12).fill().map((item, i)=> 
            <MapListItem title='(주)에니멀클리닉컨설팅(출장진료전문병원)' location='경기도 용인시 기흥구 신갈동' callNum='031-222-2233' licenseNum='1234' />
          )}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 4,
    paddingBottom: 128,
    backgroundColor: '#fff',
  },
  mapWrap: {
    width: '100%',
    height: 360,
    marginTop: 4,
    marginBottom: 16,
    backgroundColor: 'gray'
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
    fontFamily: 'Wanted Sans',
    placeholderColor: '#8D96A4'
  },
  selectWrap:{
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
    position: 'sticky',
    left: 0,
    top: 0,
  },
  line: {
    width: 1,
    height: 20,
    backgroundColor: '#E7E9ED',
    marginHorizontal: 2
  },
})

export default Map