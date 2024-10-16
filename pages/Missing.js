import React from 'react'
import { Dimensions, View } from 'react-native'
import { StyleSheet, Text, ScrollView } from 'react-native'
import Tab from '../component/Tab'
import { ImgPath } from '../ImgPath'
import MissingPet from '../component/MissingPet'

const {width, height} = Dimensions.get('window')

const Missing = () => {
  return (
    <View>
      <Tab top filter title={['전체', '실종', '목격', '완료']} />
      <ScrollView style={styles.container}>
        <View style={styles.contents}>
        {new Array(6).fill().map((item, i)=> 
          <MissingPet
            key={i}
            index={i}
            tagTitle='실종'
            location='상봉역 인근'
            src={ImgPath.animal_missing} 
            name={`${i}믹스견`}
            date='2024. 09. 26'
            info='암컷, 5개월, 흰색 갈색, 중성화X...'
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
    paddingBottom: 128,
    backgroundColor: '#fff',
  },
  contents: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10
  },
})

export default Missing