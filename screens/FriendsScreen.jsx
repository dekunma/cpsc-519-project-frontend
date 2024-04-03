import React from 'react';
import {
  Box,
  Heading,
  VStack,
  Actionsheet,
  ActionsheetDragIndicatorWrapper,
  ActionsheetDragIndicator,
  ActionsheetScrollView,
  ActionsheetBackdrop,
  ActionsheetContent,
  Button,
  ButtonText,
  ButtonIcon,
  InputField,
  Input,
  InputIcon,
  InputSlot,
} from '@gluestack-ui/themed';
import {SearchIcon, UserRoundPlusIcon, ContactIcon} from 'lucide-react-native';
import FriendListItem from '../components/FriendListItem';

const mockFriends = [
  {
    id: 1,
    name: 'Ronald Richards',
    email: 'test@test.test',
    avatarUri:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 2,
    name: 'Arlene McCoy',
    email: 'test@test.test',
    avatarUri:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 3,
    name: 'Arlene McCoy',
    email: 'test@test.test',
    avatarUri:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  },
  // Add more friends as needed
];

const mockFriendRequests = [
  {
    id: 1,
    name: 'Ronald Richards',
    email: 'test@test.test',
    avatarUri:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 2,
    name: 'Arlene McCoy',
    email: 'test@test.test',

    avatarUri:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  },
  // Add more mock requests as needed
];

const FriendsList = () => {
  return (
    <Box w="100%">
      <VStack space="2xl">
        {mockFriends.map(friend => (
          <FriendListItem
            key={friend.id}
            id={friend.id}
            avatarUri={friend.avatarUri}
            name={friend.name}
            email={friend.email}
          />
        ))}
      </VStack>
    </Box>
  );
};

const AddFriendScreen = ({setAddingFriend}) => {
  const [email, setEmail] = React.useState('');
  const [isSearchButtonDisabled, setIsSearchButtonDisabled] =
    React.useState(false);

  const onEmailChange = e => {
    setEmail(e.trim());
  };

  return (
    <Box>
      <Input variant="outline" size="lg">
        <InputSlot>
          <InputIcon as={SearchIcon} ml="$2" />
        </InputSlot>
        <InputField placeholder="Email" onChangeText={onEmailChange} />
      </Input>

      <Button
        size="lg"
        variant="solid"
        action="primary"
        mt="$4"
        onPress={() => {}}
        isDisabled={isSearchButtonDisabled || email === ''}>
        <ButtonText>Search by Email</ButtonText>
      </Button>

      <Button
        size="lg"
        variant="link"
        action="negative"
        mt="$2"
        onPress={() => setAddingFriend(false)}>
        <ButtonText>Cancel</ButtonText>
      </Button>

      <Box mt="$8">
        <FriendListItem
          key={1}
          avatarUri={mockFriends[0].avatarUri}
          name={mockFriends[0].name}
          email={mockFriends[0].email}
          withButton={true}
        />
      </Box>
    </Box>
  );
};

const FriendRequestScreen = ({setCheckFriendRequest}) => {
  const handleAccept = id => {
    console.log('Accepted Request:', id);
    // Implement logic to accept friend request
  };

  const handleDismiss = id => {
    console.log('Dismissed Request:', id);
    // Implement logic to dismiss friend request
  };

  return (
    <Box w="100%">
      <Button
        size="lg"
        variant="link"
        action="negative"
        mt="$2"
        onPress={() => setCheckFriendRequest(false)}>
        <ButtonText>Cancel</ButtonText>
      </Button>

      <VStack space="2xl">
        {mockFriendRequests.map(request => (
          <Box
            key={request.id}
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            p="$2">
            <FriendListItem
              id={request.id}
              avatarUri={request.avatarUri}
              name={request.name}
              email={request.email}
            />
            <Box flexDirection="row">
              <Button
                size="sm"
                variant="solid"
                onPress={() => handleAccept(request.id)}>
                <ButtonText>Accept</ButtonText>
              </Button>
              <Button
                size="sm"
                variant="outline"
                mr="$2"
                onPress={() => handleDismiss(request.id)}>
                <ButtonText>Dismiss</ButtonText>
              </Button>
            </Box>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

const FriendsScreen = ({actionsheetVisible, setActionsheetVisible}) => {
  const [addingFriend, setAddingFriend] = React.useState(false);
  const [checkFriendRequest, setCheckFriendRequest] = React.useState(false);

  const handleClose = () => {
    setActionsheetVisible(false);
  };

  const handleClickAddFriend = () => {
    setAddingFriend(true);
  };

  const handleClickedCheckFriendRequest = () => {
    setCheckFriendRequest(true);
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
              <Heading mt="$2" textAlign="center" mb="$2" size="xl">
                Friends
              </Heading>

              {addingFriend ? (
                <AddFriendScreen setAddingFriend={setAddingFriend} />
              ) : (
                !checkFriendRequest && ( // don't show the button when checking friend request
                  <Button
                    size="lg"
                    variant="solid"
                    action="primary"
                    mb="$4"
                    onPress={handleClickAddFriend}>
                    <ButtonIcon as={UserRoundPlusIcon} />
                    <ButtonText> Add Friends </ButtonText>
                  </Button>
                )
              )}

              {checkFriendRequest ? (
                <FriendRequestScreen
                  setCheckFriendRequest={setCheckFriendRequest}
                />
              ) : (
                !addingFriend && ( // don't show the button when adding friend
                  <Button
                    size="lg"
                    variant="solid"
                    action="primary"
                    mb="$4"
                    onPress={handleClickedCheckFriendRequest}>
                    <ButtonIcon as={ContactIcon} />
                    <ButtonText> Friend Requests </ButtonText>
                  </Button>
                )
              )}

              {/* when not adding friend or check friend request, show the friend list */}
              {!addingFriend && !checkFriendRequest ? <FriendsList /> : null}
            </Box>
          </ActionsheetScrollView>
        </Box>
      </ActionsheetContent>
    </Actionsheet>
  );
};
export default FriendsScreen;
