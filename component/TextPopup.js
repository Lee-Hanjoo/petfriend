import React, { useState } from 'react'
import { StyleSheet, Text } from 'react-native'
import { Pressable } from 'react-native'
import { View } from 'react-native'

const TextPopup = (props) => {
  const {textPopup, item} = props;
  return (
    <View style={[styles.textPopup, textPopup && styles.textPopupActive]}>
      {
        item.map((item,i)=>(
          <Pressable key={i} onPress={()=>{console.log(item);}}>
            <Text style={styles.item}>{item}</Text>
          </Pressable>
        ))
      }
    </View>
  )
}

const styles = StyleSheet.create({
  textPopup: {
    width: 92,
    position: 'absolute',
    right: 44,
    top: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 4,
    display: 'none',
    zIndex: 999,
    borderRadius: 8,
    boxShadow: '2px 2px 12px rgba(31, 35, 41, 0.1)'
  },
  textPopupActive: {
    display: 'block'
  },
  item: {
    fontSize: 12,
    color: '#1F2329',
    // fontFamily: 'Wanted Sans',
    paddingVertical: 8,
    textAlign: 'center',
    borderRadius: 4,
    marginBottom: 4,
    backgroundColor: 'rgba(231, 233, 237, 0.4)'
  }
})

export default TextPopup