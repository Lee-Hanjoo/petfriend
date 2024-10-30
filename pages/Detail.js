import React, { useEffect, useState } from 'react'
import { Dimensions, Image, Linking, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useMenu } from '../MenuProvider';
import { ScrollView } from 'react-native';
import { ImgPath } from '../ImgPath';
import Tag from '../component/Tag';
import Heart from '../component/Heart';
import CommentItem from '../component/CommentItem';

const {width, height} = Dimensions.get('window')

const Detail = (props) => {
  
  const navigation = useNavigation();
  const { previousMenuActive } = useMenu();
  // 입양 대기 동물
  const [animalData, setAnimalData] = useState(undefined);
  // 공지사항
  const [noticeData, setNoticeData] = useState(undefined);
  
  useEffect(() => {
    if (props.route && props.route.params) {
      if(props.route.params.itemAnimal){
        setAnimalData(props.route.params.itemAnimal);
      } else if (props.route.params.itemNotice) {
        setNoticeData(props.route.params.itemNotice)
      }
      console.log(noticeData);
    }

    console.log(previousMenuActive);
    
  }, [props.route.params]);

  if (!animalData) return;

  // 나이, 무게에 () 괄호 삭제
  let age = animalData.age ? animalData.age.replace('(', '').replace(')', '') : '';
  let weight = animalData.weight ? animalData.weight.replace('(', '').replace(')', '') : '';

  // 날짜에 YYYY. MM. DD 포맷 추가
  let happenDate = animalData.happenDt.replace(/(\d{4})(\d{2})(\d{2})/, '$1. $2. $3')

  return (
    <ScrollView style={styles.container}>
      {
        (previousMenuActive === 'home' || previousMenuActive === 'adopt') && animalData &&
        <>
          <ScrollView horizontal pagingEnabled style={styles.imgWrap}>
            <Image source={{uri: animalData.popfile}} style={{width: width, height: 300, objectFit: 'cover'}} />
          </ScrollView>
          <View style={styles.nameWrap}>
            <View style={[styles.rowWrap, {gap: 8}]}>
              <Tag title={animalData.processState} />
              <Text style={styles.name}>{animalData.kindCd}</Text>
            </View>
            <Heart border />
          </View>
          <View style={styles.boxWrap}>
            <View style={styles.rowWrap}>
              <Text style={styles.label}>성별</Text>
              <Text style={styles.info}>{animalData.sexCd === 'M' ? '수컷' : animalData.sexCd === 'F' ? '암컷' : animalData.sexCd === 'Q' && '성별 미상'} ({animalData.neuterYn === 'N' ? '중성화X' : animalData.neuterYn === 'Y' ? '중성화O' : animalData.neuterYn === 'U' && '중성화미상'})</Text>
            </View>
            <View style={styles.rowWrap}>
              <Text style={styles.label}>나이</Text>
              <Text style={styles.info}>{age}</Text>
            </View>
            <View style={styles.rowWrap}>
              <Text style={styles.label}>몸무게</Text>
              <Text style={styles.info}>{weight}</Text>
            </View>
            <View style={styles.rowWrap}>
              <Text style={styles.label}>털 색상</Text>
              <Text style={styles.info}>{animalData.colorCd}</Text>
            </View>
            <View style={styles.rowWrap}>
              <Text style={styles.label}>특이사항</Text>
              <Text style={styles.info}>{animalData.specialMark}</Text>
            </View>
          </View>
          <View style={styles.boxWrap}>
            <View style={styles.rowWrap}>
              <Text style={styles.label}>실종일</Text>
              <Text style={styles.info}>{happenDate}</Text>
            </View>
            <View style={styles.rowWrap}>
              <Text style={styles.label}>장소</Text>
              <Text style={styles.info}>{animalData.careNm}</Text>
            </View>
            <View style={styles.rowWrap}>
              <Text style={styles.label}>연락처</Text>
              <Pressable 
                onPress={()=>Linking.openURL(`tel:${animalData.careTel}`)}
              >
                <Text style={[styles.info, {color: '#00A8FF',textDecorationLine: 'underline'}]}>{animalData.careTel}</Text>
              </Pressable>
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
        </>
      }
      {/* {"badge": true, "date": "2024. 06. 17", "desc": "내용", "id": 0, "title": "공지사항입니다"} */}
      {
        (previousMenuActive === 'home' || previousMenuActive === 'community') && noticeData &&
        <>
          <View style={styles.nameWrap}>
            <View style={[styles.rowWrap, {gap: 8}]}>
              <Text style={styles.name}>hddpreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivepreviousMenuActivei</Text>
            </View>
          </View>
        </>
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imgWrap: {
    width: 'fit-content',
    height: 300,
    backgroundColor: '#E7E9ED',
    flexDirection: 'row',
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