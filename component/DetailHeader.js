import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ImgPath } from '../ImgPath';
import { Pressable } from 'react-native';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMenu } from '../MenuProvider';

const DetailHeader = ({ menuItems }) => {
  
    const navigation = useNavigation();
    const { menuActive, setMenuActive } = useMenu(); 

  return (
    <View style={[styles.DetailHeaderWrap]}>
      <View style={styles.titleWrap}>
        <Pressable style={styles.backBtn} 
          onPress={() =>{ 
            setMenuActive('menu'); 
            navigation.navigate('menu')
          }}
        >
          <Image source={ImgPath.back_arrow}/>
        </Pressable>
        <Text style={styles.title}>
          {menuActive === 'mypet' && '설정'}
          {menuActive === 'write' && '글쓰기'}
          {menuActive === 'detail' && '상세'}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  DetailHeaderWrap: {  
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    zIndex: 999,
    borderBottomWidth: 1,
    borderColor: '#E7E9ED',
    position: 'relative',
  },
  titleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  backBtn: {
    position: 'absolute',
    left: 0,
    top: -5,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2329'
  }
});
  
export default DetailHeader