import React from 'react';
import {
  Box,
  Button,
  ButtonText,
  Center,
  Heading,
  Input,
  InputField,
  Text,
} from '@gluestack-ui/themed';

import api from '../api';

const EnterEmailScreen = ({navigation}) => {
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
  const [email, setEmail] = React.useState('');

  const handlePressButton = () => {
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
        <Text color="$secondary300" textAlign="center" mb="$10">
          We will send a verification code to your email
        </Text>
        <Box w="$full" mb="$10" p="$4">
          <Input
            variant="outline"
            size="lg"
            isInvalid={false}
            isReadOnly={false}>
            <InputField placeholder="Email" onChangeText={e => setEmail(e)} />
          </Input>
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
