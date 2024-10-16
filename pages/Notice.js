import React from 'react'
import { StyleSheet, Text } from 'react-native'
import NoticeItem from '../component/NoticeItem'
import { ScrollView } from 'react-native'

const Notice = () => {
  return (
    <ScrollView style={styles.container}>
      <NoticeItem badge title='동물보호관리시스템 오류 동물보호관리시스템 오류 동물보호관리시스템 오류 동물보호관리시스템 오류' date='2024. 06. 17' />
      <NoticeItem title='동물보호관리시스템 오류' date='2024. 06. 17' />
      {
        new Array(6).fill().map((item, i, filteredItems)=> {
          const isLastItem = i === filteredItems.length - 1;
          return (
            <NoticeItem key={i} index={i} title='동물보호관리시스템 오류 동물보호관리시스템 오류 동물보호관리시스템 오류 동물보호관리시스템 오류' date='2024. 06. 17' last={isLastItem}/> 
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