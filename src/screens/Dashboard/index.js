import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/Header';
import {Styles} from '../../utils/commonStyle';
import {AllColor} from '../../utils/allColors';
import UserCard from '../../components/UserCard';

const Dashboard = (props) => {
  return (
    <View style={Styles.container}>
      <View>
        <Header back={false} {...props} />
      </View>
      <View style={{alignItems: 'center'}}>
        <View style={{width: '90%', zIndex: 99}}>
          <UserCard />
          <View style={{alignItems: 'center', marginTop: 20}}>
            <TouchableOpacity
              style={{
                backgroundColor: AllColor.blue,
                // padding: 20,
                borderRadius: 30,
                marginTop: -50,
                zIndex: 99,
                width: '33%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white'}}>Apply Loan</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.darkBlueContainer}></View>
        <ImageBackground
          source={require('../../assets/images/circle.png')}
          style={{width: '100%', height: 300, marginVertical: 30}}
          resizeMode="contain"></ImageBackground>
      </View>
    </View>
  );
};

export default Dashboard;

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
