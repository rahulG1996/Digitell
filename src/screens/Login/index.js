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
import CheckBox from 'react-native-check-box';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Background1 from '../../assets/images/background1.jpeg';
import Logo from '../../assets/images/logo.png';
import ProceedButton from '../../components/ProceedButton';
import RegistrationPageIndicator from '../../components/RegistrationPageIndicator';
import {AllColor} from '../../utils/allColors';
import PhoneInput from 'react-native-phone-number-input';
import OtpModal from '../../components/otpModal';
import {sentOtp} from '../../redux/actions/otpAction';
import * as loginAction from '../../redux/actions/loginAction';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../components/loader';
import * as loadingAction from '../../redux/actions/loaderAction';
import * as signupAction from '../../redux/actions/signupAction';
import {ToastMessage} from '../../components/ToastMessage';
import AsyncStorage from '@react-native-community/async-storage';

const Login = (props) => {
  const [state, setState] = useState({
    activeTab: 'login',
    isChecked: false,
    phonenumber: '',
    showOtpModal: false,
    otpResponse: '',
    userName: '',
    password: '',
    userName1: '',
    email: '',
    password1: '',
    cPassword: '',
    isMobileVerified: false,
  });

  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.CommonLoaderReducer.isLoading);

  const loginResponse = useSelector(
    (state) => state.LoginReducer.loginResponse,
  );

  const signupResponse = useSelector(
    (state) => state.SignupReducer.signupResponse,
  );

  useEffect(() => {
    setUserCredentials();
  }, []);

  const setUserCredentials = async () => {
    let data = await AsyncStorage.getItem('userCredentials');
    data = JSON.parse(data);

    if (data !== null) {
      setState({...state, userName: data.userName, password: data.password});
    }
  };

  useEffect(() => {
    if (
      Object.keys(loginResponse).length &&
      loginResponse.status === 'success'
    ) {
      if (state.isChecked) {
        let data = {
          userName: state.userName,
          password: state.password,
        };
        AsyncStorage.setItem('userCredentials', JSON.stringify(data));
      }

      props.navigation.navigate('LoanApplicationForm');
      dispatch(loginAction.setToken('token'));
      dispatch(loginAction.emptyLoginData());
    } else if (
      Object.keys(loginResponse).length &&
      loginResponse.status === 'Failure'
    ) {
      setTimeout(() => {
        ToastMessage(loginResponse.response);
        dispatch(loginAction.emptyLoginData());
      }, 400);
    }
  }, [loginResponse]);

  useEffect(() => {
    if (
      Object.keys(signupResponse).length &&
      signupResponse.status === 'success'
    ) {
      props.navigation.navigate('LoanApplicationForm');
    } else if (
      Object.keys(signupResponse).length &&
      signupResponse.status === 'Failure'
    ) {
      setTimeout(() => {
        ToastMessage(signupResponse.result);
      }, 400);
    }
  }, [signupResponse]);

  const handleModal = () => {
    setState({...state, showOtpModal: false});
  };

  const crossModal = () => {
    setState({...state, showOtpModal: false});
  };

  const success = (value) => {
    let {phonenumber, userName1, password1, email} = state;
    setState({...state, showOtpModal: false, isMobileVerified: true});
    setTimeout(() => {
      let data = {
        mobile: phonenumber,
        user_name: userName1,
        password: password1,
        email: email,
      };
      dispatch(signupAction.doSignup(data));
      dispatch(loadingAction.commaonLoader(true));
    }, 400);
  };

  const faliure = () => {
    setState({...state, showOtpModal: false});
    setTimeout(() => {
      Toast.show('Otp Does not match');
    }, 1000);
  };

  const sentOtpData = () => {
    if (state.phonenumber.length < 10) {
      alert('Please enter Valid mobile number');
    } else {
      Keyboard.dismiss();
      fetch(
        `http://2factor.in/API/V1/7a2fed00-443a-11eb-8153-0200cd936042/SMS/${state.phonenumber}/AUTOGEN/Digitell`,
      )
        .then((response) =>
          response.json().then((responseData) => {
            if (responseData.Status === 'Success') {
              setState({
                ...state,
                otpResponse: responseData.Details,
                showOtpModal: true,
              });
            }
          }),
        )
        .catch((err) => {
          console.warn(err);
        });
    }
  };

  const onChange = (type, value) => {
    let {userName, password, userName1, email, password1, cPassword} = state;
    if (type === 'userName') {
      userName = value;
    } else if (type === 'password') {
      password = value;
    } else if (type === 'userName1') {
      userName1 = value;
    } else if (type === 'email') {
      email = value;
    } else if (type === 'password1') {
      password1 = value;
    } else if (type === 'cPassword') {
      cPassword = value;
    }
    setState({
      ...state,
      userName,
      password,
      userName1,
      email,
      password1,
      cPassword,
    });
  };

  const validateLoginFields = () => {
    let {userName, password} = state;
    if (!userName) {
      ToastMessage('Please enter username');
      return false;
    } else if (!password) {
      ToastMessage('Please enter Password');
      return false;
    } else return true;
  };

  const validateSignupFields = () => {
    let {userName1, password1, cPassword, email, phonenumber} = state;
    if (!userName1) {
      ToastMessage('Please enter username');
      return false;
    } else if (!password1) {
      ToastMessage('Please enter Password');
      return false;
    } else if (!cPassword) {
      ToastMessage('Please enter Confirm Password');
      return false;
    } else if (cPassword !== password1) {
      ToastMessage('Confirm password not matched');
      return false;
    } else if (!email) {
      ToastMessage('Please enter Email');
      return false;
    } else if (!phonenumber) {
      ToastMessage('Please enter Mobile number');
      return false;
    } else return true;
  };

  const login = () => {
    let {
      userName,
      password,
      activeTab,
      phonenumber,
      userName1,
      password1,
      email,
    } = state;
    if (activeTab === 'login') {
      if (validateLoginFields()) {
        let data = {
          user_name: userName,
          password: password,
        };
        dispatch(loginAction.doLogin(data));
        dispatch(loadingAction.commaonLoader(true));
      }
    } else {
      if (validateSignupFields()) {
        sentOtpData();
      }
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
            marginTop: -200,
          }}>
          <View style={{width: '90%'}}>
            <View>
              <Text style={{color: 'white', fontSize: 30}}>Hello!</Text>
            </View>
            <View style={styles.mainContainer}>
              <View style={styles.headingContainer}>
                <TouchableOpacity
                  style={[
                    styles.headeingTextContainer,
                    state.activeTab === 'login'
                      ? {borderBottomWidth: 1}
                      : {borderBottomWidth: 0},
                  ]}
                  onPress={() => setState({...state, activeTab: 'login'})}>
                  <Text
                    style={[
                      styles.headeingText,
                      state.activeTab === 'login'
                        ? {color: AllColor.orange}
                        : {color: 'black'},
                    ]}>
                    Login
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.headeingTextContainer,
                    state.activeTab === 'signup'
                      ? {borderBottomWidth: 1}
                      : {borderBottomWidth: 0},
                  ]}
                  onPress={() => setState({...state, activeTab: 'signup'})}>
                  <Text
                    style={[
                      styles.headeingText,
                      state.activeTab === 'signup'
                        ? {color: AllColor.orange}
                        : {color: 'black'},
                    ]}>
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>

              {state.activeTab === 'login' ? (
                <View style={{marginVertical: 20}}>
                  <View style={styles.rowContainer}>
                    <View style={styles.rowIconContainer}>
                      <Icon name="user" size={25} color={AllColor.blue} />
                    </View>
                    <View style={styles.textInputContainer}>
                      <TextInput
                        style={styles.textInput}
                        placeholder="username"
                        onChangeText={(e) => onChange('userName', e)}
                        value={state.userName}
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
                        placeholder="Enter Password"
                        onChangeText={(e) => onChange('password', e)}
                        value={state.password}
                        secureTextEntry
                      />
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View style={{width: '50%'}}>
                      <CheckBox
                        style={{padding: 10, borderRadius: 20}}
                        onClick={() => {
                          setState({...state, isChecked: !state.isChecked});
                        }}
                        isChecked={state.isChecked}
                        rightText={'Remember'}
                        checkBoxColor={AllColor.purple}
                        uncheckedCheckBoxColor={AllColor.purple}
                        rightTextStyle={{color: AllColor.purple}}
                      />
                    </View>
                    <View style={{width: '50%', alignItems: 'flex-end'}}>
                      <Text style={{color: AllColor.purple}}>
                        Forgot Password ?
                      </Text>
                    </View>
                  </View>
                </View>
              ) : (
                <View style={{marginTop: 20}}>
                  <View style={styles.rowContainer}>
                    <View style={styles.rowIconContainer}>
                      <Icon name="user" size={25} color={AllColor.blue} />
                    </View>
                    <View style={styles.textInputContainer}>
                      <TextInput
                        style={styles.textInput}
                        placeholder="username"
                        onChangeText={(e) => onChange('userName1', e)}
                        value={state.userName1}
                      />
                    </View>
                  </View>
                  <View style={styles.rowContainer}>
                    <View style={styles.rowIconContainer}>
                      <Icon name="mail" size={25} color={AllColor.blue} />
                    </View>
                    <View style={styles.textInputContainer}>
                      <TextInput
                        style={styles.textInput}
                        placeholder="Email Address"
                        onChangeText={(e) => onChange('email', e)}
                        value={state.email}
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

                  <View
                    style={{
                      backgroundColor: '#e2e2e2',
                      paddingVertical: 10,
                      borderRadius: 6,
                      paddingHorizontal: 3,
                      marginVertical: 20,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View>
                        <Text style={{color: AllColor.blue}}>Phone Number</Text>
                      </View>
                      {/* <TouchableOpacity
                        style={{
                          backgroundColor: '#3A86FF',
                          borderRadius: 15,
                          padding: 5,
                        }}
                        onPress={sentOtpData}>
                        <Text style={{color: 'white'}}>Verify</Text>
                      </TouchableOpacity> */}
                    </View>
                    <View style={{}}>
                      <PhoneInput
                        placeholder={'Enter Mobile Number'}
                        defaultCode="IN"
                        containerStyle={{
                          backgroundColor: '#e2e2e2',
                          borderBottomWidth: 1,
                          height: 50,
                          width: '98%',
                        }}
                        textContainerStyle={{
                          backgroundColor: '#e2e2e2',
                          borderLeftWidth: 1,
                        }}
                        layout="second"
                        // disableArrowIcon={true}
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
                  </View>

                  <View>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                      Terms and Conditions
                    </Text>
                    <Text
                      style={{
                        color: AllColor.grey,
                        fontSize: 12,
                        paddingTop: 10,
                      }}>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged. I
                    </Text>
                  </View>

                  <View
                    style={{
                      alignItems: 'center',
                      paddingVertical: '5%',
                    }}>
                    <View>
                      <Text
                        style={{
                          color: AllColor.grey,
                          textTransform: 'capitalize',
                          textAlign: 'center',
                        }}>
                        By pressing "Submit" you agree to our teram and
                        condition
                      </Text>
                    </View>
                  </View>
                </View>
              )}
              <View style={{marginBottom: -50, alignItems: 'center'}}>
                <ProceedButton
                  routeScreenName={'LoanApplicationForm'}
                  completeSteps={1}
                  onPress={login}
                  {...props}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <View style={styles.line} />
              <View style={{width: '20%', alignItems: 'center'}}>
                <Text style={{color: 'grey'}}>or</Text>
              </View>
              <View style={styles.line} />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginVertical: 20,
              }}>
              <TouchableOpacity
                style={[styles.socialBtn, {backgroundColor: AllColor.red}]}>
                <Text style={styles.socialText}>Gmail</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.socialBtn, {backgroundColor: AllColor.blue}]}>
                <Text style={styles.socialText}>Facebook</Text>
              </TouchableOpacity>
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
      {isLoading ? <Loader /> : null}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  headeingTextContainer: {
    alignItems: 'center',
    borderBottomColor: 'red',
    paddingBottom: 5,
  },
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
  line: {
    width: '40%',
    borderWidth: 1,
    height: 1,
    borderColor: '#e2e2e2',
  },
  socialBtn: {
    width: '40%',
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: 10,
  },
  socialText: {
    color: 'white',
  },
});
