import React from 'react'
import { Pressable } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

const MainTitle = (props) => {

  const { titleEng, title, url } = props; 

  return (
    <View style={styles.titleWrap}>
      <View>
        <Text style={styles.titleEng}>{titleEng}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Pressable style={styles.moreBtn}>
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
    // fontFamily: 'Wanted Sans',
    color: '#8D96A4',    
    marginBottom: 8
  },
  title: {
    fontSize: 32,
    // fontFamily: 'Wanted Sans',
    fontWeight: '700',
    color: '#1F2329',
  },
  moreBtn: {
    marginBottom: 4,
  },
  moreBtnText: {
    fontSize: 14,
    // fontFamily: 'Wanted Sans',
    color: '#8D96A4'
  },
})

export default MainTitle