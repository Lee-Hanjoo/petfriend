import React from 'react'
import { Dimensions, Image, StyleSheet, View } from 'react-native'
import Tag from './Tag'
import { Text } from 'react-native'
import Location from './Location'

const {width, height} = Dimensions.get('window')

const MissingPet = (props) => {
  const { tagTitle, location, src, name, date, info, index } = props;
  return (
    <View 
      style={[styles.MissingPetWrap, index > 1 && {marginTop: 14}]}
    >
      <View style={styles.imgWrap}>
        <View style={styles.missingTag}>
          <Tag title={tagTitle} />
        </View>
        <View style={styles.missingLocation}>
          <Location bg style={styles.location} location={location} />
        </View>
        <Image source={src} style={{width: '100%', height: '100%'}} />
      </View>
      <View style={styles.infoWrap}>
        <View style={styles.infoText}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        <Text style={styles.info} numberOfLines={1} ellipsizeMode="tail">{info}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  MissingPetWrap: {
    width: width / 2 - 25,
  },
  imgWrap: {
    position: 'relative',
    width: width / 2 - 25,
    height: width / 2 - 25,
  },
  missingTag: {
    position: 'absolute',
    right: 12,
    top: 12,
    zIndex: 1
  },
  missingLocation: {
    width: '100%',
    position: 'absolute',
    left: 0,
    bottom: 0,
    zIndex: 1
  },
  infoWrap: {
    marginTop: 8
  },
  infoText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4
  },
  name: {
    fontSize: 14,
    // fontFamily: 'Wanted Sans',
    maxWidth: 92,
    fontWeight: '600',
    color: '#1F2329',
  },
  date: {
    fontSize: 12,
    // fontFamily: 'Wanted Sans',
    textAlign: 'right',
    color: '#1F2329'
  },
  info: {
    fontSize: 12,
    // fontFamily: 'Wanted Sans',
    color: '#8D96A4',
  },
})

export default MissingPet