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
import RegistrationPageIndicator from '../../components/RegistrationPageIndicator';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CommonDropdown from '../../components/CommonDropdown';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import ProceedButton from '../../components/ProceedButton';
import moment, {duration} from 'moment';
import {AllColor} from '../../utils/allColors';
import {useDispatch, useSelector} from 'react-redux';
import * as stateActions from '../../redux/actions/stateActions';
import SearchableDropdown from 'react-native-searchable-dropdown';
import PhoneInput from 'react-native-phone-number-input';
import {ToastMessage} from '../../components/ToastMessage';

const LoanApplicationForm = (props) => {
  const [isDatePickerVisibleone, setDatePickerVisibilityone] = useState(false);
  const [state, setState] = useState({
    dateone: 'Select DOB',
    leaveSelected: '',
    stateSelected: 'State',
    citySelected: 'City',
    phonenumber: '',
    cityId: '',
    stateId: '',
    leaveId: '',
    genderType: [
      {value: 'Male', label: 'Male'},
      {value: 'Female', label: 'Female'},
      {value: 'Transgender', label: 'Transgender'},
    ],
    gender: 'Male',
    stateType: [
      {id: 'delhi', name: 'delhi'},
      {id: 'mumbai', name: 'mumbai'},
      {id: 'mumbai', name: 'mumbai'},
      {id: 'mumbai', name: 'mumbai'},
    ],
    cityType: [{value: '', label: ''}],
    occupationType: [{label: '', value: ''}],
    occupationSelected: '',
    firstName: '',
    middleName: '',
    lastName: '',
    landMark: '',
    houseNo: '',
    pincode: '',
  });

  const dispatch = useDispatch();

  const allStates = useSelector((state) => state.StateReducer.allStates);

  const allCities = useSelector((state) => state.StateReducer.allCities);

  const allOccupation = useSelector(
    (state) => state.StateReducer.allOccupation,
  );

  useEffect(() => {
    dispatch(stateActions.getStates());
    dispatch(stateActions.getOccupation());
  }, []);

  useEffect(() => {
    let data = [];
    allStates &&
      allStates.district &&
      allStates.district.map((item) => {
        data.push({id: item.state_id, name: item.state_name});
      });
    setState({...state, stateType: data});
  }, [allStates]);

  useEffect(() => {
    let data = [];
    allCities &&
      allCities.district &&
      allCities.district.map((item) => {
        data.push({id: item.district_id, name: item.district_name});
      });
    setState({...state, cityType: data});
  }, [allCities]);

  useEffect(() => {
    let data = [];
    allOccupation &&
      allOccupation.result &&
      allOccupation.result.map((item) => {
        data.push({value: item.occupation_id, label: item.occupation_name});
      });
    setState({...state, occupationType: data});
  }, [allOccupation]);

  const hideDatePickerone = () => {
    setDatePickerVisibilityone(false);
  };
  const showDatePickerone = () => {
    setDatePickerVisibilityone(true);
  };

  const handleConfirmone = (date) => {
    var a = moment(date).format('MM/DD/YYYY');
    setState({...state, dateone: a});
    hideDatePickerone();
  };

  const handleGender = (value, index) => {
    if (index) {
      setState({
        ...state,
        gender: value,
      });
    }
  };

  const handleOccupation = (value, index) => {
    if (index) {
      setState({
        ...state,
        occupationSelected: value,
      });
    }
  };

  const handleState = (value, index) => {
    dispatch(stateActions.getCities(value.id));
    setState({
      ...state,
      stateSelected: value.name,
      stateId: value.id,
    });
  };

  const handleCity = (value, index) => {
    setState({
      ...state,
      citySelected: value.name,
      cityId: value.id,
    });
  };

  onChange = (value, type) => {
    let {firstName, lastName, middleName, houseNo, pincode, landMark} = state;

    if (type === 'firstName') {
      firstName = value.replace(/[^A-Za-z]/g, '');
    } else if (type === 'lastName') {
      lastName = value.replace(/[^A-Za-z]/g, '');
    } else if (type === 'middleName') {
      middleName = value.replace(/[^A-Za-z]/g, '');
    } else if (type === 'pincode') {
      pincode = value.replace(/[^0-9]/g, '');
    } else if (type === 'houseNo') {
      houseNo = value.replace(/[^0-9A-Za-z]/g, '');
    } else if (type === 'landMark') {
      landMark = value.replace(/[^0-9A-Za-z]/g, '');
    }

    setState({
      ...state,
      firstName,
      middleName,
      lastName,
      houseNo,
      pincode,
      landMark,
    });
  };

  const validateAllFields = () => {
    let {
      firstName,
      lastName,
      middleName,
      houseNo,
      pincode,
      landMark,
      gender,
      phonenumber,
      occupationSelected,
      citySelected,
      stateSelected,
      dateone,
    } = state;
    if (!firstName) {
      ToastMessage('Please enter First Name');
      return false;
    } else if (!lastName) {
      ToastMessage('Please enter Last Name');
      return false;
    } else if (dateone == 'Select DOB') {
      ToastMessage('Please select DOB');
      return false;
    } else if (!gender) {
      ToastMessage('Please choose state');
      return false;
    } else if (stateSelected == 'State') {
      ToastMessage('Please choose state');
      return false;
    } else if (citySelected == 'City') {
      ToastMessage('Please chooose city');
      return false;
    } else if (!houseNo) {
      ToastMessage('Please enter house no.');
      return false;
    } else if (!pincode) {
      ToastMessage('Please enter pincode');
      return false;
    } else if (!landMark) {
      ToastMessage('Please enter landmark');
      return false;
    } else if (!phonenumber) {
      ToastMessage('Please enter phone number');
      return false;
    } else if (phonenumber && phonenumber.slice(3).length < 10) {
      ToastMessage('Please enter valid phone number');
      return false;
    } else if (!occupationSelected) {
      ToastMessage('Please select your occupation');
      return false;
    } else return true;
  };

  const handlePersonalDataInfo = () => {
    let {
      firstName,
      lastName,
      middleName,
      houseNo,
      pincode,
      landMark,
      gender,
      phonenumber,
      occupationSelected,
      citySelected,
      stateSelected,
      dateone,
    } = state;
    if (validateAllFields()) {
      props.navigation.navigate('LoanApplicationType', {
        data: {
          firstName: firstName,
          middleName: middleName,
          lastName: lastName,
          dob: dateone,
          gender: gender,
          state: stateSelected,
          city: citySelected,
          pincode: pincode,
          house: houseNo,
          landMark: landMark,
          phonenumber: phonenumber,
          occupation: occupationSelected,
        },
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
            <View style={styles.subContainer}>
              <View
                style={[
                  styles.subsubContainer,
                  {justifyContent: 'space-between'},
                ]}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={require('../../assets/images/loanapplicant.png')}
                  />
                  <Text style={styles.textStyle}>Loan Applicant Name</Text>
                  <Text style={styles.mandatoryText}>*</Text>
                </View>

                <Image source={require('../../assets/images/i.png')} />
              </View>
              <View style={{marginTop: 5}}>
                <TextInput
                  style={styles.textInput}
                  placeholder="First Name"
                  onChangeText={(e) => onChange(e, 'firstName')}
                  value={state.firstName}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Middle Name"
                  onChangeText={(e) => onChange(e, 'middleName')}
                  value={state.middleName}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Last Name"
                  onChangeText={(e) => onChange(e, 'lastName')}
                  value={state.lastName}
                />
              </View>
              <View
                style={{
                  borderBottomColor: '#e2e2e2',
                  borderBottomWidth: 0.7,
                  padding: 5,
                }}>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                  <Image source={require('../../assets/images/dob.png')} />
                  <Text style={styles.textStyle}>Date of Birth</Text>
                  <Text style={styles.mandatoryText}>*</Text>
                </View>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                  onPress={showDatePickerone}>
                  <Text
                    onPress={showDatePickerone}
                    style={{color: 'grey', marginTop: 10}}>
                    {state.dateone}
                  </Text>
                  <View style={styles.iconView}>
                    <Icon name="arrow-down" color="orange" size={15} />
                  </View>
                </TouchableOpacity>

                <DateTimePickerModal
                  isVisible={isDatePickerVisibleone}
                  mode="date"
                  onConfirm={handleConfirmone}
                  onCancel={hideDatePickerone}
                  maximumDate={new Date()}
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
                        handleGender(value, index)
                      }
                      value={state.gender}
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
                    <SearchableDropdown
                      onTextChange={(text) => console.warn(text, 'kkkkk')}
                      onItemSelect={(item, index) => {
                        handleState(item, index);
                      }}
                      textInputStyle={{
                        padding: 12,
                        borderBottomWidth: 0.7,
                        borderBottomColor: '#e2e2e2',
                      }}
                      itemStyle={{
                        padding: 10,
                        zIndex: 2,
                        marginTop: 2,
                        backgroundColor: '#FAF9F8',
                        borderColor: '#bbb',
                        borderWidth: 1,
                        width: '100%',
                      }}
                      itemTextStyle={{
                        color: '#222',
                      }}
                      containerStyle={{width: '100%'}}
                      itemsContainerStyle={{
                        width: '100%',
                        maxHeight: '100%',
                      }}
                      multi={false}
                      items={state.stateType}
                      placeholderTextColor="black"
                      placeholder={state.stateSelected}
                      resetValue={false}
                      underlineColorAndroid="transparent"
                    />

                    <View style={styles.iconView}>
                      <Icon name="arrow-down" color="orange" size={15} />
                    </View>
                  </View>
                  <View style={styles.sectionView}>
                    <SearchableDropdown
                      onTextChange={(text) => console.warn(text, 'kkkkk')}
                      onItemSelect={(item, index) => {
                        handleCity(item, index);
                      }}
                      textInputStyle={{
                        padding: 12,
                        borderBottomWidth: 0.7,
                        width: '100%',
                        borderBottomColor: '#e2e2e2',
                      }}
                      itemStyle={{
                        padding: 10,
                        zIndex: 2,
                        marginTop: 2,
                        backgroundColor: '#FAF9F8',
                        borderColor: '#bbb',
                        borderWidth: 1,
                        width: '100%',
                      }}
                      itemTextStyle={{
                        color: '#222',
                      }}
                      containerStyle={{width: '100%'}}
                      itemsContainerStyle={{
                        width: '100%',
                        maxHeight: '100%',
                      }}
                      multi={false}
                      items={state.cityType}
                      placeholderTextColor="black"
                      placeholder={state.citySelected}
                      resetValue={false}
                      underlineColorAndroid="transparent"
                    />

                    <View style={styles.iconView}>
                      <Icon name="arrow-down" color="orange" size={15} />
                    </View>
                  </View>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Landmark"
                    onChangeText={(e) => onChange(e, 'landMark')}
                    value={state.landMark}
                  />
                  <TextInput
                    style={styles.textInput}
                    placeholder="House/Flat/Apartment no."
                    onChangeText={(e) => onChange(e, 'houseNo')}
                    value={state.houseNo}
                  />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Pincode"
                    onChangeText={(e) => onChange(e, 'pincode')}
                    value={state.pincode}
                    keyboardType="numeric"
                  />
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
                    <PhoneInput
                      placeholder={'Enter Mobile Number'}
                      defaultCode="IN"
                      containerStyle={{
                        backgroundColor: 'white',
                        borderBottomWidth: 1,
                        height: 50,
                        borderBottomColor: '#e2e2e2',
                      }}
                      textContainerStyle={{
                        backgroundColor: 'white',
                        borderLeftWidth: 1,
                        borderLeftColor: '#e2e2e2',
                      }}
                      layout="second"
                      textInputProps={{
                        maxLength: 10,
                        color: 'black',
                        height: 50,
                      }}
                      // disableArrowIcon={true}
                      onChangeFormattedText={(text) => {
                        setState({...state, phonenumber: text});
                      }}
                      // autoFocus
                    />
                  </View>

                  <View>
                    <View style={styles.subsubContainer}>
                      <Image
                        source={require('../../assets/images/gender.png')}
                      />
                      <Text style={styles.textStyle}>
                        Specify your Occupation
                      </Text>
                      <Text style={styles.mandatoryText}>*</Text>
                    </View>
                    <View style={styles.sectionView}>
                      <CommonDropdown
                        itemData={state.occupationType}
                        onValueChange={(value, index) =>
                          handleOccupation(value, index)
                        }
                        value={state.occupationSelected}
                        placeholderText={'Select'}
                      />
                      <View style={styles.iconView}>
                        <Icon name="arrow-down" color="orange" size={15} />
                      </View>
                    </View>
                  </View>

                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'grey',
                      paddingTop: 30,
                    }}>
                    Please press "Submit" button for next page
                  </Text>
                  <View style={{alignItems: 'center'}}>
                    <ProceedButton
                      {...props}
                      onPress={handlePersonalDataInfo}
                      routeScreenName="LoanApplicationDocuments"
                    />
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
    borderBottomColor: '#e2e2e2',
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
    width: '95%',
  },
  mandatoryText: {
    color: 'red',
  },
});
