import React from 'react';
import {View, Text, ImageBackground, Image, StyleSheet} from 'react-native';
import Header from '../../components/Header';
import {Styles} from '../../utils/commonStyle';
import {AllColor} from '../../utils/allColors';
import Banner from '../../assets/images/banner.png';
import UserImage from '../../assets/images/user.png';
import {useSelector, useDispatch} from 'react-redux';
import {imageUrl} from '../../services/apiServices';

const UserCard = (props) => {
  const profileData = useSelector((state) => state.ProfileReducer.profileData);
  return (
    <ImageBackground
      source={Banner}
      style={{width: '100%', paddingBottom: 20}}
      imageStyle={{borderRadius: 20}}>
      {Object.keys(profileData).length && profileData.result.length ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-evenly',
            padding: 10,
          }}>
          <View style={{width: '30%', alignItems: 'center'}}>
            {profileData.result[0].customer_image ? (
              <Image
                source={{uri: imageUrl + profileData.result[0].customer_image}}
                style={{width: 70, height: 70, borderRadius:10}}
              />
            ) : (
              <Image source={UserImage} style={{width: 70, height: 70}} />
            )}
          </View>
          <View style={{width: '70%'}}>
            <View>
              <Text
                style={[styles.profileText, {fontSize: 16, fontWeight: 'bold'}]}
                numberOfLines={1}>
                {'MR. ' +
                  profileData.result[0].customer_name +
                  ' ' +
                  profileData.result[0].middle_name +
                  ' ' +
                  profileData.result[0].last_name}
              </Text>
            </View>
            <View style={styles.dataRow}>
              <Text style={styles.profileText}>Occpation</Text>
              <Text style={styles.profileText}>Software developer</Text>
            </View>
            <View style={styles.dataRow}>
              <Text style={styles.profileText}>Phone number</Text>
              <Text style={styles.profileText}>
                {profileData.result[0].mobile}
              </Text>
            </View>

            <View style={styles.dataRow}>
              <Text style={styles.profileText}>email</Text>
              <Text style={styles.profileText}>
                {profileData.result[0].email}
              </Text>
            </View>
          </View>
        </View>
      ) : null}
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
