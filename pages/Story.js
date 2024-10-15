import React from 'react'
import { View } from 'react-native'
import { StyleSheet, Text, ScrollView } from 'react-native'
import Tab from '../component/Tab'
import StoryItem from '../component/StoryItem'
import { ImgPath } from '../ImgPath'

const Story = () => {
  return (
    <View>
      <Tab top title={['입양후기', '임보일기', '입양일기']} />
      <ScrollView style={styles.container}>
        <View style={styles.contents}>
        {new Array(6).fill().map((item, i)=> 
          <StoryItem
            key={i}
            index={i}
            src={ImgPath.animal_story}
            title={`${i}콩고물 묻은 아기 강아지 우우우우 너무귀여워`}
            name='포크엄마ddddddddddddddddddddd'
            profileSrc={ImgPath.profile_sample}
            view='1212'
            date='2024. 10. 10'
            heartNum='12'
            commentNum='8'
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
    // gap: '24px 10px'
  },

})

export default Story