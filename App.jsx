import React from 'react';
import {enableLatestRenderer} from 'react-native-maps';
import {GluestackUIProvider, View, Text} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
import {NavigationContainer} from '@react-navigation/native';
import WelcomeScreen from './screens/WelcomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';

const Stack = createNativeStackNavigator();

enableLatestRenderer();

const TempHomeScreen = ({route}) => {
  return (
    <View>
      <Text>TempHomeScreen</Text>
      <Text>{route.params.token}</Text>
    </View>
  );
};

function App() {
  return (
    <NavigationContainer>
      <GluestackUIProvider config={config}>
        <Stack.Navigator>
          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name="TempHomeScreen" component={TempHomeScreen} />
        </Stack.Navigator>
      </GluestackUIProvider>
    </NavigationContainer>
  );
}

export default App;
