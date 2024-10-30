import React, { useState } from 'react'
import { StyleSheet, Text } from 'react-native'
import FAQItem from '../component/FAQItem'
import { ScrollView } from 'react-native'
import faqDataBase from '../dataBase/faqData.json'

const FAQ = () => {

  const [faqData, setfaqData] = useState(faqDataBase)

  return (
    <ScrollView style={styles.container}>
      {
        faqData.items.map((item)=> {
          return(
            <FAQItem 
              key={item.id} 
              index={item.id}
              question={item.question} 
              answer={item.answer}
              item={item}
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