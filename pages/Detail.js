import React from 'react'
import { Dimensions, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useMenu } from '../MenuProvider';
import { ScrollView } from 'react-native';
import { ImgPath } from '../ImgPath';
import Tag from '../component/Tag';
import Heart from '../component/Heart';
import CommentItem from '../component/CommentItem';

const {width, height} = Dimensions.get('window')

const Detail = () => {

  const navigation = useNavigation();
  const { detailActive } = useMenu(); 

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imgWrap}>
        <Image source={ImgPath.detail_sample} />
      </View>
      <View style={styles.nameWrap}>
        <View style={[styles.rowWrap, {gap: 8}]}>
          <Tag title='보호중' />
          <Text style={styles.name}>포메라니안</Text>
        </View>
        <Heart border />
      </View>
      <View style={styles.boxWrap}>
        <View style={styles.rowWrap}>
          <Text style={styles.label}>성별</Text>
          <Text style={styles.info}>수컷 (중성화 O)</Text>
        </View>
        <View style={styles.rowWrap}>
          <Text style={styles.label}>나이</Text>
          <Text style={styles.info}>6개월</Text>
        </View>
        <View style={styles.rowWrap}>
          <Text style={styles.label}>몸무게</Text>
          <Text style={styles.info}>1.4Kg</Text>
        </View>
        <View style={styles.rowWrap}>
          <Text style={styles.label}>털 색상</Text>
          <Text style={styles.info}>흰색, 회색</Text>
        </View>
        <View style={styles.rowWrap}>
          <Text style={styles.label}>특이사항</Text>
          <Text style={styles.info}>다리 밑에서 주웠구요 목걸이같은건 없었어요.. 그리고 되게 귀엽게 생겼고, 발바닥이 분홍색이에요.</Text>
        </View>
      </View>
      <View style={styles.boxWrap}>
        <View style={styles.rowWrap}>
          <Text style={styles.label}>실종일</Text>
          <Text style={styles.info}>2024. 10. 07</Text>
        </View>
        <View style={styles.rowWrap}>
          <Text style={styles.label}>실종장소</Text>
          <Text style={styles.info}>충청남도 공주시</Text>
        </View>
        <View style={styles.rowWrap}>
          <Text style={styles.label}>연락처</Text>
          <Text style={[styles.info, {color: '#00A8FF',textDecorationLine: 'underline'}]}>010-1234-1234</Text>
        </View>
      </View>
      <View style={styles.commentWrap}>
        <View style={[styles.rowWrap, {gap: 8}]}>
          <TextInput style={styles.input} placeholder='댓글을 등록해주세요.'/>
          <Pressable style={styles.commentBtn}><Text style={styles.commentBtnText}>등록</Text></Pressable>
        </View>
        <View>
          <CommentItem />
          <CommentItem />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imgWrap: {
    width: width,
    height: 300,
    backgroundColor: '#E7E9ED'
  },
  nameWrap: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#E7E9ED',
  },
  boxWrap: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#E7E9ED',
    gap: 12
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
  },
  rowWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  label: {
    width: 80,
    color: '#8D96A4',
    marginBottom: 'auto',
    lineHeight: 17
  },
  info: {
    width: width - 132,
    color: '#1F2329',
  },
  commentWrap:{
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 60
  },
  input: {
    width: width - 105,
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
  commentBtn: {
    backgroundColor: '#1F2329',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  commentBtnText: {
    color: '#fff',
    fontWeight: '700',
    lineHeight: 18
  }
})

export default Detail