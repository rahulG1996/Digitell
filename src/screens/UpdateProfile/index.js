import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Header from '../../components/Header';
import {Styles} from '../../utils/commonStyle';
import {AllColor} from '../../utils/allColors';

const UpdateProfile = (props) => {
  return (
    <View style={Styles.container}>
      <View>
        <Header back={true} {...props} title="Edit Your Profile" />
      </View>
    </View>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  darkBlueContainer: {
    height: 120,
    width: '100%',
    marginTop: -70,
    backgroundColor: AllColor.darkBlue,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
  },
});
