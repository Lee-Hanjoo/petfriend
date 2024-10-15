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
    boxShadow: '2px 2px 12px rgba(31, 35, 41, 0.1)'
  },
})

export default Heart