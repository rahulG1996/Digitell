import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Image,
} from 'react-native';
import {AllColor} from '../../utils/allColors';

const RegistrationPageIndicator = (props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View
        style={[
          styles.numberContainer,
          props.number == 1
            ? {backgroundColor: 'white'}
            : props.completeSteps == 1
            ? {backgroundColor: AllColor.blue}
            : {backgroundColor: 'transparent'},
        ]}>
        <Text
          style={
            props.number == 1
              ? {color: 'orange', fontWeight: 'bold'}
              : {color: 'white', fontWeight: 'bold'}
          }>
          01
        </Text>
      </View>
      <Text style={{color: 'white'}}>- - - - - - -</Text>
      <View
        style={[
          styles.numberContainer,
          props.number == 2
            ? {backgroundColor: 'white'}
            : props.completeSteps == 1
            ? {backgroundColor: AllColor.blue}
            : {backgroundColor: 'transparent'},
        ]}>
        <Text
          style={
            props.number == 2
              ? {color: 'orange', fontWeight: 'bold'}
              : {color: 'white', fontWeight: 'bold'}
          }>
          02
        </Text>
      </View>
      <Text style={{color: 'white'}}>- - - - - - -</Text>
      <View
        style={[
          styles.numberContainer,
          props.number == 3
            ? {backgroundColor: 'white'}
            : props.completeSteps == 2
            ? {backgroundColor: AllColor.blue}
            : {backgroundColor: 'transparent'},
        ]}>
        <Text
          style={
            props.number == 3
              ? {color: 'orange', fontWeight: 'bold'}
              : {color: 'white', fontWeight: 'bold'}
          }>
          03
        </Text>
      </View>
    </View>
  );
};

export default RegistrationPageIndicator;

const styles = StyleSheet.create({
  numberContainer: {
    height: 30,
    width: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white',
  },
});
