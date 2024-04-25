import React from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {Box, Fab, FabIcon, FabLabel} from '@gluestack-ui/themed';

const UploadPhotosButton = ({
  isActive,
  buttonText,
  icon,
  bg,
  callbackFn
}) => {

  return (
    <Box
      w="$full"
      borderRadius="$md"
      style={{display: isActive ? 'flex' : 'none'}}>
      <Fab
        size="lg"
        placement="bottom center"
        onPress={callbackFn}
        bg={bg}>
        <FabIcon as={icon} mr="$1" />
        <FabLabel>{buttonText}</FabLabel>
      </Fab>
    </Box>
  );
};

export default UploadPhotosButton;
