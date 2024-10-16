import React, { useEffect, useState } from 'react'
import { FlatList, Pressable, TextInput, View } from 'react-native'
import { StyleSheet, Text } from 'react-native'
import Select from '../component/Select'
import { useMenu } from '../MenuProvider'

const Write = () => {

  const { 
    location, setLocation,
    city, setCity,
    board, setBoard, 
    animal, setAnimal,
    breed, setBreed,
    storyCategory, setStoryCategory, 
    missingCategory, setMissingCategory 
  } = useMenu();

  return (
    <FlatList
      data={[{ key: 'content' }]} // 리스트 데이터를 단일 객체로 설정
      renderItem={() => (
        <View style={styles.contents}>
          {/* 게시판 카테고리 설정 */}
          <View>
            <View style={styles.labelWrap}>
              <Text style={styles.label}>게시판</Text>
              <View style={styles.submitWrap}>
                <Select placeholder='게시판' items={board} setItems={setBoard} size={140} />
                <Select placeholder='분류' items={storyCategory} setItems={setStoryCategory} size={100} />
                <Select placeholder='분류' items={missingCategory} setItems={setMissingCategory} size={80} />
              </View>
            </View>
          </View>
          <View style={styles.borderLine}></View>
          {/* 날짜, 위치 입력사항 */}
          <View style={{marginTop: 24, gap: 24}}>
            <View style={styles.labelWrap}>
              <Text style={styles.label}>날짜</Text>
              <TextInput style={styles.input} placeholder='0000. 00. 00' placeholderTextColor='#8D96A4' />
            </View>
            <View style={styles.labelWrap}>
              <Text style={styles.label}>지역</Text>
              <View style={styles.submitWrap}>
                <Select placeholder='지역' items={location} setItems={setLocation} size={140} />
                <Select placeholder='도시' items={city} setItems={setCity} size={100} />
              </View>
            </View>
            <View style={styles.labelWrap}>
              <Text style={styles.label}>장소</Text>
              <TextInput style={styles.input} placeholder='구체적인 장소' placeholderTextColor='#8D96A4' />
            </View>
            <View style={styles.labelWrap}>
              <Text style={styles.label}>연락처</Text>
              <TextInput style={styles.input} placeholder='010-0000-0000' placeholderTextColor='#8D96A4' />
            </View>
          </View>
          <View style={styles.borderLine}></View>
          {/* 스토리 입력사항 */}
          <View style={{marginTop: 24, gap: 24}}>
            <View style={styles.labelWrap}>
              <Text style={styles.label}>품종</Text>
              <View style={styles.submitWrap}>
                <Select placeholder='품종' items={animal} setItems={setAnimal} size={100} />
                <Select placeholder='세부 종' items={breed} setItems={setBreed} size={140} />
              </View>
            </View>
            <View style={styles.labelWrap}>
              <Text style={styles.label}>성별</Text>
              <View style={styles.submitWrap}>

              </View>
            </View>
          </View>
          {/* 동물 정보 입력사항 */}
          <View></View>
          <Pressable style={styles.submitBtn}>
            <Text style={styles.submitBtnText}>등록하기</Text>
          </Pressable>
        </View>
      )}
      keyExtractor={(item) => item.key}
      contentContainerStyle={styles.container}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    paddingBottom: 128,
    backgroundColor: '#fff',
  },
  borderLine: {
    borderWidth: 1,
    borderColor: '#E7E9ED',
    borderStyle: 'dashed',
    marginTop: 24
  },
  labelWrap: {
    paddingHorizontal: 20,
    gap: 12,
  },
  label: {
    fontSize: 12,
    color: '#8D96A4',
  },
  submitWrap: {
    flexDirection: 'row',
    gap: 8
  },
  submitBtn: {
    marginTop: 40,
    borderRadius: 4,
    backgroundColor: '#1F2329',
    paddingVertical: 16,
  },
  submitBtnText: {
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center'
  },
  input: {
    width: 150,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E7E9ED',
    borderRadius: 6,
    color: '#1F2329',
    fontSize: 14,
    // fontFamily: 'Wanted Sans',
    placeholderColor: '#8D96A4'
  },
})

export default Write
