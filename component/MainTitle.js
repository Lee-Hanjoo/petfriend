import React from 'react'
import { Pressable } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMenu } from '../MenuProvider';

const MainTitle = (props) => {

  const { titleEng, title, index } = props;  

  const navigation = useNavigation();
  const { menuActive, setMenuActive, menuItems } = useMenu();     

  return (
    <View style={styles.titleWrap}>
      <View>
        <Text style={styles.titleEng}>{titleEng}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Pressable 
        style={styles.moreBtn} 
        onPress={()=>{
          navigation.navigate(titleEng);
          setMenuActive(titleEng)
        }}
      >
        <Text style={styles.moreBtnText}>더보기</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  titleWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 24,
    paddingHorizontal:20
  },
  titleEng: {
    fontSize: 14,
    color: '#8D96A4',    
    marginBottom: 8,
    textTransform: 'capitalize'
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1F2329',
  },
  moreBtn: {
    marginBottom: 4,
  },
  moreBtnText: {
    fontSize: 14,
    color: '#8D96A4'
  },
})

export default MainTitle