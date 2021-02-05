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
import Notifications from '../screens/Notifications';
import UpdateProfile from '../screens/UpdateProfile';
import Rating from '../screens/Rating';
import LoanList from '../screens/LoanList';
import LoanApplicationType from '../screens/LoanApplicationType';
import ForgotPassword from '../screens/ForgotPassword';
import ResetPassword from '../screens/ResetPassword';

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

export default function Route() {
  const userToken = useSelector((state) => state.LoginReducer.userToken);

  function Home() {
    return (
      <Stack.Navigator
        headerMode="none"
        // drawerType="slide"
        // drawerContent={(props) => <DrawerComponent {...props} />}
      >
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
        <Stack.Screen name="Rating" component={Rating} />
        <Stack.Screen name="LoanList" component={LoanList} />
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
        <Stack.Screen
          name="LoanApplicationType"
          component={LoanApplicationType}
        />
      </Stack.Navigator>
    );
  }

  function DashboardScreen() {
    return (
      <Drawer.Navigator
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
        <Stack.Screen
          name="LoanApplicationType"
          component={LoanApplicationType}
        />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
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
