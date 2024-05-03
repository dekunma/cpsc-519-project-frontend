import React from 'react';
import {Box, Center, Heading, Image, Text, VStack} from '@gluestack-ui/themed';

const Welcome = () => {
  return (
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
            PinPals
          </Heading>
          <Text color="$secondary300" textAlign="center">
            An app to share photos among your friends
          </Text>
        </Box>
      </VStack>
    </Center>
  );
};

export default Welcome;
