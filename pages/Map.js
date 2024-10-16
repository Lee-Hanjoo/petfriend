import React, { useState } from 'react';
import { StyleSheet, TextInput, FlatList, View, Text } from 'react-native';
import Tab from '../component/Tab';
import Select from '../component/Select';
import MapListItem from '../component/MapListItem';

const Map = () => {

  const [text, setText] = useState('');

  const [tabIndex, setTabIndex] = useState(0)

  const [location, setLocation] = useState([
    { label: '서울특별시', value: 'seoul' },
    { label: '부산', value: 'busan' },
    { label: '바나나', value: 'banana' },
    { label: '사과', value: 'apple' },
  ]);

  const [city, setCity] = useState([
    { label: '중랑구', value: 'junglanggu' },
  ]);

  const renderItem = ({ item }) => (
    <MapListItem 
      title='(주)에니멀클리닉컨설팅(출장진료전문병원)' 
      location='경기도 용인시 기흥구 신갈동' 
      callNum='031-222-2233' 
      licenseNum='1234' 
    />
  );

  const renderScrollableContent = () => (
    <View>
      <View style={styles.mapWrap}></View>
      <View style={styles.selectWrap}>
        <Select placeholder='지역' items={location} setItems={setLocation} size={104} />
        <Select placeholder='도시' items={city} setItems={setCity} size={84} />
        <View style={styles.line}></View>
        <TextInput 
          placeholder='인허가번호' 
          style={styles.input} 
          placeholderTextColor='#8D96A4' 
          value={text} 
          onChangeText={setText} 
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Tab top icon title={['보호소', '동물병원', '놀이터']} tabIndex={tabIndex} setTabIndex={setTabIndex} />
      <FlatList
        data={new Array(12).fill()}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={renderScrollableContent}
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
    paddingBottom: 128,
  },
  mapWrap: {
    width: '100%',
    height: 360,
    marginTop: 4,
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
