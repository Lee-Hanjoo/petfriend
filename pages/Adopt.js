import React, { useEffect, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import Select from '../component/Select'
import AdoptPet from '../component/AdoptPet';
import { ImgPath } from '../ImgPath';
import { useMenu } from '../MenuProvider'
import axios from 'axios';
import { api } from '../api/api'
import store from '../state/store'
import {BASE_URL,REACT_APP_API_KEY} from '@env'

const Adopt = () => {

  const { 
    location, setLocation,
    animal, setAnimal,
    breed, setBreed,
  } = useMenu();

  const [animalData, setAnimalData] = useState([]);

  useEffect(()=>{
    animalApi()
  },[])

  const animalApi = () => {

    axios.get(`${BASE_URL}abandonmentPublic?serviceKey=${REACT_APP_API_KEY}&_type=json`)

    .then(function (res) {
      if(animalData.length) {
        setAnimalData([...animalData, ...res.data.response.body.items.item]);
      } else {
        setAnimalData(res.data.response.body.items.item);
      }
    })
    .catch(function (error) {
      alert('데이터를 불러오는데 실패했습니다.')
    })
    .finally(function () {
      // always executed
    });
  }

  if(!animalData) return

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