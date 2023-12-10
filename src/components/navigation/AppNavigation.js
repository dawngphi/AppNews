
import React, {useContext} from 'react'
import UserNavigation from '../users/UserNavigation'
import NewsNavigation from '../news/NewsNavigation'
import {NavigationContainer} from '@react-navigation/native';
import {UserContext} from '../users/UserContext';

const AppNavigation = () => {
    const {user} = useContext(UserContext);
  return (
    <NavigationContainer>
        {user ? <NewsNavigation /> : <UserNavigation />}
    </NavigationContainer>

  )
}

export default AppNavigation