import React from 'react'
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import NumBox from './NumBox';
import { useNavigation } from '@react-navigation/native'
import { useMenu } from '../MenuProvider';

const {width, height} = Dimensions.get("window");

const StoryItem = (props) => {

  const {src, title, name, profileSrc, view, date, heartNum, commentNum, index} = props;

  const navigation = useNavigation();
  const { menuActive, setMenuActive, setDetailActive } = useMenu(); 
  
  return (
    <Pressable
      onPress={()=>{
        setMenuActive('detail'); navigation.navigate('detail'); setDetailActive('story')
      }}
    >
      <View 
        style={[
          styles.container,
          index > 1 && {marginTop: 14},
          ]}
        >
        <View style={styles.imgBox}>
          <NumBox heartNum={heartNum} commentNum={commentNum} />
          <Image source={src} style={{width:width / 2 - 25, height:width / 2 - 25}}/>
        </View>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
        <View style={styles.profileBox}>
          <Image source={profileSrc} style={styles.profileImg} />
          <Text style={styles.name} numberOfLines={1} ellipsizeMode="clip">{name}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.view}>조회수 {view}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: width / 2 - 25
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2329',
    // fontFamily: 'Wanted Sans'
  },
  imgBox: {
    position: 'relative',
    marginBottom: 12
  },
  profileBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginVertical: 8
  },
  profileImg: {
    width: 24,
    height: 24,
    borderRadius: 999,
    backgroundColor: '#8D96A4'
  },
  name: {
    width: width / 2 - 50,
    fontSize: 12,
    color: '#1F2329',
  },
  infoBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    textAlign: 'right',
    color: '#8D96A4',
    fontSize: 12,
  },
  view: {
    textAlign: 'right',
    color: '#8D96A4',
    fontSize: 12,
  }
})

export default StoryItem