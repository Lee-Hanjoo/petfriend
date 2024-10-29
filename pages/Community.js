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
import eventDataBase from '../dataBase/eventData.json'

const {width, height} = Dimensions.get('window')

const Community = () => {

  const [filterPopup, setFilterPopup] = useState(false)

  const [tabIndex, setTabIndex] = useState(0)

  // 캠페인&이벤트
  const [eventData, setEventData] = useState(eventDataBase)
  const getImage = (imageId) => {
    switch (imageId) {
      case 0:
        return require('../assets/images/event/event_00.png');
      case 1:
        return require('../assets/images/event/event_01.jpg');
      case 2:
        return require('../assets/images/event/event_02.jpg');
      case 3:
        return require('../assets/images/event/event_03.jpeg');
      case 4:
        return require('../assets/images/event/event_04.jpg');
      case 5:
        return require('../assets/images/event/event_05.jpg');
      case 6:
        return require('../assets/images/event/event_06.png');
      case 7:
        return require('../assets/images/event/event_07.jpg');
      default:
        return require('../assets/images/event/event_default.jpg'); // 기본 이미지 설정
    }
  };

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
    newsApi()
  },[])
  

  return (
    <View>
      <Tab faq top filter title={['뉴스', '캠페인&이벤트', '공지사항', 'FAQ']} filterPopup={filterPopup} setFilterPopup={setFilterPopup} tabIndex={tabIndex} setTabIndex={setTabIndex} />
      <FilterPopup filterPopup={filterPopup} setFilterPopup={setFilterPopup} tabIndex={tabIndex} />
      <ScrollView style={styles.container}>
        <View style={styles.contents}>
        {/* 1.뉴스 */}
        {tabIndex === 0 &&
          newsData.map((item, index)=> 
            <CommunityCard
              detail
              key={item.id}
              src={item.img}
              title={item.title}
              desc={item.summary}
              location={`${item.publisher} ${item.author && '('+item.author+')'}`}
              date={item.date}
              link={item.link}
            />
        )}
        {/* 2. 캠페인&이벤트 */}
        {tabIndex === 1 &&
          eventData.items.map((item, index)=> {
            return (
              <CommunityCard
                event
                detail
                key={item.id}
                src={getImage(item.id)}
                title={item.title}
                desc={item.desc}
                location={item.location}
                date={`${item.startDate} ~ ${item.endDate}`}
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