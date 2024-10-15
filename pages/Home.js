import React from 'react'
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { ImgPath } from '../ImgPath'
import MainTitle from '../component/MainTitle'
import Tab from '../component/Tab'
import AdoptPet from '../component/AdoptPet'
import BestStory from '../component/BestStory'
import MissingPet from '../component/MissingPet'
import CommunityCard from '../component/CommunityCard'
import { LinearGradient } from 'expo-linear-gradient';
import Carousel from 'react-native-reanimated-carousel'

const Home = () => {

  const {width, height} = Dimensions.get('window');

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
      // colors 배열로 그라디언트의 색상 정의
      colors={['#64C7FA', '#34B0EA', '#34B0EA', '#fff']} 
      style={styles.background}
      >
        <View style={[styles.visual]}>
          <View style={styles.visualText}>
            <Image source={ImgPath.logo_white} />
            <View style={styles.visualTextTitle}>
              <Text style={styles.visualTitleItem}>사지말고</Text>
              <Text style={styles.visualTitleItem}>입양하세요!</Text>
            </View>
            <Pressable style={styles.visualBtn}>
              <Text style={styles.visualBtnText}>무료로 입양받기</Text>
            </Pressable>
          </View>
          <View style={styles.visualImg}>
            <View>
              <Image source={ImgPath.animal_01} style={styles.visualImgItem01} />
              <Image source={ImgPath.animal_02} style={styles.visualImgItem02} />
            </View>
            <View style={{flexDirection: 'row', marginLeft: 20}}>
              <Image source={ImgPath.animal_03} style={styles.visualImgItem03} />
              <Image source={ImgPath.animal_04} style={styles.visualImgItem04} />
            </View>
            <View style={{marginLeft:20}}>
              <Image source={ImgPath.animal_05} style={styles.visualImgItem05} />
              <Image source={ImgPath.animal_06} style={styles.visualImgItem06} />
            </View>
          </View>
        </View>
      </LinearGradient>
      <View style={styles.contents}>
        <View style={styles.section}>
          <MainTitle titleEng='Adopted Animal' title='입양 대기 동물' />
          <View>
            <Tab title={['강아지','고양이','기타']} />
            <View style={styles.list}>
              {new Array(3).fill().map((item, i)=>
                  <AdoptPet 
                    key={i}
                    index={i}
                    name={`포메라니안${i}`} 
                    info='암컷, 6개월' 
                    tagTitle={['보호중','중성화O']} 
                    location='충청남도 공주시'
                    src={ImgPath.animal_adpot}
                  />
                )}
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <MainTitle titleEng='Best Adoption Story' title='베스트 입양 일기' />
          <View style={styles.list}>
          {new Array(6).fill().map((item, i)=>
            <BestStory 
              key={i}
              index={i}
              title={`${i} 우리 땅콩이 귀엽지 않나용?`} 
              desc='진짜 짱 귀여운거 같아요. 그래서 자랑하려고 게시글 올립니다...' 
              src={ImgPath.animal_story} 
            />
          )}
          </View>
        </View>
        <View style={styles.section}>
          <MainTitle titleEng='Missing Animal' title='실종 동물' />
          <View style={styles.missingPet}>
            {new Array(4).fill().map((item, i)=>
              <MissingPet
                key={i}
                index={i}
                tagTitle='실종'
                location='상봉역 인근'
                src={ImgPath.animal_missing} 
                name='믹스견'
                date='2024. 09. 26'
                info='암컷, 5개월, 흰색 갈색, 중성화X...'
              />
            )}
          </View>
        </View>
        <View style={styles.section}>
          <MainTitle titleEng='Community' title='커뮤니티' />
          <View>
            <Tab title={['캠페인&이벤트','자원봉사','뉴스']} />
            <View style={styles.community}>
              <Carousel
                loop={true}
                snapEnabled={true}
                width={width}
                height={362}
                autoPlay={true}
                data={[...new Array(3).keys()]}
                scrollAnimationDuration={2000}
                mode="parallax"
                modeConfig={{
                  parallaxScrollingScale: 1,
                  parallaxScrollingOffset: 28,
                }}
                // onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ index }) => (
                  <CommunityCard 
                    src={ImgPath.animal_community}
                    title={`튼튼 펫 페스타${index}`}
                    desc='튼튼 펫 페스타는 반려인과 반려동물이 함께 넓은 야외 행사장에서 신나게 뛰어놀고 다양한 체험도 할 수 있는 행사이다. 짱좋은 행사이다 짱짱짱짱'
                    location='경기도 화성시'
                    date='2024. 10. 05 ~ 2024. 10. 06'
                  />
                )}
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 64,
    backgroundColor: '#fff',
  },
  visual: {
    height: 502,
    paddingTop: 80,
    alignItems: 'center',
    position: 'relative',
    left: 0,
    top: 0,
  },
  visualText: {
    textAlign: 'center',
    alignItems: 'center',
  },
  visualTextTitle: {
    marginTop: 16,
    marginBottom: 24,
  },
  visualTitleItem: {
    fontSize: 40,
    fontWeight: '700',
    lineHeight: 48,
    color: '#fff',
    textAlign: 'center',
  },
  visualBtn: {
    paddingHorizontal: 22,
    paddingVertical: 10,
    backgroundColor: '#1F2329',
    borderRadius: 999
  },
  visualBtnText: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 17,
    fontWeight: '700',
  },
  visualImg: {
    flexDirection: 'row',
    maxWidth: 550,
    height: 236,
    marginTop: -8,
    justifyContent: 'space-between',
  },
  visualImgItem02: {
    marginTop: 20
  },
  visualImgItem03: {
    marginTop: 64
  },
  visualImgItem04: {
    marginTop: 84,
    marginLeft: 20,
  },
  visualImgItem05: {
    marginTop: 16
  },
  visualImgItem06: {
    marginTop: 20
  },
  contents: {
    marginTop: 80,
  },
  section: {
    marginBottom: 64
  },
  titleWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 24,
    paddingHorizontal:20
  },
  contentsTitleEng: {
    fontSize: 14,
    color: '#8D96A4',    
    marginBottom: 8
  },
  contentsTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1F2329',
  },
  contentsMoreBtn: {
    marginBottom: 4,
    fontSize: 14,
    color: '#8D96A4'
  },
  list: {
    flexDirection: 'row', 
    flexShrink: 0, 
    overflow: 'auto', 
    paddingLeft: 20,
  },
  missingPet: {
    flexDirection:'row', 
    flexWrap: 'wrap',
    paddingHorizontal: 20
  },
})

export default Home