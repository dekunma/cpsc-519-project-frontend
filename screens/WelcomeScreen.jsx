import React from 'react';
import {
  Box,
  Button,
  ButtonText,
  Center,
  Heading,
  Image,
  Text,
  VStack,
  View,
} from '@gluestack-ui/themed';

const WelcomeScreen = ({navigation}) => {
  return (
    <View>
      <Center justifyContent="center" h="$full" p="$1/5">
        <VStack space="2xl" alignItems="center" pb="$2/3">
          <Box>
            <Image
              source={require('../assets/LOGO.png')}
              alt="Logo"
              w="$32"
              h="$32"
            />
          </Box>

          <Box alignItems="center">
            <Heading size="xl" color="$primary500">
              APP NAME TBD
            </Heading>
            <Text color="$secondary300" textAlign="center">
              Some Secondary text to put here to introduce our app
            </Text>
          </Box>
        </VStack>
      </Center>

      <Box style={{position: 'absolute', bottom: 40}} p="$4">
        <Button size="lg" w="$full" mb="$4">
          <ButtonText w="$full" textAlign="center">
            GET STARTED
          </ButtonText>
        </Button>

        <Button
          size="lg"
          w="$full"
          variant="outline"
          onPress={() => navigation.navigate('LoginScreen')}>
          <ButtonText w="$full" textAlign="center">
            I ALREADY HAVE AN ACCOUNT
          </ButtonText>
        </Button>
      </Box>
    </View>
  );
};

export default WelcomeScreen;
