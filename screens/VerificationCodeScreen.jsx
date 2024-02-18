import {
  Box,
  Button,
  ButtonText,
  Center,
  Heading,
  Text,
} from '@gluestack-ui/themed';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import api from '../api';

const CELL_COUNT = 4;
const VerificationCodeScreen = ({navigation, route}) => {
  const {email} = route.params;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [isContinueButtonDisabled, setIsContinueButtonDisabled] =
    useState(false);

  const handlePressContinue = () => {
    setIsContinueButtonDisabled(true);
    api
      .post('/users/check-verification-code', {
        email: email,
        verification_code: value,
      })
      .then(() => {
        navigation.navigate('CreatePasswordScreen', {
          email: email,
          code: value,
        });
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => {
        setIsContinueButtonDisabled(false);
      });
  };

  return (
    <>
      <Center p="$4" h="$full">
        <Heading size="xl" color="$primary500" mb="$4">
          Verification Code
        </Heading>
        <Text color="$secondary300" textAlign="center">
          We have sent a code to
        </Text>
        <Text color="$secondary300" textAlign="center" mb="$4">
          {email}
        </Text>
        <CodeField
          ref={ref}
          {...props}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
        <Box mt="$10">
          <Button
            size="lg"
            w="$full"
            onPress={() =>
              navigation.navigate('CreatePasswordScreen', {code: value})
            }
            isDisabled={isContinueButtonDisabled}>
            <ButtonText
              w="$full"
              textAlign="center"
              onPress={handlePressContinue}>
              CONTINUE
            </ButtonText>
          </Button>
          <Button size="lg" w="$full" variant="link">
            <ButtonText w="$full" textAlign="center">
              RESEND CODE
            </ButtonText>
          </Button>
        </Box>
      </Center>
    </>
  );
};

const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 60,
    height: 60,
    lineHeight: 60,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#B0B0B0', // secondary300
    textAlign: 'center',
    margin: 10,
    borderRadius: 5,
  },
  focusCell: {
    borderColor: '#0077E6', // primary500
  },
});

export default VerificationCodeScreen;
