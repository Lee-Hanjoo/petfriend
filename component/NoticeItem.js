import React from 'react'
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import Tag from '../component/Tag'

const {width, height} = Dimensions.get('window')

const NoticeItem = (props) => {

  const {badge, title, date, index, last} = props;


  return (
    <Pressable style={[styles.noticeItemWrap, last && {borderBottomWidth: 1}]}>
      <View style={styles.titleWrap}>
        {badge && <Tag bold title={'필독'} />}
        <Text 
          style={[
            styles.title, 
            badge ? {width: width - 81} : {width: width - 44},
          ]}
          numberOfLines={1}
          ellipsizeMode="tail" 
        >
          {title}
        </Text>
      </View>
      <Text style={styles.date}>{date}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  noticeItemWrap: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#E7E9ED',
    gap: 8
  },
  titleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  title: {
    fontSize: 16,
    color: '#1F2329',
    fontWeight: '700',
  },
  date: {
    color: '#8D96A4'
  }
})

export default NoticeItem