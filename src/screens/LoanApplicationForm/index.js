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
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CommonDropdown from '../../components/CommonDropdown';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import ProceedButton from '../../components/ProceedButton';
import moment, {duration} from 'moment';

import {AllColor} from '../../utils/allColors';
import {ScrollView} from 'react-native-gesture-handler';

const LoanApplicationForm = (props) => {
  const [isDatePickerVisibleone, setDatePickerVisibilityone] = useState(false);
  const [state, setState] = useState({
    dateone: '',
    leaveSelected: '',
    stateSelected: '',
    citySelected: '',
    phonenumber: '',
    cityId: '',
    stateId: '',
    leaveId: '',
    genderType: [
      {value: 'Male', label: 'Male'},
      {value: 'Female', label: 'Female'},
    ],
    stateType: [
      {value: 'Delhi', label: 'Delhi'},
      {value: 'Mumbai', label: 'Mumbai'},
    ],
    cityType: [
      {value: 'x', label: 'x'},
      {value: 'y', label: 'y'},
    ],
  });
  const hideDatePickerone = () => {
    setDatePickerVisibilityone(false);
  };
  const showDatePickerone = () => {
    setDatePickerVisibilityone(true);
  };

  const handleConfirmone = (date) => {
    console.warn('A date has been picked: ', date);
    var a = moment(date).format('MM/DD/YYYY');
    setState({...state, dateone: a});
    hideDatePickerone();
  };
  const handleLeaves = (value, index) => {
    if (index) {
      setState({
        ...state,
        leaveSelected: value,
        leaveId: index,
      });
    }
  };
  const handleState = (value, index) => {
    if (index) {
      setState({
        ...state,
        stateSelected: value,
        stateId: index,
      });
    }
  };
  const handleCity = (value, index) => {
    if (index) {
      setState({
        ...state,
        citySelected: value,
        cityId: index,
      });
    }
  };
  return (
    <View style={Styles.container}>
      <KeyboardAwareScrollView>
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
            <RegistrationPageIndicator number={2} />
          </View>
          <View style={styles.mainContainer}>
            <View style={styles.subContainer}>
              <View style={[styles.subsubContainer,{justifyContent:'space-between'}]}>
                <View style={{flexDirection:'row'}}>
                <Image
                  source={require('../../assets/images/loanapplicant.png')}
                />
                <Text style={styles.textStyle}>Loan Applicant Name</Text>
                <Text style={styles.mandatoryText}>*</Text>
                </View>
                
                <Image
              
                  source={require('../../assets/images/i.png')}
                />
              
              </View>
              <View style={{marginTop: 5}}>
                <TextInput style={styles.textInput} placeholder="First Name" />
                <TextInput style={styles.textInput} placeholder="Middle Name" />
                <TextInput style={styles.textInput} placeholder="Last Name" />
              </View>
              <View
                style={{
                  borderBottomColor: 'grey',
                  borderBottomWidth: 0.7,
                  padding: 5,
                }}>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                  <Image source={require('../../assets/images/dob.png')} />
                  <Text style={styles.textStyle}>Date of Birth</Text>
                  <Text style={styles.mandatoryText}>*</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    onPress={showDatePickerone}
                    style={{color: 'grey', marginTop: 10}}>
                    dd-mm-yyyy
                  </Text>
                  <View style={styles.iconView}>
                    <Icon name="arrow-down" color="orange" size={15} />
                  </View>
                </View>

                <DateTimePickerModal
                  isVisible={isDatePickerVisibleone}
                  mode="date"
                  onConfirm={handleConfirmone}
                  onCancel={hideDatePickerone}
                  minimumDate={new Date()}
                />
              </View>
              <View>
                <View>
                  <View style={styles.subsubContainer}>
                    <Image source={require('../../assets/images/gender.png')} />
                    <Text style={styles.textStyle}>Specify your gender</Text>
                    <Text style={styles.mandatoryText}>*</Text>
                  </View>
                  <View style={styles.sectionView}>
                    <CommonDropdown
                      itemData={state.genderType}
                      onValueChange={(value, index) =>
                        handleLeaves(value, index)
                      }
                      value={state.leaveSelected}
                      placeholderText={
                        state.placeHolderData ? state.placeHolderData : 'Gender'
                      }
                    />
                    <View style={styles.iconView}>
                      <Icon name="arrow-down" color="orange" size={15} />
                    </View>
                  </View>
                </View>
              </View>
              <View>
                <View>
                  <View style={styles.subsubContainer}>
                    <Image
                      source={require('../../assets/images/address.png')}
                    />
                    <Text style={styles.textStyle}>Your Address</Text>
                    <Text style={styles.mandatoryText}>*</Text>
                  </View>
                  <View style={styles.sectionView}>
                    <CommonDropdown
                      itemData={state.stateType}
                      onValueChange={(value, index) =>
                        handleState(value, index)
                      }
                      value={state.stateSelected}
                      placeholderText={
                        state.placeHolderData ? state.placeHolderData : 'State'
                      }
                    />

                    <View style={styles.iconView}>
                      <Icon name="arrow-down" color="orange" size={15} />
                    </View>
                  </View>
                  <View style={styles.sectionView}>
                    <CommonDropdown
                      itemData={state.cityType}
                      onValueChange={(value, index) => handleCity(value, index)}
                      value={state.citySelected}
                      placeholderText={
                        state.placeHolderData ? state.placeHolderData : 'City'
                      }
                    />

                    <View style={styles.iconView}>
                      <Icon name="arrow-down" color="orange" size={15} />
                    </View>
                  </View>
                  <TextInput style={styles.textInput} placeholder="Landmark" />
                  <TextInput
                    style={styles.textInput}
                    placeholder="House/Flat/Apartment no."
                  />
                  <TextInput style={styles.textInput} placeholder="PIN" />
                  <View
                    style={{
                      paddingVertical: 10,

                      paddingHorizontal: 10,
                      marginVertical: 20,
                      backgroundColor: 'white',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View style={{flexDirection: 'row'}}>
                        <Image
                          source={require('../../assets/images/phone.png')}
                        />
                        <Text style={{marginLeft: 10}}>
                          Altenative Mobile number
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        paddingBottom: 5,
                        marginTop: 10,
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          width: '30%',
                          alignItems: 'center',
                          borderRightWidth: 1,
                        }}>
                        <Text>IND +91</Text>
                      </View>
                      <View style={{width: '70%'}}>
                        <TextInput
                          style={{paddingLeft: 10}}
                          placeholder="Enter Mobile Number"
                          keyboardType="numeric"
                        />
                      </View>
                    </View>
                  </View>
                  <Text style={{textAlign: 'center', color: 'grey'}}>
                    Please press "Submit" button for next page
                  </Text>
                  <View style={{alignItems: 'center'}}>
                    <ProceedButton {...props} />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default LoanApplicationForm;

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
  subContainer: {
    width: '90%',

    padding: 5,
  },
  mainContainer: {
    backgroundColor: 'white',
    width: '100%',
    marginVertical: 20,
    alignItems: 'center',
  },
  textInput: {
    borderBottomWidth: 0.7,
    borderBottomColor: 'grey',
    marginVertical: 10,
    paddingBottom: 10,
  },
  textStyle: {
    marginLeft: 10,
  },
  subsubContainer: {
    marginTop: 20,
    flexDirection: 'row',
  },
  iconView: {
    height: 45,
    justifyContent: 'center',
  },
  sectionView: {
    backgroundColor: 'white',
    flexDirection: 'row',
    width: '90%',
  },
  mandatoryText:{
    color:'red'
  }
  
});
