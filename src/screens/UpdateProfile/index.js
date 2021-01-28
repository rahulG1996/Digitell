import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Header from '../../components/Header';
import {Styles} from '../../utils/commonStyle';
import {AllColor} from '../../utils/allColors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import UserImage from '../../assets/images/user.png';
import PhoneInput from 'react-native-phone-number-input';
import ProceedButton from '../../components/ProceedButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import BackgroundImage from '../../assets/images/background2.png';
import {useSelector} from 'react-redux';

const UpdateProfile = (props) => {
  const [state, setState] = useState({
    phonenumber: '',
    dateone: '12-12-2020',
    editable: false,
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
  });
  const [isDatePickerVisibleone, setDatePickerVisibilityone] = useState(false);

  const profileData = useSelector((state) => state.ProfileReducer.profileData);

  useEffect(() => {
    console.warn('profileData', profileData);
    if (profileData && profileData.status == 'success') {
      let data = profileData.result[0];
      setState({
        ...state,
        firstName: data.customer_name,
        middleName: data.middle_name,
        lastName: data.last_name,
        email: data.email,
        dateone: data.dob,
        phonenumber: data.mobile,
      });
    }
  }, [profileData]);

  const hideDatePickerone = () => {
    setDatePickerVisibilityone(false);
  };
  const showDatePickerone = () => {
    setDatePickerVisibilityone(true);
  };

  const handleConfirmone = (date) => {
    var a = moment(date).format('YYYY--MM-DD');
    setState({...state, dateone: a});
    hideDatePickerone();
  };

  return (
    <View style={Styles.container}>
      <View>
        <Header back={true} {...props} title="Edit Your Profile" />
      </View>

      <KeyboardAwareScrollView>
        <ImageBackground
          style={styles.imageBackStyle}
          resizeMode="stretch"
          source={BackgroundImage}>
          <View style={{paddingHorizontal: 20, alignItems: 'center'}}>
            <View style={{zIndex: 1}}>
              <Image source={UserImage} style={{width: 130, height: 130}} />
              <TouchableOpacity style={styles.updateImageTextContainer}>
                <Text style={styles.updateImageText}>Change profile</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.boxShadow}>
              <View>
                <Text style={{color: AllColor.blue}}>Personal Details</Text>
              </View>
              <View style={{marginTop: 5}}>
                <TextInput
                  style={styles.textInput}
                  placeholder="First Name"
                  editable={state.editable}
                  value={state.firstName}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Middle Name"
                  editable={state.editable}
                  value={state.middleName}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Last Name"
                  editable={state.editable}
                  value={state.lastName}
                />
              </View>
              <View>
                <Text style={{color: AllColor.blue}}>Email Address</Text>
              </View>
              <View style={{marginTop: 5}}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Email"
                  editable={state.editable}
                  value={state.email}
                />
              </View>
              <View>
                <Text style={{color: AllColor.blue}}>Phone Number</Text>
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
              <View
                style={{
                  borderBottomColor: '#e2e2e2',
                  borderBottomWidth: 0.7,
                  padding: 10,
                }}>
                <View>
                  <Text style={{color: AllColor.blue}}>Date of Birth</Text>
                </View>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                  onPress={state.editable ? showDatePickerone : null}>
                  <Text
                    onPress={state.editable ? showDatePickerone : null}
                    style={{color: 'grey', marginTop: 10}}>
                    {state.dateone}
                  </Text>
                </TouchableOpacity>

                <DateTimePickerModal
                  isVisible={isDatePickerVisibleone}
                  mode="date"
                  onConfirm={handleConfirmone}
                  onCancel={hideDatePickerone}
                  maximumDate={new Date()}
                />
              </View>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'grey',
                  paddingTop: 30,
                }}>
                By pressing "Submit" to update the profile
              </Text>
              <View style={{alignItems: 'center'}}>
                <ProceedButton
                  {...props}
                  // onPress={() => props.navigation.navigate('LoanApplicationType')}
                  // routeScreenName="LoanApplicationDocuments"
                />
              </View>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAwareScrollView>

      <View
        style={{
          width: '100%',
          backgroundColor: '#ECECEC',
          alignItems: 'center',
          paddingVertical: 10,
          marginTop: 20,
        }}>
        <Text style={{fontSize: 10}}>
          Please update correct information on you profile
        </Text>
      </View>
    </View>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  textInput: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#e2e2e2',
    marginVertical: 10,
    paddingBottom: 10,
  },
  imageBackStyle: {
    width: '100%',
    height: '100%',
    paddingVertical: hp('2%'),
  },
  updateImageTextContainer: {
    backgroundColor: AllColor.blue,
    marginVertical: 10,
    paddingVertical: 5,
    borderRadius: 3,
  },
  updateImageText: {
    textTransform: 'uppercase',
    color: 'white',
    textAlign: 'center',
    fontSize: 10,
  },
  boxShadow: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
    paddingVertical: hp('13%'),
    marginVertical: 10,
    borderRadius: 20,
    width: '100%',
    paddingHorizontal: 20,
    marginTop: -85,
  },
});
