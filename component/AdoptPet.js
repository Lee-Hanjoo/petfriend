import React from 'react'
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import Tag from './Tag'
import Heart from './Heart'
import Location from './Location'
import { useNavigation } from '@react-navigation/native'
import { useMenu } from '../MenuProvider';

const {width, height} = Dimensions.get('window')

const AdoptPet = (props) => {

  const navigation = useNavigation();
  const { setMenuActive, setDetailActive } = useMenu(); 

  const {location, name, info, src, detail, index, itemAnimal} = props;
  
  return (
    <Pressable 
      style={[
        styles.AdoptPetWrap, 
        detail && styles.AdoptPetWrapDetail,
        (!detail && index > 0) && {marginLeft: 10},
        (!detail && index == 0) && {marginLeft: 20}
        ]}
      onPress={()=>{
        setMenuActive('detail'); 
        navigation.navigate('detail', {itemAnimal}); 
        setDetailActive('adopt')
      }}
      >
      <View style={{gap: 8}}>
        <Heart />
        { detail && <Location bg detail location={location} /> }
        <Image source={{uri:src}} style={[styles.sizeL, detail && styles.sizeM]}/>
        <View style={[styles.petBox, detail && styles.petBoxDetail]}>
          <View style={styles.tagWrap}>
            {
              props.tagTitle.map((title, i)=>(
                <Tag key={i} title={title} index={i}/>
              ))
            }
          </View>
          <View style={[styles.petWrap, detail && styles.petWrapDetail]}>
            <Text style={[styles.name, styles.nameDetail]} numberOfLines={1} ellipsizeMode="tail">{name}</Text>
            <Text style={styles.info} numberOfLines={1} ellipsizeMode="tail">{info}</Text>
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
    borderColor: '#E7E9ED',
    width: 200,
  },
  AdoptPetWrapDetail: {
    width: width / 2 - 25,
  },
  petBox: {
    paddingHorizontal: 12,
    paddingBottom: 16,
    gap: 8
  },
  petBoxDetail: {
    paddingBottom: 12,
  },
  tagWrap: {
    flexDirection: 'row', 
    gap: 4,
    marginTop: 4
  },
  petWrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4
  },
  petWrapDetail: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 0
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
    height: 160,
    resizeMode: 'cover',
  },
  sizeM: {
    width: width / 2 - 25,
    height: width / 2 - 25
  },
})


export default AdoptPet