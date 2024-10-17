import React, { useState } from 'react'
import { Image, Pressable, StyleSheet } from 'react-native'
import { ImgPath } from '../ImgPath'

const Heart = (props) => {

  const {border} = props;

  const [heart, setHeart] = useState(false)

  return (
    <Pressable style={[styles.heart, border ? styles.border : styles.shadow]} onPress={()=>{setHeart(!heart)}}>
      {
        heart ? 
        <Image source={ImgPath.heart_on_circle} />
        :
        <Image source={ImgPath.heart_circle} />
      }
    </Pressable>
  )
}

const styles = StyleSheet.create({
  heart: {
    position: 'absolute',
    right: 12,
    top: 12,
    zIndex: 1,
    borderRadius: 999,
  },
  shadow: {
    shadowColor: '#1F2329',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4, // Android
  },
  border: {
    right: 20,
    top: 16,
    borderWidth: 1,
    borderColor: '#E7E9ED'
  }
})

export default Heart