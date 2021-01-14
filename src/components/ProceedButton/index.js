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
    <TouchableOpacity
      onPress={() => props.navigation.navigate(props.routeScreenName)}>
      <Image
        source={require('../../assets/images/btn.png')}
        style={{width: 150, height: 150}}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default ProceedButton;
