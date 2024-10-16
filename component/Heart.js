import React, { useState } from 'react'
import { Image, Pressable, StyleSheet } from 'react-native'
import { ImgPath } from '../ImgPath'

const Heart = () => {
  const [heart, setHeart] = useState(false)
  return (
    <Pressable style={styles.heart} onPress={()=>{setHeart(!heart)}}>
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
    right: -2,
    top: 2,
    zIndex: 1,
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
})

export default Heart