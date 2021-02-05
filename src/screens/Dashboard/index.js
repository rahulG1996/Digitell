import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Header from '../../components/Header';
import {Styles} from '../../utils/commonStyle';
import {AllColor} from '../../utils/allColors';
import UserCard from '../../components/UserCard';
import Icon from 'react-native-vector-icons/AntDesign';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import * as profileAction from '../../redux/actions/profileAction';
import * as loanAction from '../../redux/actions/loanRequestAction';
import Loader from '../../components/loader';
import * as loadingAction from '../../redux/actions/loaderAction';

const Dashboard = (props) => {
  const [state, setState] = useState({
    latestLoanId: '',
    showLoanTrack: false,
    status_id: '',
  });

  const dispatch = useDispatch();

  const customerId = useSelector((state) => state.LoginReducer.customerId);

  const isLoading = useSelector((state) => state.CommonLoaderReducer.isLoading);

  const allLoanList = useSelector(
    (state) => state.SaveLoanRequestReducer.allLoanList,
  );

  const trackLoanStatus = useSelector(
    (state) => state.SaveLoanRequestReducer.trackLoanStatus,
  );

  useEffect(() => {
    if (allLoanList && allLoanList.status == 'success') {
      setState({
        ...state,
        latestLoanId: allLoanList.result[0].loan_request_id,
        showLoanTrack: false,
      });
    } else if (allLoanList && allLoanList.status == 'Failure') {
      setState({...state, latestLoanId: '', showLoanTrack: false});
    }
  }, [allLoanList]);

  useEffect(() => {
    if (state.latestLoanId) {
      let data = {
        loan_request_id: state.latestLoanId,
      };
      dispatch(loanAction.getLoanStatus(data));
    }
  }, [state.latestLoanId]);

  useEffect(() => {
    if (
      Object.keys(trackLoanStatus).length &&
      trackLoanStatus.status == 'success'
    ) {
      let status_id = trackLoanStatus.result.status_id;
      setState({...state, showLoanTrack: true, status_id: status_id});
    }
  }, [trackLoanStatus]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      dispatch(loadingAction.commaonLoader(true));
      dispatch(profileAction.getProfile(customerId));
      dispatch(loanAction.getLoanList({customer_id: customerId}));
    });
    return unsubscribe;
  }, [props.navigation]);

  return (
    <View style={Styles.container}>
      <View>
        <Header back={false} {...props} />
      </View>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <KeyboardAwareScrollView>
          <View style={{alignItems: 'center'}}>
            <View style={{width: '90%', zIndex: 99}}>
              <UserCard />
              <View style={{alignItems: 'center', marginTop: 20}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: AllColor.blue,
                    borderRadius: 30,
                    marginTop: -50,
                    zIndex: 99,
                    width: '33%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() =>
                    props.navigation.navigate('LoanApplicationForm', {
                      comeFrom: 'Dashboard',
                    })
                  }>
                  <Text style={{color: 'white', fontSize: 12}}>Apply Loan</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity style={styles.actionViewStyle}>
                  <View style={styles.iconView}>
                    <Icon name="check" size={15} />
                  </View>
                  <Text style={styles.textStyle}>STATUS</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionViewStyle}
                  onPress={() => props.navigation.navigate('LoanList')}>
                  <View style={styles.iconView}>
                    <Icon name="check" size={15} />
                  </View>
                  <Text style={styles.textStyle}>LOAN AVAIL</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionViewStyle}>
                  <View style={styles.iconView}>
                    <Icon name="check" size={15} />
                  </View>
                  <Text style={styles.textStyle}>TRACK</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.darkBlueContainer}></View>
            {state.showLoanTrack ? (
              <ImageBackground
                source={require('../../assets/images/circle.png')}
                style={{width: '100%', height: 300, marginVertical: 30}}
                resizeMode="contain">
                <View style={{justifyContent: 'space-between', marginLeft: 30}}>
                  <View style={styles.actionViewStyleTwo}>
                    <View style={{flexDirection: 'row'}}>
                      {state.status_id >= 1 ? (
                        <View style={styles.iconViewTwo}>
                          <Icon name="check" size={15} color="white" />
                        </View>
                      ) : (
                        <Image source={require('../../assets/images/i.png')} />
                      )}
                    </View>
                    <Text style={styles.textStyleTwo}>
                      Loan Request Submitted
                    </Text>
                  </View>
                  <View style={styles.verticleLine} />
                  <View style={styles.actionViewStyleTwo}>
                    {state.status_id >= 2 ? (
                      <View style={styles.iconViewTwo}>
                        <Icon name="check" size={15} color="white" />
                      </View>
                    ) : (
                      <Image source={require('../../assets/images/i.png')} />
                    )}

                    <Text style={styles.textStyleTwo}>
                      Waiting For Approval
                    </Text>
                  </View>
                  <View style={styles.verticleLine} />
                  <View style={styles.actionViewStyleTwo}>
                    {state.status_id >= 3 ? (
                      <View style={styles.iconViewTwo}>
                        <Icon name="check" size={15} color="white" />
                      </View>
                    ) : (
                      <Image source={require('../../assets/images/i.png')} />
                    )}

                    <Text style={styles.textStyleTwo}>Approved / Rejected</Text>
                  </View>
                  <View style={styles.verticleLine} />
                  <View style={styles.actionViewStyleTwo}>
                    {state.status_id >= 4 ? (
                      <View style={styles.iconViewTwo}>
                        <Icon name="check" size={15} color="white" />
                      </View>
                    ) : (
                      <Image source={require('../../assets/images/i.png')} />
                    )}

                    <Text style={styles.textStyleTwo}>Amount Transferred</Text>
                  </View>
                </View>
              </ImageBackground>
            ) : (
              <View style={{height: 200, justifyContent: 'center'}}>
                <Text>No Loan Found</Text>
              </View>
            )}
          </View>
        </KeyboardAwareScrollView>
      )}
      <View style={{alignItems: 'center'}}>
        <View style={styles.statusContainer}>
          <View style={styles.iconViewTwo}>
            <Icon name="check" size={15} color="white" />
          </View>
          <Text style={styles.textStyleThree}>Clear</Text>
          <Image source={require('../../assets/images/i.png')} />
          <Text style={styles.textStyleThree}>Pending</Text>
        </View>
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  darkBlueContainer: {
    height: 90,
    width: '100%',
    marginTop: -70,
    backgroundColor: AllColor.darkBlue,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
  },
  textStyle: {
    color: 'grey',
    marginHorizontal: 5,
  },
  actionViewStyle: {
    flexDirection: 'row',
  },
  actionViewStyleTwo: {
    flexDirection: 'row',
    borderRadius: 10,
    padding: 5,
    backgroundColor: '#FFFBF9',
    marginHorizontal: 5,
  },
  iconView: {
    padding: 3,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  iconViewTwo: {
    padding: 3,
    borderRadius: 20,
    backgroundColor: AllColor.green,
  },
  textStyleTwo: {
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 5,
    // textTransform: '',
  },
  verticleLine: {
    height: 50,
    borderWidth: 0.7,
    width: 1,
    borderColor: 'orange',
    borderStyle: 'dashed',
    borderRadius: 1,
    marginLeft: 20,
  },
  textStyleThree: {
    marginHorizontal: 10,
  },
  statusContainer: {
    flexDirection: 'row',
    borderTopWidth: 0.4,
    padding: 7,
    width: '90%',
    justifyContent: 'center',
  },
});
