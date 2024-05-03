import React from 'react';
import {Box, Button, ButtonText, View} from '@gluestack-ui/themed';
import Welcome from '../components/Welcome';

const WelcomeScreen = ({navigation}) => {
  return (
    <View>
      <Welcome />

      <Box style={{position: 'absolute', bottom: 40}} p="$4">
        <Button
          size="lg"
          w="$full"
          mb="$4"
          onPress={() => navigation.navigate('EnterEmailScreen')}>
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
