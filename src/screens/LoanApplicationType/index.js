import React, {useEffect, useState, Fragment} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Image,
  ActivityIndicator,
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
import HomeLoanIcon from '../../assets/images/homeLoan.png';
import EducationLoan from '../../assets/images/educationLoan.png';
import PersonalLoan from '../../assets/images/personalLoan.png';
import BusimessLoan from '../../assets/images/businessLoan.png';
import Mortgages from '../../assets/images/mortgages.png';
import CarLoan from '../../assets/images/carLoan.png';
import {ToastMessage} from '../../components/ToastMessage';
import * as stateActions from '../../redux/actions/stateActions';

const LoanApplicationType = (props) => {
  const [state, setState] = useState({
    loanTypeData: [],
    loanAmount: '',
  });

  const dispatch = useDispatch();

  const allLoanTypes = useSelector((state) => state.StateReducer.allLoanTypes);

  useEffect(() => {
    // console.warn('props', props.route.params);
    dispatch(stateActions.getLoantypes());
  }, []);

  useEffect(() => {
    if (allLoanTypes && allLoanTypes.result.length) {
      setState({...state, loanTypeData: allLoanTypes.result});
    }
  }, [allLoanTypes]);

  const handleLoanType = () => {
    let {selectedLoanId, loanAmount} = state;
    let data = props.route.params.data;
    if (!loanAmount) {
      ToastMessage('Please enter loan amount');
    } else if (!selectedLoanId) {
      ToastMessage('Please select loan type');
    } else {
      data.loanAmount = loanAmount;
      data.selectedLoanId = selectedLoanId;
      props.navigation.navigate('LoanApplicationDocuments', {
        data: data,
      });
    }
  };

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
            <Text style={styles.loanText}>Loan Application Request</Text>
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
                {state.loanTypeData.length ? (
                  state.loanTypeData.map((item) => {
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
                          backgroundColor:
                            state.selectedLoanId == item.loan_type_id
                              ? AllColor.orange
                              : 'white',
                        }}
                        key={item.loan_type_id}
                        onPress={() =>
                          setState({
                            ...state,
                            selectedLoanId: item.loan_type_id,
                          })
                        }>
                        <View>
                          <Image
                            source={{uri: item.loan_type_image}}
                            style={{width: 25, height: 25}}
                            tintColor={
                              state.selectedLoanId == item.loan_type_id
                                ? 'white'
                                : AllColor.orange
                            }
                          />
                        </View>
                        <View>
                          <Text
                            style={{
                              paddingTop: 10,
                              textTransform: 'uppercase',
                              fontSize: 10,
                              color:
                                state.selectedLoanId == item.loan_type_id
                                  ? 'white'
                                  : 'black',
                            }}>
                            {item.loan_type_name}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })
                ) : (
                  <View style={{alignItems: 'center', width: '100%'}}>
                    <ActivityIndicator color={AllColor.orange} />
                  </View>
                )}
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
                <View
                  style={{
                    paddingBottom: 8,
                    borderBottomWidth: 1,
                    borderBottomColor: '#e2e2e2',
                  }}>
                  <TextInput
                    placeholder="Enter Here"
                    keyboardType="numeric"
                    onChangeText={(e) =>
                      setState({...state, loanAmount: e.replace(/[^0-9]/g, '')})
                    }
                    value={state.loanAmount}
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
                    onPress={handleLoanType}
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
