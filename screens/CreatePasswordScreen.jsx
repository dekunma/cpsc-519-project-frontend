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
  FormControlLabel,
  FormControlLabelText,
  Heading,
  Input,
  InputField,
} from '@gluestack-ui/themed';
import React from 'react';

const CreatePasswordScreen = ({navigation}) => {
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [isLoginButtonDisabled, setIsLoginButtonDisabled] =
    React.useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = React.useState(false);
  const [passwordInvalidText, setPasswordInvalidText] = React.useState('');

  const validatePassword = () => {
    if (password.length < 8) {
      setIsPasswordInvalid(true);
      setPasswordInvalidText('Password must be at least 8 characters.');
      return false;
    }

    if (password !== confirmPassword) {
      setIsPasswordInvalid(true);
      setPasswordInvalidText('Passwords do not match.');
      return false;
    }

    return true;
  };

  const signup = () => {
    setIsPasswordInvalid(false);
    setIsLoginButtonDisabled(true);

    if (!validatePassword()) {
      setIsLoginButtonDisabled(false);
      return;
    }
  };

  return (
    <>
      <Center p="$4" h="$full">
        <Heading size="xl" color="$primary500" mb="$4">
          Create Password
        </Heading>
        <Box w="$full" mb="$10" p="$4">
          <FormControl
            w="$full"
            size="lg"
            mb="$6"
            isInvalid={isPasswordInvalid}>
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
            <FormControlHelper>
              <FormControlHelperText>
                Must be at least 8 characters.
              </FormControlHelperText>
            </FormControlHelper>
          </FormControl>
          <FormControl w="$full" size="lg" isInvalid={isPasswordInvalid}>
            <FormControlLabel mb="$1">
              <FormControlLabelText>Confirm Password</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                onChangeText={e => setConfirmPassword(e)}
                type="password"
                placeholder="Confirm Password"
              />
            </Input>
            <FormControlHelper>
              <FormControlHelperText>
                Confirm your password.
              </FormControlHelperText>
            </FormControlHelper>
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>{passwordInvalidText}</FormControlErrorText>
            </FormControlError>
          </FormControl>
        </Box>
        <Button
          size="lg"
          w="$full"
          mb="$1"
          onPress={() => signup()}
          isDisabled={isLoginButtonDisabled}>
          <ButtonText w="$full" textAlign="center">
            SIGN IN
          </ButtonText>
        </Button>
      </Center>
    </>
  );
};

export default CreatePasswordScreen;
