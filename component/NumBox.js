import React, { useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { ImgPath } from '../ImgPath';

const NumBox = (props) => {
  const {heartNum, commentNum} = props;
  const [heart, setHeart] = useState(false)

  return (
    <View style={styles.container}>
      <Pressable style={styles.box} onPress={()=>{setHeart(!heart)}}>
        {
          heart ? 
          <Image source={ImgPath.heart_on} />
          :
          <Image source={ImgPath.heart} />
        }
        <Text style={styles.boxText}>{heartNum}</Text>
      </Pressable>
      <View style={[styles.box, styles.commentBox]}>
        <Image source={ImgPath.comment} />
        <Text style={styles.boxText}>{commentNum}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    left: 12,
    bottom: 12,
    zIndex: 2,
    gap: 4,
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingRight: 8,
    paddingLeft: 6,
    backgroundColor: '#fff',
    borderRadius: 999,
    shadowColor: '#1F2329',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4, // Android
  },
  boxText: {
    marginLeft: 2,
    color: '#8D96A4',
    fontSize: 10,
  },
  commentBox: {
    paddingLeft: 8,
    marginLeft: 4
  }
})

export default NumBox