import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import Tag from './Tag'
import Heart from './Heart'
import Location from './Location'

const AdoptPet = (props) => {
  const {location, name, info, src, detail, index} = props;
  return (
    <Pressable 
      style={[
        styles.AdoptPetWrap, 
        detail && styles.AdoptPetWrapDetail,
        index > 0 && {marginLeft: 12}
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
            <Text style={styles.name}>{name}</Text>
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
    borderWidth: 1,
    borderColor: '#E7E9ED',
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  AdoptPetWrapDetail: {
    width: 170,
  },
  petBox: {
    marginTop: 12,
    paddingHorizontal: 12,
    paddingBottom: 16,
  },
  petBoxDetail: {
    paddingHorizontal: 12,
    paddingBottom: 12,
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
    alignItems: 'flex-start'
  },
  name: {
    fontSize: 18,
    // fontFamily: 'Wanted Sans',
    fontWeight: '700',
    color: '#1F2329'
  },
  info: {
    fontSize: 12,
    // fontFamily: 'Wanted Sans',
    color: '#8D96A4',
    marginBottom: 2
  },
  sizeL: {
    width: 200,
    height: 160
  },
  sizeM: {
    width: 170,
    height: 170
  },
})


export default AdoptPet