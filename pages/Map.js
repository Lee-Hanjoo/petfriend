import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, FlatList, View, Text } from 'react-native';
import Tab from '../component/Tab';
import Select from '../component/Select';
import MapListItem from '../component/MapListItem';
import { useMenu } from '../MenuProvider'
import { api } from '../api/api';
import { useIsFocused } from '@react-navigation/native';

const Map = () => {

  const [text, setText] = useState('');

  const [tabIndex, setTabIndex] = useState(0)

  const [sidoCode, setSidoCode] = useState(null)
  const [location, setLocation] = useState([])

  // 이 페이지를 진입했을 때.
  const isFocused = useIsFocused()

  const asd = async () => {
    const sido = await api.sido()
    // console.log(sido.response.body.items.item)
    setLocation(sido.response.body.items.item.map((v) => {
      console.log(v);
      
      return {
        label: v.orgdownNm,
        value: v.orgCd
      }
    }))
  }

    useEffect(() => {
      console.log(isFocused);
      // 포커스가 false일때 (페이지를 벗어났을 때) 스크롤탑 0
      if(!isFocused) return 
      asd()
      
    }, [isFocused]) 

    useEffect(() => {
      console.log(`sidoCode`, sidoCode)
    }, [sidoCode])

  const { 
    city, setCity,
  } = useMenu();

  const renderItem = ({ item }) => (
    <MapListItem 
      title='(주)에니멀클리닉컨설팅(출장진료전문병원)' 
      location='경기도 용인시 기흥구 신갈동' 
      callNum='031-222-2233' 
      licenseNum='1234' 
    />
  );

  const renderScrollableContent = () => (
    <View style={styles.mapWrap}></View>
  );

  return (
    <View style={styles.container}>
      <Tab top icon title={['보호소', '동물병원', '놀이터']} tabIndex={tabIndex} setTabIndex={setTabIndex} />
      <View style={styles.selectWrap}>
        <Select placeholder='지역' items={location} setItems={setLocation} size={104} value={sidoCode} setValue={setSidoCode} />
        <Select placeholder='도시' items={city} setItems={setCity} size={84}  />
        <View style={styles.line}></View>
        <TextInput 
          placeholder='인허가번호' 
          style={styles.input} 
          placeholderTextColor='#8D96A4' 
          value={text} 
          onChangeText={setText} 
        />
      </View>
      <FlatList
        data={new Array(12).fill()}
        ListHeaderComponent={renderScrollableContent}
        ListHeaderComponentStyle={{zIndex:1}}
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
  mapWrap: {
    width: '100%',
    height: 360,
    marginBottom: 16,
    backgroundColor: 'gray',
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
