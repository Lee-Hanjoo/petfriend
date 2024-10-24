import React, { useEffect, useState } from 'react'
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
import { useNavigation } from '@react-navigation/native';
import { useMenu } from '../MenuProvider';
import axios from 'axios'

const {width, height} = Dimensions.get('window');

const Home = () => {

  const navigation = useNavigation();
  const { menuActive, setMenuActive, previousMenuActive, menuItems } = useMenu();     

  const [tabIndex, setTabIndex] = useState(0)
  const [tabSecIndex, setTabSecIndex] = useState(0)


  const [apiType, setApiType] = useState('abandonmentPublic')
  // 시도코드
  const [uprCd, setUprCd] = useState('upr_cd=6110000')
  // 시군구코드
  const [orgCd, setOrgCd] = useState('org_cd=3220000')
  // 축종코드 (개 : 417000, 고양이 : 422400, 기타 : 429900))
  const [upKindCd, setUpKindCd] = useState('up_kind_cd=417000')
  // 품종코드 
  const [kindCd, setKindCd] = useState('kind_cd=000054')
  // 이미지
  const [popfile, setPopfile] = useState('kind_cd=000054')


  const [abandonmentPublicData, setAbandonmentPublicData] = useState([]);

  useEffect(()=>{
    const url = 'http://apis.data.go.kr/1543061/abandonmentPublicSrvc/'
    const key = `PNTnhM9wrxsZHo8d6ib69yUDWPKWGaTFlsey6wJEWn%2BNRugZHuKG3TliH4YsI2yhJGl0A4QUtryHa6WyDFWDzw%3D%3D&_type=json&numOfRows=10`

    axios.get(`${url}${apiType}?serviceKey=${key}`)

    .then(function (res) {
      setAbandonmentPublicData(res.data.response.body.items.item);
      
    })
    .catch(function (error) {
      alert('데이터를 불러오는데 실패했습니다.')
    })
    .finally(function () {
      // always executed
    });
  },[])

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
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
        {/* 1.입양 대기 동물 */}
        <View style={styles.section}>
          <MainTitle titleEng={menuItems[1].title} title={menuItems[1].krTitle} />
          <View>
            <Tab title={['강아지','고양이','기타']} tabIndex={tabIndex} setTabIndex={setTabIndex} />
            <ScrollView horizontal style={styles.list}>
              {abandonmentPublicData.map((item, i)=> {
                let weight = item.weight;
                let replaceWeight = weight.replace('(', ''); 
                let resultWeight = replaceWeight.replace(')', ''); 
                return (
                  <AdoptPet 
                    item={item}
                    key={item.desertionNo}
                    index={i}
                    name={item.kindCd} 
                    info={`${item.sexCd === 'M' ? '수컷' : item.sexCd === 'F' ? '암컷' : item.sexCd === 'Q' && '성별 미상'}, ${resultWeight}`} 
                    tagTitle={[`${item.processState}`, item.neuterYn === 'N' ? '중성화X' : item.neuterYn === 'Y' ? '중성화O' : item.neuterYn === 'U' && '중성화미상']} 
                    location={item.orgNm}
                    src={item.popfile} 
                  />
                )
              }
              )}
            </ScrollView>
          </View>
        </View>
        {/* 2.스토리 */}
        <View style={styles.section}>
          <MainTitle titleEng={menuItems[2].title} title={menuItems[2].krTitle} />
          <ScrollView horizontal style={styles.list}>
          {new Array(6).fill().map((item, i)=>
            <BestStory 
              key={i}
              index={i}
              title={`${i} 우리 땅콩이 귀엽지 않나용?`} 
              desc='진짜 짱 귀여운거 같아요. 그래서 자랑하려고 게시글 올립니다...' 
              src={ImgPath.animal_story} 
            />
          )}
          </ScrollView>
        </View>
        {/* 3.실종 동물 */}
        <View style={styles.section}>
          <MainTitle titleEng={menuItems[4].title} title={menuItems[4].krTitle} />
          <View style={styles.missingPet}>
            {new Array(4).fill().map((item, i)=>
              <MissingPet
                key={i}
                index={i}
                tagTitle='실종'
                location='상봉역 인근'
                src={ImgPath.animal_missing} 
                name={`${i}믹스견`}
                date='2024. 09. 26'
                info='암컷, 5개월, 흰색 갈색, 중성화X...'
              />
            )}
          </View>
        </View>
        {/* 5.커뮤니티 */}
        <View style={[styles.section, {marginBottom: 0}]}>
          <MainTitle titleEng={menuItems[5].title} title={menuItems[5].krTitle} />
          <View>
            <Tab second title={['캠페인&이벤트','자원봉사','뉴스']} tabSecIndex={tabSecIndex} setTabSecIndex={setTabSecIndex} />
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
                renderItem={({ index }) => (
                  <CommunityCard 
                    src={ImgPath.animal_community}
                    title={`${index}튼튼 펫 페스타`}
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
    paddingBottom: 14
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
  },
  missingPet: {
    flexDirection:'row', 
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 10
  },
})

export default Home