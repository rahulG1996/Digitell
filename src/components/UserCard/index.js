import React from 'react';
import {View, Text, ImageBackground, Image, StyleSheet} from 'react-native';
import Header from '../../components/Header';
import {Styles} from '../../utils/commonStyle';
import {AllColor} from '../../utils/allColors';
import Banner from '../../assets/images/banner.png';
import UserImage from '../../assets/images/user.png';

const UserCard = (props) => {
  return (
    <ImageBackground
      source={Banner}
      style={{width: '100%', paddingBottom:20}}
      imageStyle={{borderRadius: 20}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-evenly',
          padding: 10,
        }}>
        <View style={{width: '30%', alignItems: 'center'}}>
          <Image source={UserImage} style={{width: 70, height: 70}} />
        </View>
        <View style={{width: '70%'}}>
          <View>
            <Text
              style={[styles.profileText, {fontSize: 16, fontWeight: 'bold'}]}>
              Mr rahul gupta
            </Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.profileText}>Occpation</Text>
            <Text style={styles.profileText}>Software developer</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.profileText}>Phone number</Text>
            <Text style={styles.profileText}>9891586442</Text>
          </View>

          <View style={styles.dataRow}>
            <Text style={styles.profileText}>email</Text>
            <Text style={styles.profileText}>rg3257@gmail.com</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  profileText: {
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 12,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
});
