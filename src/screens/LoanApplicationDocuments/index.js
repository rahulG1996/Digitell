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
import DocumentIcon from '../../assets/images/document.png';
import {AllColor} from '../../utils/allColors';
import DocumentPicker from 'react-native-document-picker';
import ProceedButton from '../../components/ProceedButton';
import {onChange} from 'react-native-reanimated';
import {ActionSheet} from 'react-native-cross-actionsheet';
import ImagePicker from 'react-native-image-crop-picker';

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
  const openFiles = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size,
      );
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  const onChange = (value, type) => {
    let {panNo, adharNo, loanAmount} = state;
    if (type === 'pan') {
      panNo = value.replace(/[^0-9A-Za-z]/g, '');
    } else if (type === 'adhar') {
      adharNo = value.replace(/[^0-9]/g, '');
    } else {
      loanAmount = value.replace(/[^0-9]/g, '');
    }
    setState({...state, panNo, adharNo, loanAmount});
  };

  const handleImage = (type) => {
    console.warn('type', type);
    if (type === 'gallary') {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
      }).then((image) => {
        // console.warn(image);
        setState({...state, userImageResponse: image, showActionSheet: false});
      });
    } else {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
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
    console.warn(type);
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
            <Text style={styles.loanText}>Loan Applicatio Request</Text>
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
                <Text>Upload Front Portion</Text>
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
                <Text>Upload Back Portion</Text>
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
                  onPress={() => captureImageDoc('panback')}>
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
                    maxLength={12}
                  />
                </View>
              </View>

              <View style={styles.documentHeading}>
                <Text>Upload Front Portion</Text>
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
                <Text>Upload Back Portion</Text>
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
                    onChangeText={(e) => onChange(e, 'loanAmount')}
                    value={state.loanAmount}
                  />
                </View>
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
                <View>
                  <ProceedButton
                    routeScreenName={'RegistrationPayment'}
                    {...props}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
      {state.showActionSheet ? <ShowSheet handleImage={handleImage} /> : null}
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
