import React from 'react';
import {enableLatestRenderer} from 'react-native-maps';
import {GluestackUIProvider, View, Text} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
import {NavigationContainer} from '@react-navigation/native';
import WelcomeScreen from './screens/WelcomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './screens/login/LoginScreen';
import EnterEmailScreen from './screens/signup/EnterEmailScreen';
import VerificationCodeScreen from './screens/signup/VerificationCodeScreen';
import CreatePasswordScreen from './screens/signup/CreatePasswordScreen';

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
          <Stack.Screen
            name="EnterEmailScreen"
            component={EnterEmailScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="VerificationCodeScreen"
            component={VerificationCodeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CreatePasswordScreen"
            component={CreatePasswordScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </GluestackUIProvider>
    </NavigationContainer>
  );
}

export default App;
