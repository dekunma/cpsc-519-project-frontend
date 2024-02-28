import React, {useEffect} from 'react';
import {
  AlertCircleIcon,
  Box,
  Button,
  ButtonText,
  Center,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  Heading,
  Input,
  InputField,
  Text,
} from '@gluestack-ui/themed';

import api from '../api';

const EnterEmailScreen = ({navigation}) => {
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [isEmailInvalid, setIsEmailInvalid] = React.useState(false);
  const [emailInvalidText, setEmailInvalidText] = React.useState('');

  useEffect(() => {
    if (email === '') {
      setIsEmailInvalid(false);
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [email]);

  const handlePressButton = () => {
    if (!email.endsWith('@yale.edu')) {
      setIsEmailInvalid(true);
      setEmailInvalidText('Please use your yale.edu email.');
      return;
    }

    setIsButtonDisabled(true);
    api
      .post('/users/send-verification-code', {email: email})
      .then(() => {
        navigation.navigate('VerificationCodeScreen', {
          email: email,
        });
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => {
        setIsButtonDisabled(false);
      });
  };

  return (
    <>
      <Center p="$4" h="$full">
        <Heading size="xl" color="$primary500" mb="$4">
          Enter Your Email
        </Heading>
        <Text color="$secondary300" textAlign="center" mb="$4">
          We will send a verification code to your email
        </Text>
        <Box w="$full" mb="$10" p="$4">
          <FormControl size="lg" isInvalid={isEmailInvalid} isReadOnly={false}>
            <Input>
              <InputField
                type="email"
                placeholder="Email"
                onChangeText={e => setEmail(e)}
              />
            </Input>
            <FormControlHelper>
              <FormControlHelperText>
                ⚠ Please use your yale.edu email at this time
              </FormControlHelperText>
            </FormControlHelper>
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>{emailInvalidText}</FormControlErrorText>
            </FormControlError>
          </FormControl>
        </Box>
        <Box>
          <Button
            size="lg"
            w="$full"
            onPress={handlePressButton}
            isDisabled={isButtonDisabled}>
            <ButtonText w="$full" textAlign="center">
              SEND CODE
            </ButtonText>
          </Button>
        </Box>
      </Center>
    </>
  );
};

export default EnterEmailScreen;
