import React from 'react'
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useMenu } from '../MenuProvider';

const {width, height} = Dimensions.get('window');

const Menu = () => {

  const navigation = useNavigation();
  const { menuActive, setMenuActive, menuItems } = useMenu(); 
  
  return (
    <View>
      <View style={styles.contents}>
        {new Array(6).fill().map((item,i)=>
          <Pressable key={i} style={styles.menuItem} 
            onPress={()=>{
              setMenuActive(menuItems[i].title); 
              navigation.navigate(menuItems[i].title)
            }}
          >
            <View style={styles.iconWrap}>
              <Image source={menuItems[i].menuIcon} />
            </View>
            <Text style={styles.title}>{menuItems[i].krTitle}</Text>
          </Pressable>
        )}
        <Pressable>
          
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  contents: {
    height: height,
    paddingTop: 40,
    paddingHorizontal: 20,
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