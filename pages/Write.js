import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, Pressable, TextInput, View, Button, Platform, Image } from 'react-native'
import { StyleSheet, Text } from 'react-native'
import Select from '../component/Select'
import { useMenu } from '../MenuProvider'
import { RadioGroup } from 'react-native-radio-buttons-group'
import * as ImagePicker from 'expo-image-picker';
import { ImgPath } from '../ImgPath'
import { useIsFocused } from '@react-navigation/native'
import { api } from '../api/api'

const {width, height} = Dimensions.get('window')

const Write = () => {

  const { 
    // radio
    gender, age, neutering
  } = useMenu();

  // 이 페이지를 진입했을 때.
  const isFocused = useIsFocused()

  //radio
  const [genderId, setGenderId] = useState('gender_default');
  const [ageId, setAgeId] = useState('age_default');
  const [neuteringId, setNeuteringId] = useState('neutering_default');

  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const libraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (libraryStatus.status !== 'granted') {
          alert('카메라 롤 권한이 필요합니다.');
        }

        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
        if (cameraStatus.status !== 'granted') {
          alert('카메라 권한이 필요합니다.');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    } 

  };

  // 게시판 분류
  const [board, setBoard] = useState([
    {id:0, label:'스토리', value:'story'},
    {id:1, label:'실종 동물 찾기', value:'missing'}
  ])
  const [boardCode, setBoardCode] = useState('default')

  // 스토리 분류
  const [story, setStory] = useState([
    { label: '입양후기', value: 'adoptReview' },
    { label: '임보일기', value: 'protection' },
    { label: '입양일기', value: 'adoptDiary' },
  ]);
  const [storyCode, setStoryCode] = useState('default')

  // 실종 동물 찾기 분류
  const [missing, setMissing] = useState([
    { label: '실종', value: 'lost' },
    { label: '목격', value: 'look' },
  ]);
  const [missingCode, setMissingCode] = useState('default')

  // 품종 분류
  const [animal, setAnimal] = useState([
    { label: '강아지', value: '417000' },
    { label: '고양이', value: '422400' },
    { label: '기타', value: '429900' },
  ]);
  const [animalCode, setAnimalCode] = useState('default')

  //시도
  const [sidoCode, setSidoCode] = useState(6110000)
  const [location, setLocation] = useState([])
  
  const sidoApi = async () => {
    const sido = await api.sido()
    setLocation(sido.response.body.items.item.map((v) => {
      return {
        label: v.orgdownNm,
        value: v.orgCd
      }
    }))
  }
  
  //시군구
  const [sigunguCode, setSigunguCode] = useState(3220000)
  const [city, setCity] = useState([])
  
  const sigunguApi = async () => {
    const sigungu = await api.sigungu(sidoCode)
    setCity(sigungu.response.body.items.item.map((v) => {
      return {
        label: v.orgdownNm,
        value: v.orgCd
      }
    }))
  }
  
  //품종  
  const [upKindCode, setUpKindCode] = useState(417000)
  const [upKind, setUpKind] = useState([])
  
  const upKindApi = async () => {
    const upKind = await api.upKind(animalCode)
    setUpKind(upKind.response.body.items.item.map((v) => {
      return {
        label: v.knm,
        value: v.kindCd
      }
    }))
  }

  useEffect(() => {
    // 포커스가 false일때 (페이지를 벗어났을 때) 스크롤탑 0
    if(!isFocused) return 
    sidoApi();
    sigunguApi();
    upKindApi();
  }, [isFocused, sidoCode, sigunguCode, upKindCode]) 

  return (
    <FlatList
      keyExtractor={(item) => item.key}
      contentContainerStyle={styles.container}
      data={[{ key: 'content' }]}
      renderItem={() => (
        <View style={styles.contents}>
          {/* 게시판 카테고리 설정 */}
          <View style={{zIndex:2}}>
            <View style={styles.labelWrap}>
              <Text style={styles.label}>게시판</Text>
              <View style={styles.submitWrap}>
                <Select placeholder='게시판' items={board} setItems={setBoard} size={140} value={boardCode} setValue={setBoardCode} />
                {
                  boardCode === 'story' &&
                  <Select placeholder='분류' items={story} setItems={setStory} size={100} value={storyCode} setValue={setStoryCode} />
                }
                {
                  boardCode === 'missing' &&
                  <Select placeholder='분류' items={missing} setItems={setMissing} size={80} value={missingCode} setValue={setMissingCode} />
                }
              </View>
            </View>
          </View>
          <View style={[styles.borderLine, {zIndex:1}]}></View>
          {boardCode === 'missing' &&
            <>
              {/* 날짜, 위치 입력사항 */}
              <View style={[styles.boxGap, {zIndex:1}]}>
                <View style={styles.labelWrap}>
                  <Text style={styles.label}>날짜<Text style={styles.essential}>*</Text></Text>
                  <TextInput style={styles.input} placeholder='0000. 00. 00' />
                </View>
                <View style={[styles.labelWrap, {zIndex: 2}]}>
                  <Text style={styles.label}>지역<Text style={styles.essential}>*</Text></Text>
                  <View style={styles.submitWrap}>
                    <Select placeholder='지역' items={location} setItems={setLocation} size={164} value={sidoCode} setValue={setSidoCode} />
                    <Select placeholder='도시' items={city} setItems={setCity} size={163} value={sigunguCode} setValue={setSigunguCode} />
                  </View>
                </View>
                <View style={[styles.labelWrap, {zIndex: 1}]}>
                  <Text style={styles.label}>장소</Text>
                  <TextInput style={styles.input} placeholder='구체적인 장소' />
                </View>
                <View style={[styles.labelWrap, {zIndex: 1}]}>
                  <Text style={styles.label}>연락처</Text>
                  <TextInput style={styles.input} placeholder='010-0000-0000' />
                </View>
              </View>
              <View style={styles.borderLine}></View>
              {/* 스토리 입력사항 */}          
              <View style={[styles.boxGap, {zIndex: 2}]}>
                <View style={[styles.labelWrap, {zIndex: 2}]}>
                  <Text style={styles.label}>품종<Text style={styles.essential}>*</Text></Text>
                  <View style={styles.submitWrap}>
                    <Select placeholder='품종' items={animal} setItems={setAnimal} size={164} value={animalCode} setValue={setAnimalCode} />
                    <Select placeholder='세부 종' items={upKind} setItems={setUpKind} size={163} value={upKindCode} setValue={setUpKindCode} />
                  </View> 
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={[styles.labelWrap, {zIndex: 1, paddingRight: 2}]}>
                    <Text style={styles.label}>성별<Text style={styles.essential}>*</Text></Text>
                    <View style={styles.submitWrap}>
                      <RadioGroup
                        radioButtons={gender} 
                        onPress={setGenderId}
                        selectedId={genderId}
                        layout='row'
                      />
                    </View>
                  </View>
                  <View style={[styles.labelWrap, {zIndex: 1}]}>
                    <Text style={[styles.label, {marginTop:1}]}>털 색상</Text>
                    <View style={styles.submitWrap}>
                      <TextInput style={[styles.input, {width: 113}]} placeholder='색상'/>
                    </View>
                  </View>
                </View>
                <View style={[styles.labelWrap, {zIndex: 1}]}>
                  <Text style={styles.label}>나이<Text style={styles.essential}>*</Text></Text>
                  <View style={styles.submitWrap}>
                    <RadioGroup
                      radioButtons={age} 
                      onPress={setAgeId}
                      selectedId={ageId}
                      layout='row'
                    />
                  </View>
                </View>
                <View style={styles.labelWrap}>
                  <Text style={styles.label}>중성화<Text style={styles.essential}>*</Text></Text>
                  <View style={styles.submitWrap}>
                    <RadioGroup
                      radioButtons={neutering} 
                      onPress={setNeuteringId}
                      selectedId={neuteringId}
                      layout='row'
                    />
                  </View>
                </View>
                <View style={styles.labelWrap}>
                  <Text style={styles.label}>특이사항</Text>
                  <View style={styles.submitWrap}>
                    <TextInput style={[styles.input, {width: width - 40}]} placeholder='특이사항을 입력해주세요.' />
                  </View>
                </View>
                <View style={styles.labelWrap}>
                  <Text style={styles.label}>사진</Text>
                  <View style={[styles.submitWrap, {gap: 7}]}>
                    <Image style={styles.uploadImg} source={ImgPath.img_upload_sample} />
                    <Image style={styles.uploadImg} source={ImgPath.img_upload_sample} />
                    {image && <Image style={styles.uploadImg} source={ImgPath.img_upload_sample} />}
                    <Pressable style={styles.uploadImgBtn} onPress={pickImage}>
                      <Image source={ImgPath.upload_img} />
                    </Pressable>
                  </View>
                  <Text style={styles.alert}>※ 얼굴이 잘 보이는 사진을 등록해주세요.</Text>
                </View>
              </View>
              {/* 동물 정보 입력사항 */}
              <View></View>
            </>
          }
          {/* 등록하기 */}
          <Pressable style={styles.submitBtn}>
            <Text style={styles.submitBtnText}>등록하기</Text>
          </Pressable>
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    paddingBottom: 60,
    backgroundColor: '#fff',
  },
  borderLine: {
    borderWidth: 1,
    borderColor: '#E7E9ED',
    borderStyle: 'dashed',
    marginTop: 24
  },
  boxGap: {
    marginTop: 24,
    gap: 24
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
  uploadImgBtn: {
    width: 107,
    height: 107,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E7E9ED',
    justifyContent: 'center',
    alignItems: 'center'
  },
  uploadImg: {
    width: 107,
    height: 107,
    borderRadius: 6,
  },
  submitBtn: {
    width: width - 40,
    marginTop: 40,
    marginHorizontal: 'auto',
    borderRadius: 4,
    backgroundColor: '#1F2329',
    paddingVertical: 16,
  },
  submitBtnText: {
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center'
  },
  alert: {
    fontSize: 12,
    color: '#8D96A4',
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
  essential: {
    fontSize: 14,
    color: '#EE815E',
  },
})

export default Write
