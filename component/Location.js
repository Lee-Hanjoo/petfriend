import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native';
import { ImgPath } from '../ImgPath';

const Location = (props) => {
  const {location, bg, detail} = props;
  return (
    <View style={[styles.locationWrap, bg && styles.locationWrapBg, detail && styles.locationWrapDetail]}>
      {
        bg ? 
        <Image source={ImgPath.location_white} />
        :
        <Image source={ImgPath.location} />
      }
      <Text style={[styles.location, bg && styles.locationBg]}>{location}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  locationWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  locationWrapBg: {
    width: 'fit-content',
    paddingVertical: 4,
    paddingLeft: 6,
    paddingRight: 8,
    backgroundColor: 'rgba(31, 35, 41, 0.7)',
    borderRadius: 999,
    position: 'absolute',
    left: 12,
    bottom: 12,
    zIndex: 2
  },
  locationWrapDetail: {
    bottom: 'auto',
    top: 128
  },
  location: {
    fontSize: 12,
    fontWeight: '400',
    color: '#8D96A4'
  },
  locationBg: {
    color: '#fff'
  },
})

export default Location