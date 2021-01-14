import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';
import LoanApplicationForm from '../screens/LoanApplicationForm';

const Stack = createStackNavigator();

export default function Route() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="LoanApplicationForm"
        component={LoanApplicationForm}
      />
    </Stack.Navigator>
  );
}
