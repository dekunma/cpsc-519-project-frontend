import React from 'react';
import {enableLatestRenderer} from 'react-native-maps';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
import {NavigationContainer} from '@react-navigation/native';
import WelcomeScreen from './screens/WelcomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './screens/login/LoginScreen';
import EnterEmailScreen from './screens/signup/EnterEmailScreen';
import VerificationCodeScreen from './screens/signup/VerificationCodeScreen';
import CreatePasswordScreen from './screens/signup/CreatePasswordScreen';
import HomeScreen from './screens/HomeScreen';
import SplashScreen from './screens/SplashScreen';
import NewPostScreen from './screens/NewPostScreen';

const Stack = createNativeStackNavigator();

enableLatestRenderer();

function App() {
  return (
    <NavigationContainer>
      <GluestackUIProvider config={config}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="EnterEmailScreen" component={EnterEmailScreen} />
          <Stack.Screen
            name="VerificationCodeScreen"
            component={VerificationCodeScreen}
          />
          <Stack.Screen
            name="CreatePasswordScreen"
            component={CreatePasswordScreen}
          />
          <Stack.Screen name="NewPostScreen" component={NewPostScreen} />
        </Stack.Navigator>
      </GluestackUIProvider>
    </NavigationContainer>
  );
}

export default App;
