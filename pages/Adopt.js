import React, { useEffect, useState } from 'react'
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import Select from '../component/Select'
import AdoptPet from '../component/AdoptPet';
import { ImgPath } from '../ImgPath';
import { useMenu } from '../MenuProvider'
import axios from 'axios';
import { api } from '../api/api'
import store from '../state/store'
import {BASE_URL,REACT_APP_API_KEY} from '@env'

const {width, height} = Dimensions.get('window')

// 로딩 activity indicator

const Adopt = () => {

  const [animalData, setAnimalData] = useState([]);

  const animalApi = (_animalCode) => {

    axios.get(`${BASE_URL}abandonmentPublic?serviceKey=${REACT_APP_API_KEY}&_type=json${_animalCode ? '&up_kind_cd='+_animalCode : ''}`)
    .then((res) => {
      if(animalData.length) {
        setAnimalData([...animalData, ...res.data.response.body.items.item]);
      } else {
        setAnimalData(res.data.response.body.items.item);
      }
    })
    .catch((error) => {
      alert('데이터를 불러오는데 실패했습니다.')
    })
    .finally(() => {
      // always executed
    });
  }

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

  //품종  
  const [upKindCode, setUpKindCode] = useState(417000)
  const [upKind, setUpKind] = useState([])
  
  const upKindApi = async (_animalCode) => {
    const upKind = await api.upKind(_animalCode)
    setUpKind(upKind.response?.body?.items.item.map((v) => {
      return {
        label: v.knm,
        value: v.kindCd
      }
    }))
  }

  // 품종 분류
  const [animal, setAnimal] = useState([
    { label: '강아지', value: '417000' },
    { label: '고양이', value: '422400' },
    { label: '기타', value: '429900' },
  ]);
  const [animalCode, setAnimalCode] = useState(417000)

  // 하나씩 나눠주기.
  useEffect(()=>{
    sidoApi()
  },[sidoCode])

  useEffect(()=>{
    if(!animalCode) return
    animalApi(animalCode)
    upKindApi(animalCode);
  },[animalCode])

  if(!animalData) return

  return (
    <View>
      <View style={styles.selectWrap}>
        <Select placeholder='지역' items={location} setItems={setLocation} size={136} value={sidoCode} setValue={setSidoCode} />
        {/* <View style={styles.line}></View> */}
        <View style={{flexDirection: 'row', gap: 8, marginLeft: 8}}>
          <Select placeholder='품종' items={animal} setItems={setAnimal} size={88} value={animalCode} setValue={setAnimalCode} />
          <Select placeholder='세부 종' items={upKind} setItems={setUpKind} size={92} value={upKindCode} setValue={setUpKindCode} />
        </View>
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.contents}>
          {animalData.map((item, i)=> {
            let weight = item.weight;
            let replaceWeight = weight.replace('(', ''); 
            let resultWeight = replaceWeight.replace(')', ''); 
            return (
              <AdoptPet 
                detail
                key={item.desertionNo + `${i}`}
                index={i}
                name={item.kindCd} 
                info={`${item.sexCd === 'M' ? '수컷' : item.sexCd === 'F' ? '암컷' : item.sexCd === 'Q' && '성별 미상'}, ${resultWeight}, ${item.colorCd}`} 
                tagTitle={[`${item.processState}`, item.neuterYn === 'N' ? '중성화X' : item.neuterYn === 'Y' ? '중성화O' : item.neuterYn === 'U' && '중성화미상']} 
                location={item.orgNm}
                src={item.popfile} 
                itemAnimal={item}
              />
            )
          }
          )}
          {/* 더 불러오기 */}
          {/* <Pressable onPress={()=>{
            setDataMore('50')
            console.log(dataMore);
            
            }}
          >
            <Text>More</Text>
          </Pressable> */}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  selectWrap:{
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 9999,
    width: '100%',
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingBottom: 12,
    paddingHorizontal: 20,
    position: 'fixed',
    left: 0,
    top: 0,
  },
  contents: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingBottom: 120
  },
  line: {
    width: 1,
    height: 20,
    backgroundColor: '#E7E9ED',
    marginHorizontal: 6
  },
})

export default Adopt