import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { StyleSheet, Text } from 'react-native'
import Select from '../component/Select'
import { useMenu } from '../MenuProvider'

const Write = () => {

  const { 
    board, setBoard, 
    storyCategory, setStoryCategory, 
    missingCategory, setMissingCategory 
  } = useMenu();

  return (
    <FlatList
      data={[{ key: 'content' }]} // 리스트 데이터를 단일 객체로 설정
      renderItem={() => (
        <View style={styles.contents}>
          {/* 게시판 카테고리 설정 */}
          <View style={styles.boardWrap}>
            <Text>게시판</Text>
            <Select placeholder='게시판' items={board} setItems={setBoard} size={180} value={board} />
            <Select placeholder='분류' items={storyCategory} setItems={setStoryCategory} size={80} />
            <Select placeholder='분류' items={missingCategory} setItems={setMissingCategory} size={80} />
          </View>
          {/* 필수 입력사항 */}
          <View></View>
          {/* 스토리 입력사항 */}
          <View></View>
          {/* 실종 동물 입력사항 - 1/2 (위치) */}
          <View></View>
          {/* 실종 동물 입력사항 - 2/2 (동물 정보) */}
          <View></View>
        </View>
      )}
      keyExtractor={(item) => item.key}
      contentContainerStyle={styles.container}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingBottom: 128,
    backgroundColor: '#fff',
  },
  boardWrap: {
    flexDirection: 'row',
  },
})

export default Write
