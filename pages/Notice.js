import React, { useEffect, useState } from 'react'
import { StyleSheet, Text } from 'react-native'
import NoticeItem from '../component/NoticeItem'
import { ScrollView } from 'react-native'
import { collection, doc, setDoc, getDocs, getDoc, addDoc, deleteDoc } from "firebase/firestore"
import { db, storage } from '../lib/firebase';

const Notice = () => {

  const [noticeData, setNoticeData] = useState([]);

  const crud = {
    get: async ()=>{
      const querySnapshot = await getDocs(collection(db,'notice'));
      let dataArr = [];
      querySnapshot.forEach((doc) => {
        dataArr.push( {id:doc.id, ...doc.data()} );
      });
      setNoticeData(dataArr);
    },
  }

  useEffect(()=>{
    crud.get();
  },[])

  return (
    <ScrollView style={styles.container}>
      {
        noticeData.map((item)=> {
          return (
            <NoticeItem 
              key={item.id} 
              index={item.id}
              badge={item.badge}
              title={item.title} 
              date={item.date} 
              itemNotice={item}
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

export default Notice