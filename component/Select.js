import React, { useState } from 'react'
import { Image, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const Select = (props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const {placeholder, items, setItems,  size } = props;
  console.log(size);

  return (
    <DropDownPicker
      placeholder={placeholder}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      style={[styles.select, {width: size}]}
      maxHeight={200}
      showTickIcon={false}
      containerStyle={styles.containerStyle}
      labelStyle={styles.labelStyle}
      textStyle={styles.textStyle}
      dropDownContainerStyle={[styles.dropDownContainerStyle, {width: size}]}
      listItemLabelStyle={styles.listItemLabelStyle}
      ArrowDownIconComponent={()=>(
          <Image source={require('../assets/imgs/icon/icon_arrow_down.svg')} />
        )
      }
      ArrowUpIconComponent={()=>(
          <Image source={require('../assets/imgs/icon/icon_arrow_up.svg')} />
        )
      }
    />
  );
}

const styles = StyleSheet.create({
  select: {
    minHeight: 33,
    borderColor: '#E7E9ED',
    borderRadius: 6,
  },
  labelStyle:{
    color: '#1F2329',
    // fontFamily: 'Wanted Sans',
    whiteSpace: 'nowrap'
  },
  containerStyle: {
    width: 'fit-content'
  },
  textStyle: {
    color: '#8D96A4',
    // fontFamily: 'Wanted Sans'
  },
  dropDownContainerStyle: {
    width: 115,
    borderColor: '#E7E9ED',
    borderRadius: 6,
  },
  listItemLabelStyle: {
    color: '#1F2329',
    // fontFamily: 'Wanted Sans'
  },
  placeholderStyle: {
    color: '#8D96A4',
    // fontFamily: 'Wanted Sans'
  }
})

export default Select