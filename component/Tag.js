import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Tag = (props) => {

  const {title, index, bold} = props;

  const titleMap = {
    '보호중': {style: styles.yellow, text: '보호중'},
    '공고중': {style: styles.green, text: '공고중'},
    '종료(반환)': {style: styles.black, text: '종료(반환)'}, 
    '종료(자연사)': {style: styles.black, text: '종료(자연사)'}, 
    '중성화X': {style: styles.gray, text: '중성화X'},
    '중성화O': {style: styles.blue, text: '중성화O'},
    '중성화미상': {style: styles.orange, text: '중성화 미상'},
    '실종': {style: styles.singleOrange, text: '실종'},
    '목격': {style: styles.singleGreen, text: '목격'},
    '완료': {style: styles.singleGray, text: '완료'},
    '필독': {style: styles.singleOrange, text: '필독'},
  }

  return (
    <View 
      style={[ 
        styles.tag, 
        titleMap[title] && titleMap[title].style,
      ]}
    >
      <Text 
        style={[
          styles.tagText, 
          titleMap[title] && titleMap[title].style,
          bold && {fontWeight: '700'}
        ]}
      >
        {titleMap[title] ? titleMap[title].text : title}
      </Text>
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
    borderRadius: 999,
    backgroundColor: gray,
  },
  tagText : {
    fontSize: 12,
    // fontFamily: 'Wanted Sans',
    fontWeight: '700',
    lineHeight: 14,
    color: tGray
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
  orange: {
    backgroundColor: "#FCE6DF",
    color: "#EE815E"
  },
  black: {
    backgroundColor: "#1F2329",
    color: "#fff"
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