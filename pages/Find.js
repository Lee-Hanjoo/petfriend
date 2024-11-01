import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useMenu } from '../MenuProvider';

const Find = () => {

  const navigation = useNavigation();
  const { findActive, setFindActive } = useMenu();   

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contents}>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {},
  contents: {},
})

export default Find