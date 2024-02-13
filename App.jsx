import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {enableLatestRenderer} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {PermissionsAndroid} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

enableLatestRenderer();

const Stack = createNativeStackNavigator();

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Example App',
        message: 'Example App access to your location ',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // console.log('You can use the location');
      // alert('You can use the location');
    } else {
      // console.log('location permission denied');
      // alert('Location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

const MyMap = ({navigation}) => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 35.6762,
          longitude: 139.6503,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}>
        <Marker
          coordinate={{
            latitude: 35.6762,
            longitude: 139.6503,
          }}
          title={'Test marker'}
          description={'Test marker'}
          tappable={true}
          onPress={() => {
            console.log('Marker Pressed');
            navigation.navigate('NewScreen');
          }}
        />
      </MapView>
    </View>
  );
};

const TestNewScreen = () => {
  return (
    <View>
      <Text>Test new screen</Text>
    </View>
  );
};

function App() {
  useEffect(() => {
    requestLocationPermission();
    Geolocation.getCurrentPosition(
      pos => {
        console.log(pos);
      },
      err => console.log(err),
    );
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={MyMap} />
        <Stack.Screen name="NewScreen" component={TestNewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default App;
