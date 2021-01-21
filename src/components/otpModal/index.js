import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import OTPTextView from 'react-native-otp-textinput';
import Icon1 from 'react-native-vector-icons/Entypo';
import Loader from '../../components/loader';
import {useDispatch, useSelector} from 'react-redux';
import {AllColor} from '../../utils/allColors';

const OtpModal = (props) => {
  const [otpData, setOtp] = useState('');
  const [otpFromInupt, setOtpInput] = useState('');
  const [otpLength, setOtpLength] = useState(2);

  const dispatch = useDispatch();

  const handleOtp = (otp) => {
    setOtpInput(otp);
  };

  const verifyOtp = () => {
    if (otpFromInupt.length < 6) {
    } else {
      fetch(
        `http://2factor.in/API/V1/7a2fed00-443a-11eb-8153-0200cd936042/SMS/VERIFY/${props.otpResponse}/${otpFromInupt}`,
      )
        .then((response) =>
          response.json().then((responseData) => {
            console.warn('responseData', responseData);
            props.success(responseData);
          }),
        )
        .catch((err) => {
          console.warn('err', err);
          props.faliure();
        });
    }
  };

  return (
    <View>
      <Modal
        deviceWidth={wp('100%')}
        deviceHeight={hp('100%')}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: hp('0%'),
        }}
        onBackButtonPress={props.handleModal}
        isVisible={props.showOtpModal}>
        <View
          style={{
            width: wp('95'),
            height: hp('40%'),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
          }}>
          <View style={styles.container}>
            <View style={{width: '100%', alignItems: 'flex-end'}}>
              <TouchableOpacity
                style={{padding: 10}}
                onPress={props.crossModal}>
                <Icon1 name="cross" color="black" size={30} />
              </TouchableOpacity>
            </View>
            <View style={{marginBottom: hp('2%')}}>
              <Text style={{fontWeight: 'bold', fontSize: hp('2.5%')}}>
                Enter otp to verify
              </Text>
            </View>
            <OTPTextView
              handleTextChange={(e) => handleOtp(e)}
              textInputStyle={styles.roundedTextInput}
              tintColor={AllColor.orange}
              inputCount={6}
            />
            <View style={{marginVertical: '6%', width: '30%'}}>
              <View>
                <TouchableOpacity
                  style={{
                    paddingVertical: '10%',
                    borderRadius: 30,
                    backgroundColor: '#41caf1',
                    alignItems: 'center',
                    paddingVertical: '4%',
                    borderRadius: 6,
                  }}
                  onPress={verifyOtp}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 16,
                      textTransform: 'uppercase',
                      fontWeight: 'bold',
                    }}>
                    Verify
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* <View style={{marginBottom: hp('2%')}}>
              <TouchableOpacity>
                <Text
                  style={{
                    color: AllColor.orange,
                    textDecorationLine: 'underline',
                  }}>
                  Click here to Resend OTP
                </Text>
              </TouchableOpacity>
            </View> */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default OtpModal;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 20,
  },
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 4,
  },
});
