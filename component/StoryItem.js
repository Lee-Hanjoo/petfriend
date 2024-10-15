import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import NumBox from './NumBox';

const StoryItem = (props) => {
  const {src, title, name, profileSrc, view, date, heartNum, commentNum} = props;
  return (
    <Pressable>
      <View style={styles.container}>
        <View style={styles.imgBox}>
          <NumBox heartNum={heartNum} commentNum={commentNum} />
          <Image source={src} style={{width:170,height:170}}/>
        </View>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
        <View style={styles.profileBox}>
          <Image source={profileSrc} />
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
    width: 170
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
    // gap: 4,
    marginVertical: 8
  },
  name: {
    width: 140,
    fontSize: 12,
    color: '#1F2329',
    // fontFamily: 'Wanted Sans'
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
    // fontFamily: 'Wanted Sans'
  },
  view: {
    textAlign: 'right',
    color: '#8D96A4',
    fontSize: 12,
    // fontFamily: 'Wanted Sans'
  }
})

export default StoryItem