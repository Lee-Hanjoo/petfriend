import React from 'react'
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { ImgPath } from '../ImgPath';

const {width, height} = Dimensions.get('window');

const Menu = () => {

  const menuItems = [
    { title:'home', krTitle:'홈', icon: ImgPath.home_black},
    { title:'adopt', krTitle:'입양 대기 동물', icon: ImgPath.adopt_black},
    { title:'story', krTitle:'스토리', icon: ImgPath.story_black},
    { title:'map', krTitle:'시설 찾기', icon: ImgPath.map_black},
    { title:'missing', krTitle:'실종 동물 찾기 및 신고', icon: ImgPath.missing_black},
    { title:'community', krTitle:'커뮤니티', icon: ImgPath.community_black},
  ];
  
  return (
    <View>
      <View style={styles.contents}>
        {new Array(6).fill().map((item,i)=>
          <Pressable key={i} style={styles.menuItem} onPress={()=>{console.log(menuItems[i].title);}}>
            <View style={styles.iconWrap}>
              <Image source={menuItems[i].icon} />
            </View>
            <Text style={styles.title}>{menuItems[i].krTitle}</Text>
          </Pressable>
        )}
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  contents: {
    height: height,
    paddingTop: 40,
    paddingHorizontal: 32,
    backgroundColor: '#fff',
    gap: 16
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: 'rgba(231, 233, 237, 0.4)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 16,
    color: '#1F2329'
  },
})

export default Menu