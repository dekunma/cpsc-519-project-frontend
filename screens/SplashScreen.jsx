import {Heading, View} from '@gluestack-ui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    AsyncStorage.getItem('token').then(token => {
      if (!token) {
        navigation.replace('WelcomeScreen');
      } else {
        navigation.replace('HomeScreen');
      }
    });
  }, [navigation]);

  return (
    <>
      <View>
        <Heading>Splash Screen. TO BE REPLACED</Heading>
      </View>
    </>
  );
};
export default SplashScreen;
