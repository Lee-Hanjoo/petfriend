import React, { useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { ImgPath } from '../ImgPath'

const Tab = (props) => {

  const {title, top, icon} = props;
  const [tabActive, setTabActive] = useState(0);

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
    <View style={[styles.tabWrap, top && styles.top]}>
      {title.map((titleItem,i)=>(
        <Pressable 
          key={i} 
          onPress={()=>{setTabActive(i)}} 
          style={[
            styles.tabItemWrap,
            tabActive === i && styles.tabItemActive, 
            icon && styles.tabItemIconWrap,
            ]}
          >
          {icon && renderIcon(titleItem, tabActive === i)}
          <Text style={[styles.tabItem, tabActive === i && styles.tabItemActive]}>{titleItem}</Text>
        </Pressable>
      ))}
    </View>
  )
}


const styles = StyleSheet.create({
  tabWrap: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingLeft:20,
    flexShrink: 0, 
    overflow: 'auto',
    gap: 8
  },
  top: {
    width: '100%',
    marginBottom: 0,
    backgroundColor: '#fff',
    paddingTop: 84,
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
  }
})

export default Tab