import React from 'react';
import {
  Box,
  Button,
  ButtonText,
  Center,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Heading,
  Input,
  InputField,
} from '@gluestack-ui/themed';

import api from '../api';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const login = () => {
    const LOGIN_ROUTE = '/users/log-in';

    api
      .post(LOGIN_ROUTE, {email, password})
      .then(response => {
        console.log(response.data);
        const token = response.data.token;
        navigation.navigate('TempHomeScreen', {token: token});
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
      <Center p="$4" h="$full">
        <Heading size="xl" color="$primary500" mb="$10">
          Enter Your Details
        </Heading>
        <Box w="$full" mb="$10" p="$4">
          <FormControl
            w="$full"
            size="lg"
            mb="$6"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
            isRequired={false}>
            <FormControlLabel mb="$1">
              <FormControlLabelText>Email</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                onChangeText={e => setEmail(e)}
                type="email"
                placeholder="Email"
              />
            </Input>
          </FormControl>
          <FormControl
            w="$full"
            size="lg"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
            isRequired={false}>
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
          </FormControl>
        </Box>
        <Box>
          <Button size="lg" w="$full" mb="$1" onPress={() => login()}>
            <ButtonText w="$full" textAlign="center">
              GET STARTED
            </ButtonText>
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
