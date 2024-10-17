import React from 'react'
import { Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useMenu } from '../MenuProvider';

const Detail = () => {

  const navigation = useNavigation();
  const { detailActive } = useMenu(); 


  return (
    <Text>Detail</Text>
  )
}

export default Detail