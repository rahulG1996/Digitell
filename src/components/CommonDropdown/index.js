import * as React from 'react';
import {StyleSheet, Text, TextInput, View, Dimensions} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import RNPickerSelect from 'react-native-picker-select';

const CommonDropdown = (props) => {
  // console.warn('drop', props.value);
  return (
    <View>
      <View>
        <RNPickerSelect
          onValueChange={props.onValueChange}
          items={props.itemData}
          value={props.value}
          useNativeAndroidPickerStyle={false}
          style={pickerStyleing}
          disabled={props.disabled ? props.disabled : false}
          placeholder={{
            label: props.placeholderText
              ? props.placeholderText
              : 'Select an item',
            value: null,
          }}
        />
      </View>
    </View>
  );
};

export default CommonDropdown;

const pickerStyleing = StyleSheet.create({
  placeholder: {
    // color: '#05564d',
    fontSize: hp('1.5%'),
    paddingVertical: hp('0.9%'),
    paddingLeft: 8,
    paddingRight: 20,
  },
  inputIOS: {
    color: '#000',
    fontSize: hp('1.5%'),
    paddingVertical: hp('0.9%'),
    paddingLeft: 8,
    borderBottomWidth: 1,
    borderColor: '#e2e2e2',
    width: Dimensions.get('window').width - 70,

    paddingLeft: '5%',
    height: 45,

    paddingRight: 10,
  },
  inputAndroid: {
    color: '#000',
    fontSize: hp('2%'),
    paddingVertical: hp('0.9%'),
    paddingLeft: 8,
    borderBottomWidth: 1,
    borderColor: '#e2e2e2',
    width: Dimensions.get('window').width - 65,
    paddingLeft: '5%',
    height: 45,

    paddingRight: 10,
  },
});
