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
import {useSelector, useDispatch} from 'react-redux';
import * as profileAction from '../../redux/actions/profileAction';
import {ToastMessage} from '../../components/ToastMessage';
import * as loadingAction from '../../redux/actions/loaderAction';
import Loader from '../../components/loader';
import {imageUrl} from '../../services/apiServices';
import {ActionSheet} from 'react-native-cross-actionsheet';
import ImagePicker from 'react-native-image-crop-picker';

const UpdateProfile = (props) => {
  const [state, setState] = useState({
    phonenumber: '',
    dateone: '',
    editable: false,
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    showActionSheet: false,
    userImageResponse: {},
  });

  const dispatch = useDispatch();

  const [isDatePickerVisibleone, setDatePickerVisibilityone] = useState(false);

  const isLoading = useSelector((state) => state.CommonLoaderReducer.isLoading);

  const profileData = useSelector((state) => state.ProfileReducer.profileData);

  const customerId = useSelector((state) => state.LoginReducer.customerId);

  const updateProfileResponse = useSelector(
    (state) => state.ProfileReducer.updateProfileResponse,
  );

  useEffect(() => {
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
        userProfileImage: data.customer_image,
      });
    }
  }, [profileData]);

  useEffect(() => {
    if (updateProfileResponse && updateProfileResponse.status == 'success') {
      setTimeout(() => {
        ToastMessage('Your Profile has been Updated');
      }, 300);
      dispatch(profileAction.getProfile(customerId));
      setState({...state, editable: false});
      dispatch(profileAction.emptyUpdateProfileData());
    }
  }, [updateProfileResponse]);

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

  const handleImage = (type) => {
    if (type === 'gallary') {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      }).then((image) => {
        // console.warn(image);
        setState({...state, userImageResponse: image, showActionSheet: false});
      });
    } else {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      }).then((image) => {
        // console.warn(image);
        setState({...state, userImageResponse: image, showActionSheet: false});
      });
    }
  };

  const onChange = (value, type) => {
    let {firstName, lastName, middleName, email} = state;

    if (type === 'firstName') {
      firstName = value.replace(/[^A-Za-z]/g, '');
    } else if (type === 'lastName') {
      lastName = value.replace(/[^A-Za-z]/g, '');
    } else if (type === 'middleName') {
      middleName = value.replace(/[^A-Za-z]/g, '');
    } else if (type === 'email') {
      email = value;
    }

    setState({
      ...state,
      firstName,
      lastName,
      middleName,
      email,
    });
  };

  const validateFields = () => {
    let {firstName, lastName, middleName, email, dateone, phonenumber} = state;
    let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!firstName) {
      ToastMessage('Please enter first name');
      return false;
    } else if (!lastName) {
      ToastMessage('Please enter last name');
      return false;
    } else if (!email) {
      ToastMessage('Please enter email');
      return false;
    } else if (email && !pattern.test(email)) {
      ToastMessage('Please enter valid Email');
      return false;
    } else if (!dateone) {
      ToastMessage('Please enter date of birth');
      return false;
    } else if (!phonenumber) {
      ToastMessage('Please enter Mobile number');
      return false;
    } else if (phonenumber && phonenumber.length < 10) {
      ToastMessage('Please enter valid Mobile number');
      return false;
    } else return true;
  };

  const updateProfileData = () => {
    let {
      firstName,
      lastName,
      middleName,
      email,
      dateone,
      phonenumber,
      userImageResponse,
    } = state;
    if (validateFields()) {
      let data = {
        email: email,
        mobile: phonenumber,
        customer_id: customerId,
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        dob: dateone,
      };
      if (Object.keys(userImageResponse).length) {
        data.customer_image = fileResponse(userImageResponse);
      }
      dispatch(profileAction.updateData(data));
      dispatch(loadingAction.commaonLoader(true));
    }
  };

  const fileResponse = (data) => {
    let fileResponseData = {
      uri: Platform.OS == 'ios' ? `file:///${data.path}` : data.path,
      type: data.mime,
      name: data.path.split('/')[data.path.split('/').length - 1],
    };
    return fileResponseData;
  };

  const cancelActionSheet = () => {
    setState({...state, showActionSheet: false});
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
              {Object.keys(state.userImageResponse).length ? (
                <Image
                  source={{uri: state.userImageResponse.path}}
                  style={{width: 130, height: 130, borderRadius: 10}}
                />
              ) : state.userProfileImage ? (
                <Image
                  source={{uri: imageUrl + state.userProfileImage}}
                  style={{width: 130, height: 130, borderRadius: 10}}
                />
              ) : (
                <Image source={UserImage} style={{width: 130, height: 130}} />
              )}

              <TouchableOpacity
                style={styles.updateImageTextContainer}
                onPress={() => setState({...state, showActionSheet: true})}>
                <Text style={styles.updateImageText}>Change profile</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.updateImageTextContainer}
                onPress={() => setState({...state, editable: true})}>
                <Text style={styles.updateImageText}>Edit Data</Text>
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
                  onChangeText={(e) => onChange(e, 'firstName')}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Middle Name"
                  editable={state.editable}
                  value={state.middleName}
                  onChangeText={(e) => onChange(e, 'middleName')}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Last Name"
                  editable={state.editable}
                  value={state.lastName}
                  onChangeText={(e) => onChange(e, 'lastName')}
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
                  onChangeText={(e) => onChange(e, 'email')}
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
                  setState({...state, phonenumber: text.slice(3)});
                }}
                textInputProps={{
                  value: state.phonenumber,
                  maxLength: 10,
                  editable: state.editable,
                }}
                // value={state.phonenumber}
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
                <ProceedButton {...props} onPress={updateProfileData} />
              </View>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAwareScrollView>

      {isLoading ? <Loader /> : null}
      {state.showActionSheet ? (
        <ShowSheet
          handleImage={handleImage}
          cancelActionSheet={cancelActionSheet}
        />
      ) : null}

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

const ShowSheet = (props) => {
  ActionSheet.options({
    options: [
      {
        text: 'Select from gallary',
        onPress: () => props.handleImage('gallary'),
      },
      {text: 'Open camera', onPress: () => props.handleImage('camera')},
    ],
    cancel: {onPress: () => props.cancelActionSheet()},
  });

  return null;
};

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
