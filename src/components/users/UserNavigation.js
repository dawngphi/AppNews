import {View, Text} from 'react-native';
import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import {UserContext} from './UserContext';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Profile from './screens/Profile';

const UserNavigation = () => {
  const {user} = useContext(UserContext);
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};

export default UserNavigation;
