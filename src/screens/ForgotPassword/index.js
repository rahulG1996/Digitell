import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Image,
  Keyboard,
} from 'react-native';
import {Styles} from '../../utils/commonStyle';
import Icon from 'react-native-vector-icons/Feather';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Background1 from '../../assets/images/background1.jpeg';
import Logo from '../../assets/images/logo.png';
import ProceedButton from '../../components/ProceedButton';
import {AllColor} from '../../utils/allColors';
import PhoneInput from 'react-native-phone-number-input';
import OtpModal from '../../components/otpModal';
import {sentOtp} from '../../redux/actions/otpAction';
import * as forgotPasswordAction from '../../redux/actions/forgotPasswordAction';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../components/loader';
import * as loadingAction from '../../redux/actions/loaderAction';
import {ToastMessage} from '../../components/ToastMessage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ForgotPassword = (props) => {
  const [state, setState] = useState({
    phonenumber: '',
    showOtpModal: false,
    otpResponse: '',
    customer_id: '',
  });

  const dispatch = useDispatch();

  const forgotPasswordResponse = useSelector(
    (state) => state.ForgotPasswordReducer.forgotPasswordResponse,
  );

  useEffect(() => {
    if (forgotPasswordResponse && forgotPasswordResponse.Status == 'success') {
      setTimeout(() => {
        setState({
          ...state,
          showOtpModal: true,
          otpResponse: forgotPasswordResponse.Details,
          customer_id: forgotPasswordResponse.customer_id,
        });
      }, 300);
      dispatch(forgotPasswordAction.emptyForgotPasswordData());
    } else if (
      forgotPasswordResponse &&
      forgotPasswordResponse.Status == 'failure'
    ) {
      ToastMessage(forgotPasswordResponse.response);
      dispatch(forgotPasswordAction.emptyForgotPasswordData());
    }
  }, [forgotPasswordResponse]);

  const handleModal = () => {
    setState({...state, showOtpModal: false});
  };

  const crossModal = () => {
    setState({...state, showOtpModal: false});
  };

  const success = (value) => {
    let {phonenumber} = state;
    setState({...state, showOtpModal: false, isMobileVerified: true});
    setTimeout(() => {
      props.navigation.navigate('ResetPassword', {
        customer_id: state.customer_id,
      });
    }, 300);
  };

  const faliure = () => {
    setState({...state, showOtpModal: false});
    setTimeout(() => {
      ToastMessage('Otp Does not match');
      props.navigation.navigate('ResetPassword', {
        customer_id: state.customer_id,
      });
    }, 400);
  };

  const forgotPassword = () => {
    if (state.phonenumber.slice(3).length < 10) {
      ToastMessage('Please enter Valid mobile number');
    } else {
      dispatch(loadingAction.commaonLoader(true));
      dispatch(
        forgotPasswordAction.forgotPassword({
          mobile: state.phonenumber.slice(3),
        }),
      );
    }
  };

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
        <View
          style={{
            alignItems: 'center',
            marginTop: -150,
          }}>
          <View style={{width: '90%'}}>
            <View style={styles.mainContainer}>
              <View>
                <Text style={[styles.headeingText, {color: AllColor.orange}]}>
                  Forgot Password
                </Text>
              </View>

              <View>
                <Text style={{paddingTop: hp('2%')}}>
                  Enter Your Phone Number
                </Text>
              </View>
              <View style={{marginVertical: hp('2%')}}>
                <PhoneInput
                  placeholder={'Enter Mobile Number'}
                  defaultCode="IN"
                  containerStyle={{
                    borderBottomWidth: 1,
                    height: 50,
                    width: '98%',
                    borderBottomColor: '#e2e2e2',
                  }}
                  textContainerStyle={{
                    borderLeftWidth: 1,
                    backgroundColor: 'white',
                    borderLeftColor: '#e2e2e2',
                  }}
                  layout="second"
                  onChangeFormattedText={(text) => {
                    setState({...state, phonenumber: text});
                  }}
                  textInputProps={{
                    maxLength: 10,
                    color: 'black',
                    height: 50,
                  }}
                  // autoFocus
                />
              </View>
              <View style={{marginBottom: -50, alignItems: 'center'}}>
                <ProceedButton {...props} onPress={forgotPassword} />
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
      {state.showOtpModal ? (
        <OtpModal
          showOtpModal={state.showOtpModal}
          handleModal={handleModal}
          crossModal={crossModal}
          otpResponse={state.otpResponse}
          faliure={faliure}
          success={success}
        />
      ) : null}
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  headeingText: {
    fontSize: 18,
  },
  mainContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: '5%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
    paddingHorizontal: 20,
    marginVertical: 20,
  },
});
