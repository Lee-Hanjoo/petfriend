import React, { useState } from 'react'
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import {ImgPath} from '../ImgPath'

const {width, height} = Dimensions.get('window')

const FAQItem = (props) => {

  const {question, index, answer} = props;
  const [isOpen, setIsOpen] = useState(null)

  const formattedText = answer.replace(/\\n/g, '\n');

  return (
    <>
      <Pressable 
        style={[
          styles.FAQItemWrap,
          index === 0 && {borderTopWidth: 1}
        ]}
        onPress={()=>{
          if (isOpen === index) {
            setIsOpen(null)
          } else {
            setIsOpen(index)
          }
        }}
      >
        <View style={styles.titleWrap}>
          <Text 
            style={[
              styles.title,
            ]}
            numberOfLines={1}
            ellipsizeMode="tail" 
          >
            {question}
          </Text>
        </View>
        {
          isOpen === index ?
          <Image source={ImgPath.faq_up_arrow}/>
          :
          <Image source={ImgPath.faq_down_arrow}/>
        }
      </Pressable>
      <View style={[styles.answerWrap, isOpen === index ? {maxHeight: 9999} : {maxHeight: 0}]}>
        <ScrollView style={styles.answerBox}>
          <Text style={styles.answerText}>{formattedText}</Text>
        </ScrollView>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  FAQItemWrap: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#E7E9ED',
    gap: 8
  },
  titleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  title: {
    width: width - 64,
    fontSize: 16,
    color: '#1F2329',
    fontWeight: '700',
  },
  date: {
    color: '#8D96A4'
  },
  answerWrap: {
    backgroundColor: 'rgba(231, 233, 237, 0.4)',
    overflow: 'hidden'
  },
  answerBox: {
    padding: 20
  },
  answerText: {
    color: 'rgba(31, 35, 41, 0.8)'
  }
})

export default FAQItem