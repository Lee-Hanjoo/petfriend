import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import Select from '../component/Select'
import AdoptPet from '../component/AdoptPet';
import { ImgPath } from '../ImgPath';
import { useMenu } from '../MenuProvider'

const Adopt = () => {

  const { 
    location, setLocation,
    animal, setAnimal,
    breed, setBreed,
  } = useMenu();

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
          {new Array(6).fill().map((item, i)=> 
            <AdoptPet 
              detail
              key={i}
              index={i}
              name={`${i}포메라니안`} 
              info='암컷, 6개월' 
              tagTitle={['보호중','중성화O']} 
              location='충청남도 공주시'
              src={ImgPath.animal_adpot} 
            />
          )}
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