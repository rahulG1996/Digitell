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
import {Styles} from '../../utils/commonStyle';

const ProceedButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Image
        source={require('../../assets/images/btn.png')}
        style={{width: 75, height: 75}}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default ProceedButton;
