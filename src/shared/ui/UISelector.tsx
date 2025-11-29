import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import { params } from '../config/params';
import { theme } from '../config/theme';
import { UIText } from './UIText';

interface UISelectProps<T> {
  items: T[];
  value: T | null;
  onChange: (value: T | null) => void;
  keyField: keyof T;
  labelField: keyof T;
  placeholder?: string;
}

export const UISelect = <T extends Record<string, any>>({
  items,
  value,
  onChange,
  keyField,
  labelField,
  placeholder = 'Выберите...',
}: UISelectProps<T>) => {
  const [isFocus, setIsFocus] = useState(false);

  const handleChange = (selectedItem: any) => {
    onChange(selectedItem || null);
    setIsFocus(false);
  };

  return (
    <View style={styles.container}>
      <Dropdown
        style={[
          styles.dropdown,
          isFocus && { borderColor: theme.palette.grey },
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={items.map(item => ({
          ...item,
          label: String(item[labelField]),
          value: String(item[keyField]),
        }))}
        search={items.length > 10}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? placeholder : '...'}
        searchPlaceholder="Поиск..."
        value={value ? String(value[keyField]) : null}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={handleChange}
        renderItem={(item) => (
          <View style={styles.item}>
            <UIText weight='regular' style={styles.textItem}>{item.label}</UIText>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  dropdown: {
    height: 41,
    borderColor: '#ccc',
    borderWidth: 1,
    borderBlockColor: theme.palette.borderGrey,
    borderRadius: params.picker.borderRadius,
    paddingHorizontal: params.picker.paddingHorizontal,
    backgroundColor: 'transparent',
  },
  placeholderStyle: {
    fontSize: 16,
    color: theme.palette.darkGrey,
    fontFamily: "Montserrat-Regular" 
  },
  selectedTextStyle: {
    fontSize: 16,
    color: theme.palette.darkGrey,
    fontFamily: "Montserrat-Regular" 
  },
  iconStyle: {
    width: 24,
    height: 24,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    color: theme.palette.textGrey,
  },
});