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

const EnterEmailScreen = ({navigation}) => {
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

  const handlePressButton = () => {
    setIsButtonDisabled(true);
    // navigation.navigate('LoginScreen');
  };

  return (
    <>
      <Center p="$4" h="$full">
        <Heading size="xl" color="$primary500" mb="$10">
          Enter Your Email
        </Heading>
        <Text color="$secondary300" textAlign="center">
          We will send a verification code to your email
        </Text>
        <Box w="$full" mb="$10" p="$4">
          <Input
            variant="outline"
            size="lg"
            isInvalid={false}
            isReadOnly={false}>
            <InputField placeholder="Email" />
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
