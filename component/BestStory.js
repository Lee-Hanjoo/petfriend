import React from 'react'
import Heart from './Heart'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useMenu } from '../MenuProvider';

const BestStory = (props) => {

  const { src, title, desc, index} = props;

  const navigation = useNavigation();
  const { menuActive, setMenuActive, setDetailActive } = useMenu(); 

  return (
    <Pressable 
      style={[
        styles.bestStroyWrap,
        index > 0 && {marginLeft: 10},
        index == 0 && {marginLeft: 20}
      ]}
      onPress={()=>{
        setMenuActive('detail'); 
        navigation.navigate('detail'); 
        setDetailActive('story');
      }}
    >
      <Heart />
      <Image source={src} style={styles.img} />
      <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
      <Text style={styles.desc} numberOfLines={2} ellipsizeMode="tail">{desc}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  bestStroyWrap: {
    maxWidth: 160,
    position: 'relative',
  },
  img: {
    marginBottom: 12,
    borderRadius: 8,
    overflow: 'hidden'
  },
  title: {
    marginBottom: 6,
    fontSize: 14,
    // fontFamily: 'Wanted Sans',
    fontWeight: '600',
    color: '#1F2329'
  },
  desc: {
    fontSize: 12,
    // fontFamily: 'Wanted Sans',
    color: '#8D96A4'
  },
})

export default BestStory