import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Tag = (props) => {

  const {title, index} = props;

  const titleMap = {
    '보호중': {style: styles.yellow, text: '보호중'},
    '중성화X': {style: styles.gray, text: '중성화'},
    '중성화O': {style: styles.blue, text: '중성화'},
    '공고중': {style: styles.green, text: '공고중'},
    '실종': {style: styles.singleOrange, text: '실종'},
    '목격': {style: styles.singleGreen, text: '목격'},
    '완료': {style: styles.singleGray, text: '완료'},
  }

  return (
    <View 
      style={[ 
        styles.tag, 
        titleMap[title].style,
      ]}
    >
      <Text style={[styles.tagText, titleMap[title].style]}>{titleMap[title].text}</Text>
    </View>
  )
}


const tGray = '#8D96A4';
const gray = '#E7E9ED';
const green = '#64DC41';
const yellow = '#F3B255';
const blue = '#64C7FA';

const styles = StyleSheet.create({
  tag: {
    width: 'fit-content',
    paddingVertical: 4, 
    paddingHorizontal: 8, 
    borderRadius: 999
  },
  tagText : {
    fontSize: 12,
    // fontFamily: 'Wanted Sans',
    fontWeight: '700',
    lineHeight: 14
  },
  green: {
    backgroundColor: '#E0F8D9',
    color: green
  },
  yellow: {
    backgroundColor: '#FDF0DD',
    color: yellow
  },
  blue: {
    backgroundColor: '#E0F4FE',
    color: blue
  },
  gray: {
    backgroundColor: gray,
    color: tGray
  },
  singleOrange: {
    backgroundColor: '#EE815E',
    color: '#fff',
    fontWeight: '400',
  },
  singleGreen:{
    backgroundColor: '#64DC41',
    color: '#fff',
    fontWeight: '400',
  },
  singleGray:{
    backgroundColor: '#8D96A4',
    color: '#fff',
    fontWeight: '400',
  },
})

export default Tag