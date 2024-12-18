import React from 'react'
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import Tag from '../component/Tag'
import { useNavigation } from '@react-navigation/native'
import { useMenu } from '../MenuProvider';

const {width, height} = Dimensions.get('window')

const NoticeItem = (props) => {

  const {badge, title, date, index, last, itemNotice} = props;

  const navigation = useNavigation();
  const { menuActive, setMenuActive, setDetailActive } = useMenu(); 
  
  return (
    <Pressable 
      style={[
        styles.noticeItemWrap, 
        index === 0 && {borderTopWidth: 1}
      ]}
      onPress={()=>{
        setMenuActive('detail'); 
        navigation.navigate('detail', {itemNotice}); 
        setDetailActive('notice')
      }}
      >
      <View style={styles.titleWrap}>
        {badge && <Tag bold title={'필독'} />}
        <Text 
          style={[
            styles.title, 
            badge ? {width: width - 85} : {width: width - 40},
          ]}
          // numberOfLines={2}
          // ellipsizeMode="tail" 
        >
          {title}
        </Text>
      </View>
      <Text style={[
        styles.date,
        // badge ? {marginLeft: 45} : {marginLeft: 0}
        ]}
      >
        {date}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  noticeItemWrap: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#E7E9ED',
    gap: 6
  },
  titleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 16,
    color: '#1F2329',
    fontWeight: '700',
  },
  date: {
    color: '#8D96A4'
  }
})

export default NoticeItem