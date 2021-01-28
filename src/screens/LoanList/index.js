import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Header from '../../components/Header';
import {Styles} from '../../utils/commonStyle';
import {AllColor} from '../../utils/allColors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import BackgroundImage from '../../assets/images/background2.png';

const LoanList = (props) => {
  const [state, setState] = useState({
    loanList: [
      {
        date: '12-12-2020',
        status: 'approved',
      },
      {
        date: '12-12-2020',
        status: 'applied',
      },
      {
        date: '12-12-2020',
        status: 'applied',
      },
      {
        date: '12-12-2020',
        status: 'approved',
      },
      {
        date: '12-12-2020',
        status: 'approved',
      },
      {
        date: '12-12-2020',
        status: 'applied',
      },
    ],
  });

  const renderLoanList = (item, index) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 5},
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 5,
          paddingVertical: 20,
          marginVertical: 10,
          borderRadius: 10,
        }}>
        <View style={{width: '15%', alignItems: 'center'}}>
          <Text style={{color: AllColor.blue, fontWeight: 'bold'}}>
            {index + 1}
          </Text>
        </View>
        <View style={{width: '60%'}}>
          <Text>{'Loan Applied (' + item.date + ' )'}</Text>
        </View>
        <View style={{width: '25%', alignItems: 'center'}}>
          <TouchableOpacity
            style={{
              padding: 5,
              borderRadius: 20,
              backgroundColor:
                item.status == 'applied' ? AllColor.blue : AllColor.green,
            }}>
            <Text
              style={{
                color: 'white',
                textTransform: 'capitalize',
                fontSize: 12,
              }}>
              {item.status}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={Styles.container}>
      <View>
        <Header back={true} {...props} title="Requested Loan List" />
      </View>
      <KeyboardAwareScrollView>
        <ImageBackground
          style={{width: '100%', height: '100%'}}
          resizeMode="stretch"
          source={BackgroundImage}>
          <View style={{paddingHorizontal: 20, alignItems: 'center'}}>
            <View>
              <FlatList
                data={state.loanList}
                renderItem={({item, index}) => renderLoanList(item, index)}
              />
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
          Note : You can edit only loan which is in progress for approvals
        </Text>
      </View>
    </View>
  );
};

export default LoanList;

const styles = StyleSheet.create({
  darkBlueContainer: {
    height: 120,
    width: '100%',
    marginTop: -70,
    backgroundColor: AllColor.darkBlue,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
  },
});
