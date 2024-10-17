import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import NumBox from './NumBox';
import { useNavigation } from '@react-navigation/native'
import { useMenu } from '../MenuProvider';

const CommunityCard = (props) => {

  const { src, title, desc, location, date, detail } = props;

  const navigation = useNavigation();
  const { menuActive, setMenuActive } = useMenu(); 
  
  return (
    <Pressable 
      style={styles.communityCardWrap}
      onPress={()=>{
        setMenuActive('detail'); navigation.navigate('detail')
      }}
    >
      <Image source={src} />
      <View style={styles.top}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc} numberOfLines={2} ellipsizeMode="tail">{desc}</Text>
      </View>
      <View style={styles.bottom}>
        <Text style={styles.location}>{location}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  communityCardWrap: {
    width: 336,
    marginLeft: 20,
    borderWidth: 1,
    borderColor: '#E7E9ED',
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  top: {
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2329',
    // fontFamily: 'Wanted Sans',
    marginBottom: 8
  },
  desc: {
    fontSize: 12,
    // fontFamily: 'Wanted Sans',
    lineHeight: 16,
    color: '#8D96A4'
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(231, 233, 237, 0.4)'
  },
  location: {
    width: 136,
    paddingLeft: 12,
    fontSize: 12,
    color: '#1F2329',
    // fontFamily: 'Wanted Sans',
    marginRight: 10
  },
  date: {
    paddingRight: 12,
    fontSize: 12,
    color: '#1F2329',
    // fontFamily: 'Wanted Sans',
    textAlign: 'right'
  },
})

export default CommunityCard