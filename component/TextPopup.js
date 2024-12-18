import React, { useState } from 'react'
import { StyleSheet, Text } from 'react-native'
import { Pressable } from 'react-native'
import { View } from 'react-native'

const TextPopup = (props) => {
  const {textPopup, setTextPopup, item, openMap, setOpenMap} = props;
  return (
    <View style={[styles.textPopup, textPopup && styles.textPopupActive, openMap && {top: 252}]}>
      {
        item.map((item,i)=>(
          <Pressable key={i} 
            onPress={()=>{
              item === '지도 펼치기' && setOpenMap(true),
              item === '지도 접기' && setOpenMap(false),
              setTextPopup(false)
            }}
          >
            <Text style={styles.item}>{item}</Text>
          </Pressable>
        ))
      }
    </View>
  )
}

const styles = StyleSheet.create({
  textPopup: {
    width: 120,
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
    borderWidth: 1,
    borderColor: '#E7E9ED',
    shadowColor: '#1F2329',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4, // Android
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