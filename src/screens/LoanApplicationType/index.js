import React, {useEffect, useState, Fragment} from 'react';
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
import Icon from 'react-native-vector-icons/Ionicons';
import ProceedButton from '../../components/ProceedButton';
import moment, {duration} from 'moment';
import {AllColor} from '../../utils/allColors';
import {useDispatch, useSelector} from 'react-redux';

const LoanApplicationType = (props) => {
  const [state, setState] = useState({
    loanTypeData: [
      {icon: 'home', loanType: 'Car loan'},
      {icon: 'home', loanType: 'Home loan'},
      {icon: 'home', loanType: 'personal loan'},
      {icon: 'home', loanType: 'business loan'},
      {icon: 'home', loanType: 'Education loan'},
      {icon: 'home', loanType: 'Mortgages'},
    ],
  });
  return (
    <View style={Styles.container}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
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
            <Text style={styles.loanText}>Loan Applicatio Request</Text>
            {/* <RegistrationPageIndicator number={2} completeSteps={1} /> */}
          </View>
          <View style={styles.mainContainer}>
            <View style={{width: '90%'}}>
              <View style={styles.documentHeading}>
                <View>
                  <Image
                    source={require('../../assets/images/loanIcon.png')}
                    style={styles.documentIconStyle}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.documentTypeText}>
                  <Text>Select Loan Type</Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                }}>
                {state.loanTypeData.map((item) => {
                  return (
                    <TouchableOpacity
                      style={{
                        borderWidth: 0.5,
                        borderColor: AllColor.blue,
                        width: '31.5%',
                        alignItems: 'center',
                        borderRadius: 10,
                        shadowColor: '#000',
                        shadowOffset: {width: 0, height: 5},
                        shadowOpacity: 0.1,
                        shadowRadius: 2,
                        elevation: 5,
                        marginVertical: 5,
                        paddingVertical: 20,
                        backgroundColor: 'white',
                      }}>
                      <View>
                        <Icon
                          name={item.icon}
                          size={25}
                          color={AllColor.orange}
                        />
                      </View>
                      <View>
                        <Text
                          style={{
                            paddingTop: 10,
                            textTransform: 'uppercase',
                            fontSize: 10,
                          }}>
                          {item.loanType}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <View style={styles.documentHeading}>
                <View>
                  <Image
                    source={require('../../assets/images/loanIcon.png')}
                    style={styles.documentIconStyle}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.documentTypeText}>
                  <Text>Enter Loan Amount</Text>
                </View>
              </View>
              <View style={styles.uploadDocContainer}>
                <View style={[styles.input, {paddingBottom: 8}]}>
                  <TextInput
                    placeholder="Enter Here"
                    keyboardType="numeric"
                    // onChangeText={(e) => onChange(e, 'loanAmount')}
                    // value={state.loanAmount}
                  />
                </View>
              </View>

              <View style={{alignItems: 'center', marginTop: 20}}>
                <Text
                  style={{
                    textAlign: 'center',
                    paddingVertical: 10,
                    color: AllColor.grey,
                  }}>
                  Please press "Submit" button for Next Page
                </Text>
                <View>
                  <ProceedButton
                    routeScreenName={'RegistrationPayment'}
                    {...props}
                    onPress={() =>
                      props.navigation.navigate('LoanApplicationDocuments')
                    }
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default LoanApplicationType;

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
  },
  documentIconStyle: {
    width: 30,
    height: 30,
  },
  documentTypeText: {
    paddingLeft: 10,
  },
  documentHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
});
