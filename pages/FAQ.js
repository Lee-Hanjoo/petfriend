import React from 'react'
import { StyleSheet, Text } from 'react-native'
import FAQItem from '../component/FAQItem'
import { ScrollView } from 'react-native'

const FAQ = () => {
  return (
    <ScrollView style={styles.container}>
      <FAQItem key={0} index={0} 
        question='무료분양을 받기위한 절차는 어떻게 되나요?' 
        answer='펫프렌드에서는 직접 무료분양을 하지않고 회원간의 직접분양으로 무료분양이 이루어집니다.\n\n무료분양글을 확인하신 후, 분양회원에게 직접 연락하셔서 분양하시는분과 분양상담 및 협의하신 뒤 분양이 가능합니다.\n\n☆ 무료분양의 절차는 아래와 같습니다 ☆\n1. 무료분양 해주시는 회원에게 연락하여 약속을 잡는다.\n2. 만나서 반려동물의 특징과 주의사항에 대한 설명을 듣고 인계받는다. 이 때, 무료분양 계약서를 쓰는 것이 서로에게 좋습니다.\n\n☆ 참고사항 ☆\n- 무료분양은 수요가 많아 글이 올라온 후 3일정도면 분양이 완료되는 경우가 많으므로, 경쟁력있는 귀여운 반려동물을 분양받으시려면 자주 접속하셔서 확인하고, 최신글을 올린 분양인에게 빠르게 연락하고 약속을 잡는것이 좋습니다.\n- 무료분양글은 회원이 직접 글을 올리고 관리하므로 분양이 완료된 후, 분양은 되었으나 분양완료처리를 안한 경우도 있으니 참고하시기 바랍니다.'
      /> 
      <FAQItem key={1} index={1} last
        question='무료분양 책임비란 무엇인가요?' 
        answer='책임비는 분양인이 입양인에게 책임있게 키워달라는 의미로 받는 금액입니다.\n\n무료로 분양하게 될 경우 부담없이 인계받아 생명을 가볍게 여기는 심리가 발생할 수도 있기때문에 책정하는 성의표시 금액으로 완전 무료부터 만원단위로 최대 5만원까지 책정할 수 있습니다. 그러나 무료분양 책임비를 5만원 초과로 책정할 경우, 유료분양글로 판단하여 글삭제 및 이용정지될 수 있으니 주의하셔야합니다.\n\n상업적인 유료분양글은 따로 유료분양 코너에서 등록하셔야만 합니다.'
      /> 
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