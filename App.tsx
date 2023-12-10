import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import DetailScreen from './src/components/news/screens/DetailScreen';
import Homepage from './src/components/news/screens/Homepage';
import Login from './src/components/users/screens/Login';
import Signup from './src/components/users/screens/Signup';

import AppNavigation from './src/components/navigation/AppNavigation';
import {UserProvider} from './src/components/users/UserContext';
import {NewsProvider} from './src/components/news/NewsContext';

function App(): JSX.Element {
  return (
    <SafeAreaView style={appStyle.body}>
      <UserProvider>
        <NewsProvider>
          <AppNavigation />
        </NewsProvider>
      </UserProvider>
    </SafeAreaView>
  );
}
export default App;
const appStyle = StyleSheet.create({
  body: {
    width: '100%',
    height: '100%',
  },
});
