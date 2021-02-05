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

const ResetPassword = (props) => {
  const [state, setState] = useState({password1: '', cPassword: ''});

  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.CommonLoaderReducer.isLoading);

  const resetPasswordResponse = useSelector(
    (state) => state.ForgotPasswordReducer.resetPasswordResponse,
  );

  useEffect(() => {
    if (resetPasswordResponse && resetPasswordResponse.status == 'success') {
      dispatch(forgotPasswordAction.emptyResetPasswordData());
      props.navigation.pop();
      props.navigation.pop();
      setTimeout(() => {
        ToastMessage('Your Password has been changed successfully');
      }, 300);
    }
  }, [resetPasswordResponse]);

  const validateFields = () => {
    let {password1, cPassword} = state;

    if (!password1) {
      ToastMessage('Please enter Password');
      return false;
    } else if (!cPassword) {
      ToastMessage('Please enter Confirm Password');
      return false;
    } else if (cPassword !== password1) {
      ToastMessage('Confirm password not matched');
      return false;
    } else return true;
  };

  const onChange = (type, value) => {
    let {password1, cPassword} = state;
    if (type === 'password1') {
      password1 = value;
    } else if (type === 'cPassword') {
      cPassword = value;
    }
    setState({
      ...state,
      password1,
      cPassword,
    });
  };

  const resetPassword = () => {
    if (validateFields()) {
      dispatch(loadingAction.commaonLoader(true));
      dispatch(
        forgotPasswordAction.resetpassword({
          customer_id: props.route.params.customer_id,
          password: state.password1,
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
                <Text style={styles.headeingText}>Reset Your Password</Text>
              </View>

              <View style={styles.rowContainer}>
                <View style={styles.rowIconContainer}>
                  <Icon name="lock" size={25} color={AllColor.blue} />
                </View>
                <View style={styles.textInputContainer}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter Password"
                    onChangeText={(e) => onChange('password1', e)}
                    value={state.password1}
                    secureTextEntry
                  />
                </View>
              </View>
              <View style={styles.rowContainer}>
                <View style={styles.rowIconContainer}>
                  <Icon name="lock" size={25} color={AllColor.blue} />
                </View>
                <View style={styles.textInputContainer}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Confirm Password"
                    onChangeText={(e) => onChange('cPassword', e)}
                    value={state.cPassword}
                    secureTextEntry
                  />
                </View>
              </View>
              <View style={{marginBottom: -50, alignItems: 'center'}}>
                <ProceedButton {...props} onPress={resetPassword} />
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
      {isLoading ? <Loader /> : null}
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  headeingText: {
    fontSize: 18,
    paddingBottom: 20,
    color: AllColor.orange,
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
  rowContainer: {
    borderWidth: 1,
    flexDirection: 'row',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 8,
    borderColor: '#e2e2e2',
    alignItems: 'center',
  },
  rowIconContainer: {
    width: '20%',
    alignItems: 'center',
  },
  textInput: {
    paddingVertical: 8,
  },
  textInputContainer: {
    width: '80%',
  },
});
