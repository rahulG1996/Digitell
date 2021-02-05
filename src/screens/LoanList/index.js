import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import Header from '../../components/Header';
import {Styles} from '../../utils/commonStyle';
import {AllColor} from '../../utils/allColors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import BackgroundImage from '../../assets/images/background2.png';
import {useSelector} from 'react-redux';

const LoanList = (props) => {
  const [state, setState] = useState({
    loanList: [],
    showList: false,
  });

  const allLoanList = useSelector(
    (state) => state.SaveLoanRequestReducer.allLoanList,
  );

  useEffect(() => {
    if (allLoanList && allLoanList.status == 'success') {
      setState({...state, loanList: allLoanList.result, showList: true});
    } else if (allLoanList && allLoanList.status == 'Failure') {
      setState({...state, loanList: [], showList: true});
    }
  }, [allLoanList]);

  const renderLoanList = (item, index) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'white',
          shadowColor: '#000',
          alignItems: 'center',
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
          <Text>
            {item.loan_type_name + ' (' + item.loan_request_date + ' )'}
          </Text>
        </View>
        <View style={{width: '25%', alignItems: 'center'}}>
          <TouchableOpacity
            style={{
              padding: 5,
              borderRadius: 20,
              backgroundColor:
                item.status_name !== 'Approved'
                  ? AllColor.blue
                  : AllColor.green,
            }}>
            <Text
              style={{
                color: 'white',
                textTransform: 'capitalize',
                fontSize: 12,
              }}
              numberOfLines={1}>
              {item.status_name}
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
      <ImageBackground
        style={{width: '100%', height: '100%'}}
        resizeMode="stretch"
        source={BackgroundImage}>
        <KeyboardAwareScrollView>
          <View style={{paddingHorizontal: 20, alignItems: 'center'}}>
            <View>
              {state.showList ? (
                state.loanList.length ? (
                  <FlatList
                    data={state.loanList}
                    renderItem={({item, index}) => renderLoanList(item, index)}
                  />
                ) : (
                  <Text
                    style={{color: 'white', fontSize: 18, paddingVertical: 10}}>
                    No data Found
                  </Text>
                )
              ) : (
                <ActivityIndicator />
              )}
            </View>
          </View>
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
      </ImageBackground>
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
