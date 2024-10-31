import React, { useEffect, useState } from 'react'
import { Dimensions, Image, View } from 'react-native'
import { StyleSheet, Text, ScrollView } from 'react-native'
import Tab from '../component/Tab'
import { ImgPath } from '../ImgPath'
import CommunityCard from '../component/CommunityCard'
import FilterPopup from '../component/FilterPopup'
import Notice from '../pages/Notice'
import FAQ from '../pages/FAQ'
import { api } from '../api/api';
import { collection, doc, setDoc, getDocs, getDoc, addDoc, deleteDoc } from "firebase/firestore"
import { db, storage } from '../lib/firebase';

const {width, height} = Dimensions.get('window')

const Community = () => {

  const [filterPopup, setFilterPopup] = useState(false)

  const [tabIndex, setTabIndex] = useState(0)

  // 캠페인&이벤트
  const [eventData, setEventData] = useState([]);

  const crud = {
    get: async ()=>{
      const querySnapshot = await getDocs(collection(db,'event'));
      let dataArr = [];
      querySnapshot.forEach((doc) => {
        dataArr.push( {id:doc.id, ...doc.data()} );
      });
      setEventData(dataArr);
    },
  }

  // 뉴스
  const [newsData, setNewsData] = useState([])
  const newsApi = async () => {
    const news = await api.news()
    setNewsData(news.data.map((v) => {
      return {
        id: v.id,
        title: v.title,
        publisher: v.publisher,
        date: v.published_at,
        summary: v.summary,
        img: v.image_url,
        link: v.content_url,
        author: v.author
      }
    }))
  }
  
  useEffect(()=>{
    newsApi();
    crud.get();
  },[])
  

  return (
    <View>
      <Tab faq top filter title={['뉴스', '캠페인&이벤트', '공지사항', 'FAQ']} filterPopup={filterPopup} setFilterPopup={setFilterPopup} tabIndex={tabIndex} setTabIndex={setTabIndex} />
      <FilterPopup filterPopup={filterPopup} setFilterPopup={setFilterPopup} tabIndex={tabIndex} />
      <ScrollView style={styles.container}>
        <View style={styles.contents}>
        {/* 1.뉴스 */}
        {tabIndex === 0 &&
          newsData.map((item, index)=> {
            let date = item.date
            let formmatDate = date.slice(0, 10)
            return(
              <CommunityCard
                detail
                key={item.id}
                src={item.img}
                title={item.title}
                desc={item.summary}
                location={`${item.publisher} ${item.author && '('+item.author+')'}`}
                date={formmatDate}
                link={item.link}
              />
            )}
        )}
        {/* 2. 캠페인&이벤트 */}
        {tabIndex === 1 &&
          eventData.map((item, index)=> {
            const id = item.id
            const firebaseEvnetImgUrl = `https://firebasestorage.googleapis.com/v0/b/petfriend-77a67.appspot.com/o/event%2F${id}.jpg?alt=media&token=ef1c83ee-6428-44d8-96c5-e5cf9c4556f3`
            
            return (
              <CommunityCard
                event
                detail
                key={item.id}
                src={firebaseEvnetImgUrl}
                title={item.title}
                desc={item.desc}
                location={item.location}
                date={`${item.startDate} ~ ${item.endDate}`}
                itemEvent={item}
              />
            )
        })}
        {/* 3.공지사항 */}
        {tabIndex === 2 && <Notice />}
        {/* 4.FAQ */}
        {tabIndex === 3 && <FAQ />}
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    paddingBottom: 120
  },
})

export default Community