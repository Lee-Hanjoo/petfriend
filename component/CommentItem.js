import React from 'react'
import { Image, Text } from 'react-native'
import { StyleSheet, View } from 'react-native'
import { ImgPath } from '../ImgPath'

const CommentItem = (props) => {

  const {profileImg, name, date, comment} = props

  return (
    <View style={styles.container}>
        <View style={styles.top}>
            <View style={styles.nameWrap}>
                <Image source={ImgPath.profile_sample} />
                <Text style={styles.name}>포크엄마</Text>
            </View>
            <Text style={styles.date}>2024. 10. 08 08:15</Text>
        </View>
        <View style={styles.bottom}>
            <Text style={styles.comment}>최근에 돌아다니는거 본 적 있는데, 데리고 가셨군요..ㅠㅠ 너무 걱정됐었는데 잘됐네용. 얼른 주인 찾기를!!!!</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      gap: 8,
      marginTop: 20,
    },
    top: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    nameWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8
    },
    name: {
      fontWeight: '700',
      color: '#1F2329'
    },
    date: {
      color: '#8D96A4'
    },
    bottom: {},
    comment: {
      color: '#1F2329',
    },
})

export default CommentItem