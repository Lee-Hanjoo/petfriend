import React, { useState } from 'react'
import { StyleSheet, Text } from 'react-native'
import NoticeItem from '../component/NoticeItem'
import { ScrollView } from 'react-native'
import noticeDataBase from '../dataBase/noticeData.json'

const Notice = () => {

  const [noticeData, setNoticeData] = useState(noticeDataBase)

  return (
    <ScrollView style={styles.container}>
      {
        noticeData.items.map((item)=> {
          return (
            <NoticeItem 
              key={item.id} 
              index={item.id}
              badge={item.badge}
              title={item.title} 
              date={item.date} 
              itemNotice={item}
            /> 
          )
      })
    }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    paddingBottom: 128,
    backgroundColor: '#fff',
  }
})

export default Notice