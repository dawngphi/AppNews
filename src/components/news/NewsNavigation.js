import {View, Text, Image} from 'react-native';
import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {UserContext} from '../users/UserContext';
const Tab = createBottomTabNavigator();

import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import Homepage from './screens/Homepage';
import Explore from './screens/Explore';
import DetailScreen from './screens/DetailScreen';
import Bookmark from './screens/Bookmark';
import Logout from './screens/hompage/Logout';

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Homepage" component={Homepage} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
    </Stack.Navigator>
  );
};

import Add from './screens/Add';
import Profile from './screens/Profile';
import EditProfile from './screens/EditProfile';

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Add" component={Add} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Logout" component={Logout} />

    </Stack.Navigator>
  );
};

const NewsNavigation = () => {
  const {user} = useContext(UserContext);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            if (focused) {
              return <Image source={require('../../media/homeon.png')} />;
            } else {
              return <Image source={require('../../media/home.png')} />;
            }
          } else if (route.name === 'Explore') {
            if (focused) {
              return <Image source={require('../../media/exploreon.png')} />;
            } else {
              return <Image source={require('../../media/explore.png')} />;
            }
          } else if (route.name === 'Bookmark') {
            if (focused) {
              return <Image source={require('../../media/bookmarkon.png')} />;
            } else {
              return <Image source={require('../../media/bookmark.png')} />;
            }
          } else if (route.name === 'ProfileStack') {
            if (focused) {
              return <Image source={require('../../media/profileon.png')} />;
            } else {
              return <Image source={require('../../media/profile.png')} />;
            }
          }
        },
        tabBarLabel: ({focused, color, size}) => {
          if (route.name === 'Home') {
            if (focused) {
              return <Text style={{color: '#1877F2'}}>Home</Text>;
            } else {
              return <Text style={{color: '#000000'}}>Home</Text>;
            }
          } else if (route.name === 'Explore') {
            if (focused) {
              return <Text style={{color: '#1877F2'}}>Explore</Text>;
            } else {
              return <Text style={{color: '#000000'}}>Explore</Text>;
            }
          } else if (route.name === 'Bookmark') {
            if (focused) {
              return <Text style={{color: '#1877F2'}}>Bookmark</Text>;
            } else {
              return <Text style={{color: '#000000'}}>Bookmark</Text>;
            }
          } else if (route.name === 'ProfileStack') {
            if (focused) {
              return <Text style={{color: '#1877F2'}}>Profile</Text>;
            } else {
              return <Text style={{color: '#000000'}}>Profile</Text>;
            }
          }
        },
      })}>
      <Tab.Screen name="Signin" component={Signin} />
      <Tab.Screen name="Explore" component={Explore} />
      <Stack.Screen name="Bookmark" component={Bookmark} />
      <Tab.Screen name="ProfileStack" component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default NewsNavigation;
