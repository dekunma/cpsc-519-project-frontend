import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {request, PERMISSIONS} from 'react-native-permissions';
import Welcome from '../components/Welcome';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    AsyncStorage.getItem('token').then(token => {
      if (!token) {
        navigation.replace('WelcomeScreen');
      } else {
        request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
          .then(result => {
            console.log('location permission request result: ', result);
          })
          .finally(() => {
            navigation.replace('HomeScreen');
          });
      }
    });
  }, [navigation]);

  return <Welcome />;
};
export default SplashScreen;
