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
import {SearchIcon, UserRoundPlusIcon} from 'lucide-react-native';
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
  {
    id: 4,
    name: 'Arlene McCoy',
    email: 'test@test.test',

    avatarUri:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 5,
    name: 'Arlene McCoy',
    email: 'test@test.test',
    avatarUri:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 6,
    name: 'Arlene McCoy',
    email: 'test@test.test',
    avatarUri:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 7,
    name: 'Arlene McCoy',
    email: 'test@test.test',
    avatarUri:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 8,
    name: 'Arlene McCoy',
    email: 'test@test.test',
    avatarUri:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  },
  // Add more friends as needed
];

const FriendsList = () => {
  return (
    <Box w="100%">
      <VStack space="2xl">
        {mockFriends.map(friend => (
          <FriendListItem
            key={friend.id}
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

const FriendsScreen = ({actionsheetVisible, setActionsheetVisible}) => {
  const [addingFriend, setAddingFriend] = React.useState(false);

  const handleClose = () => {
    setActionsheetVisible(false);
  };

  const handleClickAddFriend = () => {
    setAddingFriend(true);
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

              {addingFriend ? null : (
                <Button
                  size="lg"
                  variant="solid"
                  action="primary"
                  mb="$4"
                  onPress={handleClickAddFriend}>
                  <ButtonIcon as={UserRoundPlusIcon} />
                  <ButtonText> Add Friends </ButtonText>
                </Button>
              )}

              {addingFriend ? (
                <AddFriendScreen setAddingFriend={setAddingFriend} />
              ) : (
                <FriendsList />
              )}
            </Box>
          </ActionsheetScrollView>
        </Box>
      </ActionsheetContent>
    </Actionsheet>
  );
};
export default FriendsScreen;
