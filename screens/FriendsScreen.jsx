import React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Actionsheet,
  ActionsheetDragIndicatorWrapper,
  ActionsheetDragIndicator,
  ActionsheetScrollView,
  ActionsheetBackdrop,
  ActionsheetContent,
} from '@gluestack-ui/themed';

const mockFriends = [
  {
    id: 1,
    name: 'Ronald Richards',
    role: 'Nursing Assistant',
    avatarUri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 2,
    name: 'Arlene McCoy',
    role: 'Marketing Coordinator',
    avatarUri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 3,
    name: 'Arlene McCoy',
    role: 'Marketing Coordinator',
    avatarUri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 4,
    name: 'Arlene McCoy',
    role: 'Marketing Coordinator',
    avatarUri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 5,
    name: 'Arlene McCoy',
    role: 'Marketing Coordinator',
    avatarUri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 6,
    name: 'Arlene McCoy',
    role: 'Marketing Coordinator',
    avatarUri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 7,
    name: 'Arlene McCoy',
    role: 'Marketing Coordinator',
    avatarUri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 8,
    name: 'Arlene McCoy',
    role: 'Marketing Coordinator',
    avatarUri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 9,
    name: 'Arlene McCoy',
    role: 'Marketing Coordinator',
    avatarUri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  },
  // Add more friends as needed
];

const FriendsList = () => {
  return (
    <Box w="100%">
      <Heading>Friends List</Heading>
      <VStack space="2xl">
        {mockFriends.map((friend) => (
          <HStack key={friend.id} space="md">
            <Avatar>
              <AvatarFallbackText>SS</AvatarFallbackText>
              <AvatarImage
                source={{
                  uri: friend.avatarUri,
                }}
              />
            </Avatar>
            <VStack>
              <Heading size="sm">{friend.name}</Heading>
              <Text size="sm">{friend.role}</Text>
            </VStack>
          </HStack>
        ))}
      </VStack>
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
