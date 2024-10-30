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
  // 캠페인&이벤트
  const [eventData, setEventData] = useState(undefined);

  const getImage = (imageId) => {
    switch (imageId) {
      case 0:
        return require('../assets/images/event/event_00.png');
      case 1:
        return require('../assets/images/event/event_01.jpg');
      case 2:
        return require('../assets/images/event/event_02.jpg');
      case 3:
        return require('../assets/images/event/event_03.jpeg');
      case 4:
        return require('../assets/images/event/event_04.jpg');
      case 5:
        return require('../assets/images/event/event_05.jpg');
      case 6:
        return require('../assets/images/event/event_06.png');
      case 7:
        return require('../assets/images/event/event_07.jpg');
      default:
        return require('../assets/images/event/event_default.jpg'); // 기본 이미지 설정
    }
  };
  
  useEffect(() => {
    if (props.route && props.route.params) {
      if(props.route.params.itemAnimal){
        setAnimalData(props.route.params.itemAnimal);
      } else if (props.route.params.itemNotice) {
        setNoticeData(props.route.params.itemNotice)
      } else if (props.route.params.itemEvent) {
        setEventData(props.route.params.itemEvent)
      }
    }
    
  }, [props.route.params, previousMenuActive, animalData, noticeData, eventData]);
  
  let age='', weight='', happenDate='';
  if(animalData) {
    // 나이, 무게에 () 괄호 삭제
    age = animalData.age ? animalData.age.replace('(', '').replace(')', '') : '';
    weight = animalData.weight ? animalData.weight.replace('(', '').replace(')', '') : '';
    // 날짜에 YYYY. MM. DD 포맷 추가
    happenDate = animalData.happenDt.replace(/(\d{4})(\d{2})(\d{2})/, '$1. $2. $3')
  }

  // 입양 대기 동물
  if (previousMenuActive === 'adopt' && !animalData) return null;
  // 커뮤니티: 공지사항 또는 이벤트
  if (previousMenuActive === 'community' && !noticeData && !eventData) return null;


  return (
    <ScrollView style={styles.container}>
      {/* 입양 대기 동물 */}{
        (previousMenuActive === 'home' || previousMenuActive === 'adopt') && animalData &&
        <>
          <ScrollView horizontal pagingEnabled style={styles.imgWrap}>
            <Image source={{uri: animalData.popfile}} style={{width: width, height: 300, resizeMode: 'cover'}} />
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
      {/* 공지사항 */}{
        (previousMenuActive === 'home' || previousMenuActive === 'community') && noticeData &&
        <>
        <View style={styles.nameWrap}>
          <View style={[styles.rowWrap, {gap: 8}]}>
            {noticeData.badge && <Tag bold title={'필독'} />}
            <Text style={[styles.name, {width: width - 85}]}>{noticeData.title}</Text>
          </View>
        </View>
        <View style={[styles.boxWrap, {paddingBottom: 64, backgroundColor: 'rgba(231, 233, 237, 0.4)'}]}>
          <Text style={styles.date}>
            {noticeData.date}
          </Text>
          <Text style={{lineHeight: 18}}>
            {noticeData.desc}
          </Text>
        </View>
        </>
      }
      {/* 캠페인&이벤트 */}{
        (previousMenuActive === 'home' || previousMenuActive === 'community') && eventData &&
        <>
          <ScrollView horizontal pagingEnabled style={[styles.imgWrap, {height: 400}]}>
            <Image source={getImage(eventData.id)} style={{width: width, height: '100%', resizeMode: 'cover'}} />
            {
              eventData.imgs &&
              eventData.imgs.map((item, i)=>
                item ? (
                  <Image key={i} source={{uri: eventData.imgs[i]}} style={{width: width, height: '100%', resizeMode: 'cover'}} />
                )
                :
                null
              )
            }
          </ScrollView>
          <View style={styles.nameWrap}>
            <Text style={styles.name}>{eventData.title}</Text>
          </View>
          <View style={styles.boxWrap}>
            <View style={styles.rowWrap}>
              <Text style={styles.label}>소개</Text>
              <Text style={styles.info}>{eventData.desc}</Text>
            </View>
            <View style={styles.rowWrap}>
              <Text style={styles.label}>내용</Text>
              <Text style={styles.info}>{eventData.summary}</Text>
            </View>
          </View>
          <View style={[styles.boxWrap, {paddingBottom: 64}]}>
            <View style={styles.rowWrap}>
              <Text style={styles.label}>장소</Text>
              <Text style={styles.info}>{eventData.location}</Text>
            </View>
            <View style={styles.rowWrap}>
              <Text style={styles.label}>일정</Text>
              <Text style={styles.info}>{eventData.startDate} ~ {eventData.endDate}</Text>
            </View>
            <View style={styles.rowWrap}>
              <Text style={styles.label}>시간</Text>
              <Text style={styles.info}>{eventData.time}</Text>
            </View>
            <View style={styles.rowWrap}>
              <Text style={styles.label}>참가비용</Text>
              <Text style={styles.info}>{eventData.price}</Text>
            </View>
            <View style={styles.rowWrap}>
              <Text style={styles.label}>연락처</Text>
              <Pressable 
                onPress={()=>Linking.openURL(`tel:${eventData.tel}`)}
              >
                <Text style={[styles.info, {color: '#00A8FF',textDecorationLine: 'underline'}]}>{eventData.tel}</Text>
              </Pressable>
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
  },
  date: {
    color: '#8D96A4',
    textAlign: 'right'
  },
})

export default Detail