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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Background1 from '../../assets/images/background1.jpeg';
import Logo from '../../assets/images/logo.png';
import RegistrationPageIndicator from '../../components/RegistrationPageIndicator';
import DocumentIcon from '../../assets/images/document.png';
import {AllColor} from '../../utils/allColors';
import DocumentPicker from 'react-native-document-picker';
import ProceedButton from '../../components/ProceedButton';
// import Ippopay from 'react-native-ippopay';

const RegistrationPayment = (props) => {
  useEffect(() => {
    // payNow();
  }, []);

  // const payNow = async () => {
  //   await Ippopay.initSDK(props.route.params.response.public_key);
  //   var orderData = {
  //     order_id: props.route.params.response.order_id,
  //     customer: {
  //       name: '',
  //       email: '',
  //       phone: {
  //         country_code: '+',
  //         national_number: '',
  //       },
  //     },
  //   };

  //   Ippopay.makePayment(JSON.stringify(orderData), (response) => {
  //     let {success, message, transaction_id} = JSON.parse(response);

  //     console.warn(JSON.stringify(JSON.parse(response), undefined, 2));
  //   });
  // };
  return (
    <View style={Styles.container}>
      <KeyboardAwareScrollView style={{flex: 1}}>
        <View>
          <ImageBackground
            source={Background1}
            style={{width: '100%', height: 320}}
            resizeMode="stretch"
          />
          <View style={Styles.logoContainer}>
            <Image
              source={Logo}
              style={{width: '60%', height: 60}}
              resizeMode="contain"
            />
          </View>
        </View>
        <View style={styles.formContainer}>
          <View style={{width: '90%'}}>
            <Text style={styles.loanText}>Make Payment</Text>
            {/* <RegistrationPageIndicator number={2} /> */}
          </View>
          <View style={styles.mainContainer}>
            <View style={{width: '90%'}}></View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default RegistrationPayment;

const styles = StyleSheet.create({
  formContainer: {
    marginTop: -200,
    alignItems: 'center',
  },
  loanText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  mainContainer: {
    backgroundColor: 'white',
    width: '100%',
    marginVertical: 20,
    alignItems: 'center',
    height: 500,
  },
});
