import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Image,
  Platform,
} from 'react-native';
import {Styles} from '../../utils/commonStyle';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Background1 from '../../assets/images/background1.jpeg';
import Logo from '../../assets/images/logo.png';
import RegistrationPageIndicator from '../../components/RegistrationPageIndicator';
import DocumentIcon from '../../assets/images/document.png';
import {AllColor} from '../../utils/allColors';
import DocumentPicker from 'react-native-document-picker';
import ProceedButton from '../../components/ProceedButton';
import {onChange} from 'react-native-reanimated';
import {ActionSheet} from 'react-native-cross-actionsheet';
import ImagePicker from 'react-native-image-crop-picker';
import {ToastMessage} from '../../components/ToastMessage';
import * as loanRequestAction from '../../redux/actions/loanRequestAction';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../components/loader';
import * as loadingAction from '../../redux/actions/loaderAction';
import * as paymentAction from '../../redux/actions/paymentAction';

const LoanApplicationDocuments = (props) => {
  const [state, setState] = useState({
    panNo: '',
    adharNo: '',
    loanAmount: '',
    userImage: '',
    showActionSheet: false,
    userImageResponse: '',
    panFrontData: '',
    panBackData: '',
    adharFrontData: '',
    adharBackData: '',
  });

  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.CommonLoaderReducer.isLoading);

  const saveLoanResponse = useSelector(
    (state) => state.SaveLoanRequestReducer.saveLoanResponse,
  );

  const customerId = useSelector((state) => state.LoginReducer.customerId);

  const paymentRequestResponse = useSelector(
    (state) => state.PaymentReducer.paymentRequestResponse,
  );

  useEffect(() => {
    if (saveLoanResponse && saveLoanResponse.status == 'success') {
      setTimeout(() => {
        ToastMessage(saveLoanResponse.result);
        if (props.route.params.comeFrom == 'Login') {
          let data = {
            amount: '100',
            currency: 'INR',
            name: 'vasu',
            email: 'vasu.mar0703@gmail.com',
            country_code: '91',
            national_number: '9891586442',
            return_url:
              'https://www.zettabron.com/digitell/index.php/api/payment_success',
          };
          dispatch(paymentAction.sentPaymentRequest(data));
        } else {
          props.navigation.navigate('Dashboard');
        }

        dispatch(loanRequestAction.emptyApplyLoanData());
      }, 400);
    }
  }, [saveLoanResponse]);

  useEffect(() => {
    if (Object.keys(paymentRequestResponse).length) {
      props.navigation.navigate('RegistrationPayment', {
        response: paymentRequestResponse.order,
      });
    }
  }, [paymentRequestResponse]);

  const onChange = (value, type) => {
    let {panNo, adharNo, loanAmount} = state;
    if (type === 'pan') {
      panNo = value.replace(/[^0-9A-Za-z]/g, '');
    } else if (type === 'adhar') {
      adharNo = value.replace(/[^0-9]/g, '');
      let formattedText = adharNo.split(' ').join('');
      if (formattedText.length > 0) {
        formattedText = formattedText
          .match(new RegExp('.{1,4}', 'g'))
          .join(' ');
      }
      adharNo = formattedText;
    } else {
      loanAmount = value.replace(/[^0-9]/g, '');
    }
    setState({...state, panNo, adharNo, loanAmount});
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

  const uploadDoc = async (type) => {
    let {panBackData, panFrontData, adharFrontData, adharBackData} = state;
    await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      if (type === 'panFront') {
        panFrontData = image;
      } else if (type === 'panBack') {
        panBackData = image;
      } else if (type === 'adharFront') {
        adharFrontData = image;
      } else {
        adharBackData = image;
      }
    });
    setState({
      ...state,
      panBackData,
      panFrontData,
      adharFrontData,
      adharBackData,
    });
  };

  const captureImageDoc = async (type) => {
    let {panBackData, panFrontData, adharFrontData, adharBackData} = state;
    await ImagePicker.openCamera({
      width: 300,
      height: 400,
    }).then((image) => {
      if (type === 'panFront') {
        panFrontData = image;
      } else if (type === 'panBack') {
        panBackData = image;
      } else if (type === 'adharFront') {
        adharFrontData = image;
      } else {
        adharBackData = image;
      }
    });
    setState({
      ...state,
      panBackData,
      panFrontData,
      adharFrontData,
      adharBackData,
    });
  };

  const validatingFields = () => {
    let {
      panNo,
      adharNo,
      panFrontData,
      panBackData,
      adharFrontData,
      adharBackData,
      userImageResponse,
    } = state;
    if (!panNo) {
      ToastMessage('Please enter Pan Number');
      return false;
    } else if (panNo.length < 10) {
      ToastMessage('Please enter valid Pan Number');
      return false;
    } else if (!adharNo) {
      ToastMessage('Please enter Adhaar Number');
      return false;
    } else if (adharNo.length < 10) {
      ToastMessage('Please enter valid Adhaar Number');
      return false;
    } else if (!panFrontData) {
      ToastMessage('Please upload front pan ');
      return false;
    } else if (!panBackData) {
      ToastMessage('Please upload back pan ');
      return false;
    } else if (!adharFrontData) {
      ToastMessage('Please upload front adhaar');
      return false;
    } else if (!adharBackData) {
      ToastMessage('Please upload back adhaar ');
      return false;
    } else if (!userImageResponse) {
      ToastMessage('Please upload your photo');
      return false;
    } else return true;
  };

  const submitLoanRequest = () => {
    let {
      panNo,
      adharNo,
      panFrontData,
      panBackData,
      adharFrontData,
      adharBackData,
      userImageResponse,
    } = state;
    let data = props.route.params.data;
    if (validatingFields()) {
      let loanData = {
        ref_customer_id: customerId,
        first_name: data.firstName,
        middle_name: data.middleName,
        last_name: data.lastName,
        gender: data.gender,
        dob: data.dob,
        address_line_1: data.houseNo,
        address_line_2: data.landMark,
        pincode: data.pincode,
        state_id: data.state,
        city_id: data.city,
        ref_loan_type_id: data.selectedLoanId,
        loan_amount: data.loanAmount,
        ref_occupation_id: data.occupation,
        pan_no: panNo,
        aadhar_no: adharNo.split(' ').join(''),
        pan_front_file: fileResponse(panFrontData),
        pan_back_file: fileResponse(panBackData),
        aadhar_front_file: fileResponse(adharFrontData),
        aadhar_back_file: fileResponse(adharBackData),
        customer_image: fileResponse(userImageResponse),
      };
      console.warn(JSON.stringify(loanData, undefined, 2));
      dispatch(loanRequestAction.applyLoan(loanData));
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
                    source={DocumentIcon}
                    style={styles.documentIconStyle}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.documentTypeText}>
                  <Text>Enter Your Pan Card Number</Text>
                </View>
              </View>
              <View style={styles.uploadDocContainer}>
                <View style={styles.input}>
                  <TextInput
                    placeholder="Enter Here"
                    onChangeText={(e) => onChange(e, 'pan')}
                    value={state.panNo}
                    maxLength={10}
                  />
                </View>
              </View>

              <View style={styles.documentHeading}>
                <Text>Upload Front Portion ( PAN )</Text>
              </View>

              {state.panFrontData ? (
                <View style={styles.uploadedDocument}>
                  <Image
                    source={{uri: state.panFrontData.path}}
                    style={styles.uploadedDocumentStyle}
                    resizeMode="cover"
                  />
                </View>
              ) : null}

              <View style={styles.uploadContainer}>
                <TouchableOpacity
                  style={styles.uploadBtn}
                  onPress={() => uploadDoc('panFront')}>
                  <View>
                    <Image
                      source={require('../../assets/images/upload.png')}
                      style={styles.uploadIcon}
                      resizeMode="contain"
                    />
                  </View>
                  <View>
                    <Text style={{color: AllColor.grey, fontSize: 9}}>
                      Upload from Gallery
                    </Text>
                  </View>
                </TouchableOpacity>
                <Text>or</Text>
                <TouchableOpacity
                  style={styles.uploadBtn}
                  onPress={() => captureImageDoc('panFront')}>
                  <View>
                    <Image
                      source={require('../../assets/images/camera.png')}
                      style={styles.uploadIcon}
                      resizeMode="contain"
                    />
                  </View>
                  <View>
                    <Text style={{color: AllColor.grey, fontSize: 9}}>
                      Capture Document
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.documentHeading}>
                <Text>Upload Back Portion ( PAN )</Text>
              </View>

              {state.panBackData ? (
                <View style={styles.uploadedDocument}>
                  <Image
                    source={{uri: state.panBackData.path}}
                    style={styles.uploadedDocumentStyle}
                    resizeMode="cover"
                  />
                </View>
              ) : null}

              <View style={styles.uploadContainer}>
                <TouchableOpacity
                  style={styles.uploadBtn}
                  onPress={() => uploadDoc('panBack')}>
                  <View>
                    <Image
                      source={require('../../assets/images/upload.png')}
                      style={styles.uploadIcon}
                      resizeMode="contain"
                    />
                  </View>
                  <View>
                    <Text style={{color: AllColor.grey, fontSize: 9}}>
                      Upload from Gallery
                    </Text>
                  </View>
                </TouchableOpacity>
                <Text>or</Text>
                <TouchableOpacity
                  style={styles.uploadBtn}
                  onPress={() => captureImageDoc('panBack')}>
                  <View>
                    <Image
                      source={require('../../assets/images/camera.png')}
                      style={styles.uploadIcon}
                      resizeMode="contain"
                    />
                  </View>
                  <View>
                    <Text style={{color: AllColor.grey, fontSize: 9}}>
                      Capture Document
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.documentHeading}>
                <View>
                  <Image
                    source={DocumentIcon}
                    style={styles.documentIconStyle}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.documentTypeText}>
                  <Text>Enter Your Adhar Card Number</Text>
                </View>
              </View>
              <View style={styles.uploadDocContainer}>
                <View style={styles.input}>
                  <TextInput
                    placeholder="Enter Here"
                    onChangeText={(e) => onChange(e, 'adhar')}
                    value={state.adharNo}
                    keyboardType="numeric"
                    maxLength={14}
                  />
                </View>
              </View>

              <View style={styles.documentHeading}>
                <Text>Upload Front Portion ( ADHAAR )</Text>
              </View>

              {state.adharFrontData ? (
                <View style={styles.uploadedDocument}>
                  <Image
                    source={{uri: state.adharFrontData.path}}
                    style={styles.uploadedDocumentStyle}
                    resizeMode="cover"
                  />
                </View>
              ) : null}

              <View style={styles.uploadContainer}>
                <TouchableOpacity
                  style={styles.uploadBtn}
                  onPress={() => uploadDoc('adharFront')}>
                  <View>
                    <Image
                      source={require('../../assets/images/upload.png')}
                      style={styles.uploadIcon}
                      resizeMode="contain"
                    />
                  </View>
                  <View>
                    <Text style={{color: AllColor.grey, fontSize: 9}}>
                      Upload from Gallery
                    </Text>
                  </View>
                </TouchableOpacity>
                <Text>or</Text>
                <TouchableOpacity
                  style={styles.uploadBtn}
                  onPress={() => captureImageDoc('adharFront')}>
                  <View>
                    <Image
                      source={require('../../assets/images/camera.png')}
                      style={styles.uploadIcon}
                      resizeMode="contain"
                    />
                  </View>
                  <View>
                    <Text style={{color: AllColor.grey, fontSize: 9}}>
                      Capture Document
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.documentHeading}>
                <Text>Upload Back Portion ( ADHAAR )</Text>
              </View>

              {state.adharBackData ? (
                <View style={styles.uploadedDocument}>
                  <Image
                    source={{uri: state.adharBackData.path}}
                    style={styles.uploadedDocumentStyle}
                    resizeMode="cover"
                  />
                </View>
              ) : null}

              <View style={styles.uploadContainer}>
                <TouchableOpacity
                  style={styles.uploadBtn}
                  onPress={() => uploadDoc('adharBack')}>
                  <View>
                    <Image
                      source={require('../../assets/images/upload.png')}
                      style={styles.uploadIcon}
                      resizeMode="contain"
                    />
                  </View>
                  <View>
                    <Text style={{color: AllColor.grey, fontSize: 9}}>
                      Upload from Gallery
                    </Text>
                  </View>
                </TouchableOpacity>
                <Text>or</Text>
                <TouchableOpacity
                  style={styles.uploadBtn}
                  onPress={() => captureImageDoc('adharback')}>
                  <View>
                    <Image
                      source={require('../../assets/images/camera.png')}
                      style={styles.uploadIcon}
                      resizeMode="contain"
                    />
                  </View>
                  <View>
                    <Text style={{color: AllColor.grey, fontSize: 9}}>
                      Capture Document
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={{alignItems: 'center'}}>
                {state.userImageResponse ? (
                  <View style={styles.uploadedDocument}>
                    <Image
                      source={{uri: state.userImageResponse.path}}
                      style={styles.uploadedDocumentStyle}
                      resizeMode="cover"
                    />
                  </View>
                ) : null}
                <TouchableOpacity
                  style={[styles.uploadBtn, {width: '100%'}]}
                  onPress={() => setState({...state, showActionSheet: true})}>
                  <View style={{width: '20%', alignItems: 'center'}}>
                    <Image
                      source={require('../../assets/images/camera.png')}
                      style={{width: 35, height: 35}}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={{width: '80%'}}>
                    <Text style={{color: AllColor.grey}}>Upload Selfie</Text>
                    <Text style={{color: AllColor.orange}}>
                      Please use white background
                    </Text>
                  </View>
                </TouchableOpacity>
                {props.route.params &&
                props.route.params.comeFrom == 'Login' ? (
                  <View>
                    <Text style={{color: AllColor.orange}}>
                      Proceed to pay the registration charge
                    </Text>
                    <Text
                      style={{
                        color: AllColor.blue,
                        fontSize: 22,
                        paddingVertical: 5,
                      }}>
                      "RS. 100"
                    </Text>
                    <Text
                      style={{
                        textAlign: 'center',
                        paddingVertical: 10,
                        color: AllColor.grey,
                      }}>
                      Please press "Submit" button to proceed the payment
                    </Text>
                  </View>
                ) : (
                  <Text
                    style={{
                      textAlign: 'center',
                      paddingVertical: 10,
                      color: AllColor.grey,
                    }}>
                    Please press "Submit" button to Submit loan request
                  </Text>
                )}
                <View>
                  <ProceedButton
                    routeScreenName={'RegistrationPayment'}
                    {...props}
                    onPress={submitLoanRequest}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
      {state.showActionSheet ? <ShowSheet handleImage={handleImage} /> : null}
      {isLoading ? <Loader /> : null}
    </View>
  );
};

export default LoanApplicationDocuments;

const ShowSheet = (props) => {
  ActionSheet.options({
    options: [
      {
        text: 'Select from gallary',
        onPress: () => props.handleImage('gallary'),
      },
      {text: 'Open camera', onPress: () => props.handleImage('camera')},
    ],
    cancel: {onPress: () => console.log('cancel')},
  });

  return null;
};

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
  uploadDocContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#e2e2e2',
    paddingBottom: 8,
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  uploadBtn: {
    width: '40%',
    borderWidth: 1,
    borderStyle: 'dashed',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#3A86FF40',
    paddingVertical: 5,
    marginBottom: 8,
    borderColor: AllColor.blue,
    borderRadius: 6,
    paddingVertical: 15,
    marginVertical: 20,
  },
  uploadContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    width: '60%',
  },
  uploadIcon: {
    width: 18,
    height: 18,
  },
  uploadedDocument: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 20,
  },
  uploadedDocumentStyle: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
});
