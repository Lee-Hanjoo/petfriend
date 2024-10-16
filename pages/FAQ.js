import React from 'react'
import { StyleSheet, Text } from 'react-native'
import FAQItem from '../component/FAQItem'
import { ScrollView } from 'react-native'

const FAQ = () => {
  return (
    <ScrollView style={styles.container}>
      {
        new Array(6).fill().map((item, i, filteredItems)=> {
          const isLastItem = i === filteredItems.length - 1;
          return (
            <FAQItem key={i} index={i} 
              question='미성년자도 입양이 가능한가요?미성년자도 입양이 가능한가요?미성년자도 입양이 가능한가요?미성년자도 입양이 가능한가요?미성년자도 입양이 가능한가요?미성년자도 입양이 가능한가요?' 
              answer='보호소에서 전화를 안받을 때는 관할 시군구청 유기동물담당부서로 전화하세요.
보호소마다 차이는 있겠지만, 앱에 나와있는 보호소 전화번호로 전화를 해보면 통화 연결이 쉽지 않거나, 간혹 연결이 되더라도 친절하게 설명받지 못하는 경우도 있으실 겁니다. 많은 보호소들이 아직 한두명의 직원들에 의해 운영이 되다보니 불가피합니다. 
하지만 분명히 개선되어야 할 부분입니다.
이렇게 보호소에서 전화를 안받을때는 관할 시군구청으로 전화를 걸어서 유기동물 담당부서를 안내받으시면 좀 더 친절고 정확한 안내를 받으실 수 있습니다.'
              last={isLastItem}
            /> 
          )
      })
    }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    paddingBottom: 128,
    backgroundColor: '#fff',
  }
})

export default FAQ