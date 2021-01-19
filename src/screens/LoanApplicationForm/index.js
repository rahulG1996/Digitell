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
const LoanApplicationForm = (props) => {
  const [isDatePickerVisibleone, setDatePickerVisibilityone] = useState(false);
  const [state, setState] = useState({
    dateone: 'Select DOB',
    leaveSelected: '',
    stateSelected: 'Select Your State',
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
      {id: 'delhi', name: 'delhi'},
      {id: 'mumbai', name: 'mumbai'},
      {id: 'mumbai', name: 'mumbai'},
      {id: 'mumbai', name: 'mumbai'},
    ],
    cityType: [
      {value: 'x', label: 'x'},
      {value: 'y', label: 'y'},
    ],
  });

  const dispatch = useDispatch();

  const allStates = useSelector((state) => state.StateReducer.allStates);

  const allCities = useSelector((state) => state.StateReducer.allCities);

  useEffect(() => {
    dispatch(stateActions.getStates());
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
            <RegistrationPageIndicator number={2} completeSteps={1} />
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
                    <SearchableDropdown
                      onTextChange={(text) => console.warn(text, 'kkkkk')}
                      onItemSelect={(item, index) => {
                        handleState(item, index);
                      }}
                      textInputStyle={{
                        padding: 12,
                        borderBottomWidth: 0.7,
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
                    <PhoneInput
                      placeholder={'Enter Mobile Number'}
                      defaultCode="IN"
                      containerStyle={{
                        backgroundColor: 'white',
                        borderBottomWidth: 1,
                        height: 50,
                      }}
                      textContainerStyle={{
                        backgroundColor: 'white',
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
                  <Text style={{textAlign: 'center', color: 'grey'}}>
                    Please press "Submit" button for next page
                  </Text>
                  <View style={{alignItems: 'center'}}>
                    <ProceedButton
                      {...props}
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
    width: '95%',
  },
  mandatoryText: {
    color: 'red',
  },
});
