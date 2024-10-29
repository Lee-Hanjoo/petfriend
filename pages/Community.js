import React, { useEffect, useState } from 'react'
import { Dimensions, View } from 'react-native'
import { StyleSheet, Text, ScrollView } from 'react-native'
import Tab from '../component/Tab'
import { ImgPath } from '../ImgPath'
import CommunityCard from '../component/CommunityCard'
import FilterPopup from '../component/FilterPopup'
import Notice from '../pages/Notice'
import FAQ from '../pages/FAQ'
import { api } from '../api/api';

const {width, height} = Dimensions.get('window')

const Community = () => {

  const [filterPopup, setFilterPopup] = useState(false)

  const [tabIndex, setTabIndex] = useState(0)

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
      <Tab faq top filter title={['캠페인&이벤트', '뉴스', '공지사항', 'FAQ']} filterPopup={filterPopup} setFilterPopup={setFilterPopup} tabIndex={tabIndex} setTabIndex={setTabIndex} />
      <FilterPopup filterPopup={filterPopup} setFilterPopup={setFilterPopup} tabIndex={tabIndex} />
      <ScrollView style={styles.container}>
        <View style={styles.contents}>
        {/* 캠페인&이벤트 */}
        {tabIndex === 0 &&
          new Array(6).fill().map((item, i)=> 
            <CommunityCard
              detail
              key={i}
              src={ImgPath.animal_community}
              title={`${i}튼튼 펫 페스타`}
              desc='튼튼 펫 페스타는 반려인과 반려동물이 함께 넓은 야외 행사장에서 신나게 뛰어놀고 다양한 체험도 할 수 있는 행사이다. 짱좋은 행사이다 짱짱짱짱'
              location='경기도 화성시'
              date='2024. 10. 05 ~ 2024. 10. 06'
            />
        )}
        {/* 2.뉴스 */}
        {tabIndex === 1 &&
          newsData.map((item, i)=> 
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