import React, { useEffect, useState } from 'react'
import { StyleSheet, Text } from 'react-native'
import FAQItem from '../component/FAQItem'
import { ScrollView } from 'react-native'
import { collection, doc, setDoc, getDocs, getDoc, addDoc, deleteDoc } from "firebase/firestore"
import { db, storage } from '../lib/firebase';


const FAQ = () => {

  const [faqData, setFaqData] = useState([]);

  const crud = {
    get: async ()=>{
      const querySnapshot = await getDocs(collection(db,'faq'));
      let dataArr = [];
      querySnapshot.forEach((doc) => {
        dataArr.push( {id:doc.id, ...doc.data()} );
      });
      setFaqData(dataArr);
    },
  }

  useEffect(()=>{
    crud.get();
  },[])

  return (
    <ScrollView style={styles.container}>
      {
        faqData.map((item)=> {
          return(
            <FAQItem 
              key={item.id} 
              index={item.id}
              question={item.question} 
              answer={item.answer}
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