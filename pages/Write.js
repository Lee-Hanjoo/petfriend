import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, Pressable, TextInput, View, Button, Platform, Image } from 'react-native'
import { StyleSheet, Text } from 'react-native'
import Select from '../component/Select'
import { useMenu } from '../MenuProvider'
import { RadioGroup } from 'react-native-radio-buttons-group'
import * as ImagePicker from 'expo-image-picker';
import { ImgPath } from '../ImgPath'

const {width, height} = Dimensions.get('window')

const Write = () => {

  const { 
    // select
    location, setLocation,
    city, setCity,
    board, setBoard, 
    animal, setAnimal,
    breed, setBreed,
    storyCategory, setStoryCategory, 
    missingCategory, setMissingCategory,
    // radio
    gender, age, neutering
  } = useMenu();

const [selectedId, setSelectedId] = useState();

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

  return (
    <FlatList
      data={[{ key: 'content' }]} // 리스트 데이터를 단일 객체로 설정
      renderItem={() => (
        <View style={styles.contents}>
          {/* 게시판 카테고리 설정 */}
          <View style={{zIndex:2}}>
            <View style={styles.labelWrap}>
              <Text style={styles.label}>게시판</Text>
              <View style={styles.submitWrap}>
                <Select placeholder='게시판' items={board} setItems={setBoard} size={140} />
                <Select placeholder='분류' items={storyCategory} setItems={setStoryCategory} size={100} />
                <Select placeholder='분류' items={missingCategory} setItems={setMissingCategory} size={80} />
              </View>
            </View>
          </View>
          <View style={[styles.borderLine, {zIndex:1}]}></View>
          {/* 날짜, 위치 입력사항 */}
          <View style={[styles.boxGap, {zIndex:1}]}>
            <View style={styles.labelWrap}>
              <Text style={styles.label}>날짜<Text style={styles.essential}>*</Text></Text>
              <TextInput style={styles.input} placeholder='0000. 00. 00' placeholderTextColor='#8D96A4' />
            </View>
            <View style={[styles.labelWrap, {zIndex: 2}]}>
              <Text style={styles.label}>지역<Text style={styles.essential}>*</Text></Text>
              <View style={styles.submitWrap}>
                <Select placeholder='지역' items={location} setItems={setLocation} size={140} />
                <Select placeholder='도시' items={city} setItems={setCity} size={100} />
              </View>
            </View>
            <View style={[styles.labelWrap, {zIndex: 1}]}>
              <Text style={styles.label}>장소</Text>
              <TextInput style={styles.input} placeholder='구체적인 장소' placeholderTextColor='#8D96A4' />
            </View>
            <View style={[styles.labelWrap, {zIndex: 1}]}>
              <Text style={styles.label}>연락처</Text>
              <TextInput style={styles.input} placeholder='010-0000-0000' placeholderTextColor='#8D96A4' />
            </View>
          </View>
          <View style={styles.borderLine}></View>
          {/* 스토리 입력사항 */}          
          <View style={[styles.boxGap, {zIndex: 2}]}>
            <View style={[styles.labelWrap, {zIndex: 2}]}>
              <Text style={styles.label}>품종<Text style={styles.essential}>*</Text></Text>
              <View style={styles.submitWrap}>
                <Select placeholder='품종' items={animal} setItems={setAnimal} size={100} />
                <Select placeholder='세부 종' items={breed} setItems={setBreed} size={140} />
              </View> 
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={[styles.labelWrap, {zIndex: 1, paddingRight: 2}]}>
                <Text style={styles.label}>성별<Text style={styles.essential}>*</Text></Text>
                <View style={styles.submitWrap}>
                  <RadioGroup
                    radioButtons={gender} 
                    onPress={setSelectedId}
                    selectedId={selectedId}
                    layout='row'
                  />
                </View>
              </View>
              <View style={[styles.labelWrap, {zIndex: 1}]}>
                <Text style={[styles.label, {marginTop:1}]}>털 색상</Text>
                <View style={styles.submitWrap}>
                  <TextInput style={[styles.input, {width: 113}]} placeholder='색상' placeholderTextColor='#8D96A4' />
                </View>
              </View>
            </View>
            <View style={[styles.labelWrap, {zIndex: 1}]}>
              <Text style={styles.label}>나이<Text style={styles.essential}>*</Text></Text>
              <View style={styles.submitWrap}>
                <RadioGroup
                  radioButtons={age} 
                  onPress={setSelectedId}
                  selectedId={selectedId}
                  layout='row'
                />
              </View>
            </View>
            <View style={styles.labelWrap}>
              <Text style={styles.label}>중성화<Text style={styles.essential}>*</Text></Text>
              <View style={styles.submitWrap}>
                <RadioGroup
                  radioButtons={neutering} 
                  onPress={setSelectedId}
                  selectedId={selectedId}
                  layout='row'
                />
              </View>
            </View>
            <View style={styles.labelWrap}>
              <Text style={styles.label}>특이사항</Text>
              <View style={styles.submitWrap}>
                <TextInput style={[styles.input, {width: width - 40}]} placeholder='특이사항을 입력해주세요.' placeholderTextColor='#8D96A4' />
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
          {/* 등록하기 */}
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
