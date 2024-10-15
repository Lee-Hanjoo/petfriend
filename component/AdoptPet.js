import React from 'react'
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import Tag from './Tag'
import Heart from './Heart'
import Location from './Location'

const {width, height} = Dimensions.get('window')

const AdoptPet = (props) => {

  const {location, name, info, src, detail, index} = props;
  
  return (
    <Pressable 
      style={[
        styles.AdoptPetWrap, 
        detail && styles.AdoptPetWrapDetail,
        index % 2 && {marginLeft: 10},
        index > 1 && {marginTop: 10},
        ]}
      >
      <View>
        <Heart />
        { detail && <Location bg detail location='충청남도 공주시' /> }
        <Image source={src} style={[styles.sizeL, detail && styles.sizeM]}/>
        <View style={[styles.petBox, detail && styles.petBoxDetail]}>
          <View style={styles.tagWrap}>
            {
              props.tagTitle.map((title, i)=>(
                <Tag key={i} title={title} index={i}/>
              ))
            }
          </View>
          <View style={[styles.petWrap, detail && styles.petWrapDetail]}>
            <Text style={[styles.name, styles.nameDetail]}>{name}</Text>
            <Text style={styles.info}>({info})</Text>
          </View>
          { !detail && <Location location={location} /> }
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  AdoptPetWrap: {
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#E7E9ED'
  },
  AdoptPetWrapDetail: {
    width: width / 2 - 25,
  },
  petBox: {
    marginTop: 12,
    paddingHorizontal: 12,
    paddingBottom: 16,
  },
  petBoxDetail: {
    paddingBottom: 4,
  },
  tagWrap: {
    flexDirection: 'row', 
    marginBottom: 8
  },
  petWrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 8
  },
  petWrapDetail: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2329'
  },
  nameDetail: {
    marginBottom: 4
  },
  info: {
    fontSize: 12,
    color: '#8D96A4',
    marginBottom: 2
  },
  sizeL: {
    width: 200,
    height: 160
  },
  sizeM: {
    width: width / 2 - 25,
    height: width / 2 - 25
  },
})


export default AdoptPet