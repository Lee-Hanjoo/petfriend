import React, { useState } from 'react'
import { Platform, StyleSheet, Text, TextInput } from 'react-native'
import { Pressable } from 'react-native'
import { View } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import Select from './Select';


const FilterPopup = (props) => {

  const {filterPopup, item} = props;
  const [location, setLocation] = useState([
    { label: '서울특별시', value: 'seoul' },
    { label: '부산', value: 'busan' },
    { label: '바나나', value: 'banana' },
    { label: '사과', value: 'apple' },
  ]);

  return (
    <View style={[styles.filterPopup, filterPopup && styles.filterPopupActive]}>
      <View style={styles.datepickerWrap}>
        <TextInput style={styles.input} placeholder='날짜' placeholderTextColor='#8D96A4' />
        <Text style={styles.line}>~</Text>
        <TextInput style={styles.input} placeholder='날짜' placeholderTextColor='#8D96A4' />
      </View>
      <View style={styles.inputWrap}>
        <View style={[styles.SelectWrap, styles.animalWrap]}>
          <Select placeholder='지역' items={location} setItems={setLocation} size={103} />
          <Select placeholder='지역' items={location} setItems={setLocation} size={103} />
          <Select placeholder='지역' items={location} setItems={setLocation} size={103} />
        </View>
        <View style={styles.SelectWrap}>
          <Select placeholder='지역' items={location} setItems={setLocation} size={178} />
          <Select placeholder='지역' items={location} setItems={setLocation} size={140} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  filterPopup: {
    width: 350,
    position: 'absolute',
    left: 20,
    top: 120,
    backgroundColor: '#fff',
    display: 'none',
    zIndex: 999,
    borderRadius: 8,
    boxShadow: '2px 2px 12px rgba(31, 35, 41, 0.1)'
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
    // gap: 8
  },
  animalWrap: {
    marginTop: 8
  }
})

export default FilterPopup