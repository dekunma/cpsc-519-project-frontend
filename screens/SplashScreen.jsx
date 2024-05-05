import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {request, PERMISSIONS} from 'react-native-permissions';
import Welcome from '../components/Welcome';
import {PermissionsAndroid, Platform} from "react-native";


async function hasAndroidMediaPermission() {
  const getCheckPermissionPromise = () => {
    if (Platform.Version >= 33) {
      return Promise.all([
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES),
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO),
      ]).then(
        ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
          hasReadMediaImagesPermission && hasReadMediaVideoPermission,
      );
    } else {
      return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
    }
  };

  const hasPermission = await getCheckPermissionPromise();
  if (hasPermission) {
    return true;
  }
  const getRequestPermissionPromise = () => {
    if (Platform.Version >= 33) {
      return PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
      ]).then(
        (statuses) =>
          statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
          PermissionsAndroid.RESULTS.GRANTED &&
          statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
          PermissionsAndroid.RESULTS.GRANTED,
      );
    } else {
      return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then((status) => status === PermissionsAndroid.RESULTS.GRANTED);
    }
  };

  return await getRequestPermissionPromise();
}


const SplashScreen = ({navigation}) => {
  useEffect(() => {
    AsyncStorage.getItem('token').then(token => {
      if (!token) {
        navigation.replace('WelcomeScreen');
      } else {
        hasAndroidMediaPermission()
          .then(result => {
            console.log('media permission request result: ', result);
          });

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
