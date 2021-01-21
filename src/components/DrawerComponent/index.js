import React from 'react';
import {View, Text} from 'react-native';
import * as loginAction from '../../redux/actions/loginAction';
import {useDispatch} from 'react-redux';

const DrawerComponent = (props) => {
  const dispatch = useDispatch();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text onPress={() => dispatch(loginAction.setToken(null))}>Logout</Text>
    </View>
  );
};

export default DrawerComponent;
