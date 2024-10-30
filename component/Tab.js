import React, { useEffect, useState } from 'react'
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { ImgPath } from '../ImgPath'
import { ScrollView } from 'react-native'
import FilterPopup from './FilterPopup'

const {width, height} = Dimensions.get('window')

const Tab = (props) => {

  const {title, top, icon, filter, filterPopup, setFilterPopup, setTabIndex, second, setTabSecIndex} = props;
  
  const [tabActive, setTabActive] = useState(0);
  const [tabSecActive, setTabSecActive] = useState(0);

  useEffect(()=>{
    if(second) {
      setTabSecIndex(tabSecActive)
    } else {
      setTabIndex(tabActive)
    }
  },[tabActive, tabSecActive])

  const renderIcon = (title, isActive) => {
    if (title === '보호소') {
      return isActive
        ? <Image source={ImgPath.shelter_on} />
        : <Image source={ImgPath.shelter} />
    } else if (title === '동물병원') {
      return isActive
        ? <Image source={ImgPath.hospital_on} />
        : <Image source={ImgPath.hospital} />
    } else if (title === '놀이터') {
      return isActive
        ? <Image source={ImgPath.playground_on} />
        : <Image source={ImgPath.playground} />
    }
    return null;
  };

  return (
    <>
      <View style={[styles.tabWrap, top && styles.top]}>
        <ScrollView horizontal>
          {title.map((titleItem,i)=>(
            <Pressable 
              key={i} 
              onPress={()=>{
                setTabSecActive(i)
                setTabActive(i)
              }} 
              style={[
                styles.tabItemWrap,
                tabActive === i && styles.tabItemActive, 
                icon && styles.tabItemIconWrap,
                i === 0 && {marginLeft: 20},
                i > 0 && {marginLeft: 8}
                ]}
              >
              {icon && renderIcon(titleItem, tabActive === i)}
              <Text style={[styles.tabItem, tabActive === i && styles.tabItemActive]}>{titleItem}</Text>
            </Pressable>
          ))}
        </ScrollView>
        {
          filter && 
          <View style={styles.filterWrap}>
            <Pressable 
              style={[
                styles.filterBtn, 
                filterPopup && {borderColor: '#64C7FA'},
              ]} 
              onPress={()=>{setFilterPopup(!filterPopup)}
            }>
              {
                filterPopup ?
                <Image source={ImgPath.filter_on}/>
                :
                <Image source={ImgPath.filter}/>
              }
            </Pressable>
          </View>
        }
      </View>
    </>
  )
}


const styles = StyleSheet.create({
  tabWrap: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  top: {
    marginBottom: 0,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingBottom: 12,
    position: 'fixed',
    left: 0,
    top: 0,
    zIndex: 999
  },
  tabItemWrap: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    flexDirection: 'row',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#E7E9ED",
    alignItems: 'center',
    gap: 2
  },
  tabItem: {
    fontSize: 14,
    lineHeight: 17,
    color: '#8D96A4',
  },
  tabItemActive: {
    color: "#fff",
    fontWeight: '700',
    borderColor: "#64C7FA",
    backgroundColor: '#64C7FA'
  },
  tabItemIconWrap: {
    paddingVertical: 8,
    paddingLeft: 10,
    paddingRight: 12
  },
  filterWrap: {
    paddingRight: 20,
    width: 72,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  filterBtn: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E7E9ED',
    borderRadius: 6,
    backgroundColor: '#fff'
  },
})

export default Tab