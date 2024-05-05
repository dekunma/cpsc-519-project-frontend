import React from 'react';
import {
  Box,
  Button,
  ButtonText,
  Center,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  Heading,
  Input,
  InputField,
  Spinner,
} from '@gluestack-ui/themed';

import api from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AlertCircleIcon} from 'lucide-react-native';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoginButtonDisabled, setIsLoginButtonDisabled] =
    React.useState(false);

  const [isLoginInvalid, setIsLoginInvalid] = React.useState(false);
  const [loginInvalidText, setLoginInvalidText] = React.useState('');

  const login = () => {
    const LOGIN_ROUTE = '/users/log-in';
    setIsLoginButtonDisabled(true);
    setIsLoginInvalid(false);

    api
      .post(LOGIN_ROUTE, {email: email.trim(), password: password.trim()})
      .then(response => {
        console.log(response.data);
        const token = response.data.token;
        AsyncStorage.setItem('token', token);
        navigation.navigate('SplashScreen', {token: token});
      })
      .catch(error => {
        setIsLoginInvalid(true);
        const errorMessage = error.response.data.message;
        setLoginInvalidText(errorMessage);
        console.log(error);
      })
      .finally(() => {
        setIsLoginButtonDisabled(false);
      });
  };

  return (
    <>
      <Center p="$4" h="$full">
        <Heading size="xl" color="$primary500" mb="$10">
          Enter Your Details
        </Heading>
        <Box w="$full" mb="$10" p="$4">
          <FormControl w="$full" size="lg" mb="$6">
            <FormControlLabel mb="$1">
              <FormControlLabelText>Email</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                onChangeText={e => setEmail(e)}
                type="email"
                placeholder="Email"
                keyboardType="email-address"
                autoCorrect={false}
              />
            </Input>
          </FormControl>
          <FormControl w="$full" size="lg" isInvalid={isLoginInvalid}>
            <FormControlLabel mb="$1">
              <FormControlLabelText>Password</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                onChangeText={e => setPassword(e)}
                type="password"
                placeholder="Password"
              />
            </Input>
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>{loginInvalidText}</FormControlErrorText>
            </FormControlError>
          </FormControl>
        </Box>
        <Box>
          <Button
            size="lg"
            w="$full"
            mb="$1"
            onPress={() => login()}
            isDisabled={isLoginButtonDisabled}>
            {isLoginButtonDisabled ? (
              <Spinner w="$full" textAlign="center" />
            ) : (
              <ButtonText w="$full" textAlign="center">
                SIGN IN
              </ButtonText>
            )}
          </Button>
          <Button size="lg" w="$full" variant="link">
            <ButtonText w="$full" textAlign="center">
              FORGOT PASSWORD
            </ButtonText>
          </Button>
        </Box>
      </Center>
    </>
  );
};

export default LoginScreen;
