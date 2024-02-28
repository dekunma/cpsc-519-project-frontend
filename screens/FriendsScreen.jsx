import React from 'react';
import {
  Box,
  Heading,
  Actionsheet,
  ActionsheetDragIndicatorWrapper,
  ActionsheetDragIndicator,
  ActionsheetScrollView,
  ActionsheetBackdrop,
  ActionsheetContent,
} from '@gluestack-ui/themed';

const FriendsList = () => {
  return (
    <Box w="100%">
      <Heading>Friends List (REPLACE ME)</Heading>
    </Box>
  );
};

const FriendsScreen = ({actionsheetVisible, setActionsheetVisible}) => {
  const handleClose = () => {
    setActionsheetVisible(false);
  };

  return (
    <Actionsheet
      isOpen={actionsheetVisible}
      onClose={handleClose}
      snapPoints={[80]}>
      <ActionsheetBackdrop />
      <ActionsheetContent
        sx={{
          _dark: {
            bg: '$backgroundDark950',
          },
        }}>
        <Box h="100%" w="100%">
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <ActionsheetScrollView>
            <Box w="100%">
              <FriendsList />
            </Box>
          </ActionsheetScrollView>
        </Box>
      </ActionsheetContent>
    </Actionsheet>
  );
};
export default FriendsScreen;
