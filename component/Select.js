import React, { useState } from 'react'
import { Image, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { ImgPath } from '../ImgPath';

const Select = (props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const {placeholder, items, setItems,  size, marginRight } = props;

  return (
    <DropDownPicker
      placeholder={placeholder}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      style={[styles.select, {width: size, marginRight: marginRight}]}
      maxHeight={200}
      showTickIcon={false}
      containerStyle={styles.containerStyle}
      labelStyle={styles.labelStyle}
      textStyle={styles.textStyle}
      dropDownContainerStyle={[styles.dropDownContainerStyle, {width: size}]}
      listItemLabelStyle={styles.listItemLabelStyle}
      ArrowDownIconComponent={()=>(
        <Image source={ImgPath.select_down} />
      )}
      ArrowUpIconComponent={()=>(
        <Image source={ImgPath.select_up} />
      )}
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
  },
  containerStyle: {
    width: 'fit-content'
  },
  textStyle: {
    color: '#8D96A4',
  },
  dropDownContainerStyle: {
    width: 115,
    borderColor: '#E7E9ED',
    borderRadius: 6,
  },
  listItemLabelStyle: {
    color: '#1F2329',
  },
  placeholderStyle: {
    color: '#8D96A4',
  }
})

export default Select