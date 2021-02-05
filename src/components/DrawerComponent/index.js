import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import * as loginAction from '../../redux/actions/loginAction';
import {useDispatch, useSelector} from 'react-redux';
import NotificationIcon from '../../assets/images/notification.png';
import UserIcon from '../../assets/images/dummyUser.png';
import LoanIcon from '../../assets/images/loan.png';
import RatingIcon from '../../assets/images/rating.png';
import {Styles} from '../../utils/commonStyle';
import {AllColor} from '../../utils/allColors';

const DrawerComponent = (props) => {
  const dispatch = useDispatch();

  const profileData = useSelector((state) => state.ProfileReducer.profileData);

  const handleNavigation = (type) => {
    props.navigation.toggleDrawer();
    let navigation = props.navigation;
    if (type == 'notification') {
      navigation.navigate('Notifications');
    } else if (type === 'rating') {
      navigation.navigate('Rating');
    } else if (type === 'profile') {
      navigation.navigate('UpdateProfile');
    } else if (type === 'loanList') {
      navigation.navigate('LoanList');
    }
  };

  const logout = () => {
    props.navigation.toggleDrawer();
    Alert.alert('Digitell', 'Are you sure you want to logout', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          dispatch(loginAction.setToken(null));
          dispatch(loginAction.storeCustomerId(null));
        },
      },
    ]);
  };

  return (
    <View style={Styles.container}>
      <View style={{backgroundColor: '#FB5607', height: 8}} />
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        {Object.keys(profileData).length ? (
          <View>
            <TouchableOpacity
              style={styles.rowContainer}
              onPress={() => handleNavigation('profile')}>
              <View style={styles.rowLeft}>
                <Image source={UserIcon} style={{width: 30, height: 30}} />
              </View>
              <View style={styles.rowRight}>
                <Text style={{fontWeight: 'bold'}} numberOfLines={1}>
                  {' '}
                  {'MR. ' +
                    profileData.result[0].customer_name +
                    ' ' +
                    profileData.result[0].middle_name +
                    ' ' +
                    profileData.result[0].last_name}
                </Text>
                <Text style={{paddingVertical: 5, fontSize: 12}}>
                  {profileData.result[0].email}
                </Text>
                <Text style={{color: AllColor.blue, fontSize: 12}}>
                  View/Edit Profile
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.rowContainer}
              onPress={() => handleNavigation('loanList')}>
              <View style={styles.rowLeft}>
                <Image
                  source={LoanIcon}
                  style={styles.icons}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.rowRight}>
                <Text style={{fontWeight: 'bold'}}>Request Loan List</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.rowContainer}
              onPress={() => handleNavigation('notification')}>
              <View style={styles.rowLeft}>
                <Image
                  source={NotificationIcon}
                  style={styles.icons}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.rowRight}>
                <Text style={{fontWeight: 'bold'}}>Notifications</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.rowContainer}
              onPress={() => handleNavigation('rating')}>
              <View style={styles.rowLeft}>
                <Image
                  source={RatingIcon}
                  style={styles.icons}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.rowRight}>
                <Text style={{fontWeight: 'bold'}}>Rate Us</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : null}
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
            <Text style={{color: 'white'}}>Logout</Text>
          </TouchableOpacity>
          <View
            style={{
              width: '100%',
              backgroundColor: '#ECECEC',
              alignItems: 'center',
              paddingVertical: 10,
              marginTop: 20,
            }}>
            <Text style={{fontSize: 10}}>Copyright@2020Version 1.1</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DrawerComponent;

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e2e2',
    paddingVertical: 15,
  },
  icons: {
    width: 20,
    height: 20,
  },
  rowLeft: {
    width: '25%',
    alignItems: 'center',
  },
  rowRight: {
    width: '75%',
  },
  logoutBtn: {
    borderRadius: 30,
    backgroundColor: AllColor.blue,
    paddingHorizontal: 50,
    paddingVertical: 15,
  },
});
