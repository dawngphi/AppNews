import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useContext, useCallback} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../../../users/UserContext';

const Logout = props => {
  const {navigation} = props;
  const {setUser} = useContext(UserContext);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, []);
  const handleLogout = useCallback(async () => {
    await AsyncStorage.removeItem('token');
    setUser(null);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          {/* <Image
            style={{tintColor: '#4E4B66'}}
            source={require('../../../images/iconback.png')}
          /> */}
        </TouchableOpacity>
        <Text style={styles.textHeader}>Setting</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.bodyIcon}>
          {/* <Image source={require('../../../images/iconNotification.png')} /> */}
          <Text style={styles.textBodyIcon}>Notification</Text>
        </View>
        {/* <Image source={require('../../../images/iconArrow.png')} /> */}
      </View>
      <View style={styles.body}>
        <View style={styles.bodyIcon}>
          {/* <Image source={require('../../../images/iconSecurity.png')} /> */}
          <Text style={styles.textBodyIcon}>Security</Text>
        </View>
        {/* <Image source={require('../../../images/iconArrow.png')} /> */}
      </View>
      <View style={styles.body}>
        <View style={styles.bodyIcon}>
          {/* <Image source={require('../../../images/iconHelp.png')} /> */}
          <Text style={styles.textBodyIcon}>Help</Text>
        </View>
        {/* <Image source={require('../../../images/iconArrow.png')} /> */}
      </View>
      <View style={styles.body}>
        <View style={styles.bodyIcon}>
          {/* <Image source={require('../../../images/iconMode.png')} /> */}
          <Text style={styles.textBodyIcon}>Help</Text>
        </View>
       
      </View>
      <View style={styles.body}>
        <TouchableOpacity style={styles.bodyIcon} onPress={handleLogout}>
          {/* <Image source={require('../../../images/iconLogout.png')} /> */}
          <Text style={styles.textBodyIcon}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Logout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    width: 221,
    height: 24,
  },
  textHeader: {
    width: 66,
    height: 24,
    fontWeight: '400',
    fontSize: 16,
    color: '#000000',
    lineHeight: 24,
    letterSpacing: 0.12,
  },
  body: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    width: '100%',
    height: 56,
  },
  bodyIcon: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 121,
    height: 24,
  },
  textBodyIcon: {
    width: 93,
    height: 24,
    fontWeight: '400',
    fontSize: 16,
    color: '#000000',
    lineHeight: 24,
    letterSpacing: 0.12,
  },
});
