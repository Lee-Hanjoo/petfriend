import React, { useEffect, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import Select from '../component/Select'
import AdoptPet from '../component/AdoptPet';
import { ImgPath } from '../ImgPath';
import { useMenu } from '../MenuProvider'
import axios from 'axios';
import { api } from '../api/api'
import store from '../state/store'

const Adopt = () => {

  const { 
    location, setLocation,
    animal, setAnimal,
    breed, setBreed,
  } = useMenu();

  const [apiType, setApiType] = useState('abandonmentPublic')
  // 시도코드
  const [uprCd, setUprCd] = useState('upr_cd=6110000')
  // 시군구코드
  const [orgCd, setOrgCd] = useState('org_cd=3220000')
  // 축종코드 (개 : 417000, 고양이 : 422400, 기타 : 429900))
  const [upKindCd, setUpKindCd] = useState('up_kind_cd=417000')
  // 품종코드 
  const [kindCd, setKindCd] = useState('kind_cd=000054')
  // 이미지
  const [popfile, setPopfile] = useState('kind_cd=000054')


  const [abandonmentPublicData, setAbandonmentPublicData] = useState([]);
  const [dataMore, setDataMore] = useState('30');

  useEffect(()=>{
    const url = 'http://apis.data.go.kr/1543061/abandonmentPublicSrvc/'
    const key = `PNTnhM9wrxsZHo8d6ib69yUDWPKWGaTFlsey6wJEWn%2BNRugZHuKG3TliH4YsI2yhJGl0A4QUtryHa6WyDFWDzw%3D%3D&_type=json&numOfRows=${dataMore}`

    axios.get(`${url}${apiType}?serviceKey=${key}`)

    .then(function (res) {
      setAbandonmentPublicData(res.data.response.body.items.item);
    })
    .catch(function (error) {
      alert('데이터를 불러오는데 실패했습니다.')
    })
    .finally(function () {
      // always executed
    });
  },[])

  return (
    <View>
      <View style={styles.selectWrap}>
        <Select placeholder='지역' items={location} setItems={setLocation} size={104} />
        <View style={styles.line}></View>
        <Select placeholder='동물' items={animal} setItems={setAnimal} size={84} marginRight={8}/>
        <Select placeholder='품종' items={breed} setItems={setBreed} size={124} />
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.contents}>
          {abandonmentPublicData.map((item, i)=> 
            <AdoptPet 
              detail
              key={item.desertionNo}
              index={i}
              name={item.kindCd} 
              info={`${item.sexCd === 'M' ? '수컷' : item.sexCd === 'F' ? '암컷' : item.sexCd === 'Q' && '성별 미상'}, ${item.weight}, ${item.colorCd}`} 
              tagTitle={[`${item.processState}`, item.neuterYn === 'N' ? '중성화X' : item.neuterYn === 'Y' ? '중성화O' : item.neuterYn === 'U' && '중성화미상']} 
              location={item.orgNm}
              src={item.popfile} 
            />
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