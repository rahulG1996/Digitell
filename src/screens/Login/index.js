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
import Icon from 'react-native-vector-icons/Feather';
import CheckBox from 'react-native-check-box';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Background1 from '../../assets/images/background1.jpeg';
import Logo from '../../assets/images/logo.png';
import ProceedButton from '../../components/ProceedButton';
import RegistrationPageIndicator from '../../components/RegistrationPageIndicator';
import {AllColor} from '../../utils/allColors';
import PhoneInput from 'react-native-phone-number-input';

const Login = (props) => {
  const [state, setState] = useState({
    activeTab: 'login',
    isChecked: false,
    phonenumber: '',
  });

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
            <View>
              <RegistrationPageIndicator number={1} />
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
                      <TouchableOpacity
                        style={{
                          backgroundColor: '#3A86FF',
                          borderRadius: 15,
                          padding: 5,
                        }}>
                        <Text style={{color: 'white'}}>Verify</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{}}>
                      <PhoneInput
                        placeholder={'Enter Mobile Number'}
                        defaultCode="IN"
                        containerStyle={{
                          backgroundColor: '#e2e2e2',
                          borderBottomWidth: 1,
                          height: 50,
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
                        autoFocus
                      />
                    </View>
                  </View>

                  <View
                    style={{
                      alignItems: 'center',
                      paddingVertical: '5%',
                    }}>
                    <View>
                      <Text>By pressing "Submit" you agree to our </Text>
                    </View>

                    <View>
                      <Text
                        style={{
                          textDecorationLine: 'underline',
                          color: AllColor.orange,
                        }}>
                        term & condition
                      </Text>
                    </View>
                  </View>
                </View>
              )}
              <View style={{marginBottom: -95, alignItems: 'center'}}>
                <ProceedButton
                  routeScreenName={'LoanApplicationForm'}
                  completeSteps={1}
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
