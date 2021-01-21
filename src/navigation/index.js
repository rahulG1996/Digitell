import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';
import LoanApplicationForm from '../screens/LoanApplicationForm';
import LoanApplicationDocuments from '../screens/LoanApplicationDocuments';
import RegistrationPayment from '../screens/RegistrationPayment';
import {useSelector} from 'react-redux';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Dashboard from '../screens/Dashboard';
import DrawerComponent from '../components/DrawerComponent';

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

export default function Route() {
  const userToken = useSelector((state) => state.LoginReducer.userToken);

  function Home() {
    return (
      <Drawer.Navigator
        drawerType="slide"
        drawerContent={(props) => <DrawerComponent {...props} />}>
        <Drawer.Screen name="Dashboard" component={Dashboard} />
      </Drawer.Navigator>
    );
  }

  function Auth() {
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="LoanApplicationForm"
          component={LoanApplicationForm}
        />
        <Stack.Screen
          name="LoanApplicationDocuments"
          component={LoanApplicationDocuments}
        />
        <Stack.Screen
          name="RegistrationPayment"
          component={RegistrationPayment}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator headerMode="none">
      {userToken ? (
        <Stack.Screen name="Home" component={Home} />
      ) : (
        <Stack.Screen name="Auth" component={Auth} />
      )}
    </Stack.Navigator>
  );
}
