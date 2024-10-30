import React from 'react'
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import NumBox from './NumBox';
import { useNavigation } from '@react-navigation/native'
import { useMenu } from '../MenuProvider';
import * as Linking from 'expo-linking';
import { Alert } from 'react-native';
import { ImgPath } from '../ImgPath';

const {width, height} = Dimensions.get('window')

const CommunityCard = (props) => {

  const { src, title, desc, location, date, detail, link, event, home, itemEvent } = props;

  const navigation = useNavigation();
  const { menuActive, setMenuActive, setDetailActive } = useMenu(); 
  const linking = () => {
    Linking.openURL(`${link}`)
  }

const showConfirm = () => {
  Alert.alert(
    "새로운 페이지 이동",
    "이 작업을 진행하시겠습니까?",
    [
      {
        text: "취소",
        // onPress: () => console.log("취소"),
        style: "cancel"
      },
      { 
        text: "확인", 
        onPress: () => linking()
      }
    ],
    { cancelable: false }
  );
};
  return (
    <Pressable 
      style={styles.communityCardWrap}
      onPress={()=>{
        if(link) {
          showConfirm()
        } else {
          setMenuActive('detail'); 
          navigation.navigate('detail', {itemEvent}); 
          setDetailActive('event')
        }
      }}
    >
      {link ? 
        <Image source={{uri: src}} style={{width: width, height: 200, resizeMode: 'cover'}} />
        :
        <Image source={src} style={{width: width, height: 200, resizeMode: 'cover'}} />
      }
      <View style={styles.top}>
        <Text style={styles.title} numberOfLines={home ? 1 : 2}>{title}</Text>
        <Text style={styles.desc} numberOfLines={event ? 5 : 2} ellipsizeMode="tail">{desc}</Text>
      </View>
      <View style={[styles.bottom, event && styles.bottomEvent]}>
        <Text style={styles.location}>{location}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  communityCardWrap: {
    width: width - 40,
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
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(231, 233, 237, 0.4)'
  },
  bottomEvent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 8
  },
  location: {
    fontSize: 12,
    color: '#1F2329',
  },
  date: {
    fontSize: 12,
    color: '#1F2329',
    // fontFamily: 'Wanted Sans',
    textAlign: 'right'
  },
})

export default CommunityCard