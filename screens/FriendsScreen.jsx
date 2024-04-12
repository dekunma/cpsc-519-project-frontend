import React, {useEffect} from 'react';
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
  Center,
  Icon,
  Text,
  Spinner,
} from '@gluestack-ui/themed';
import {
  SearchIcon,
  UserRoundPlusIcon,
  ContactIcon,
  ConstructionIcon,
  InfinityIcon,
  ArrowLeftIcon,
} from 'lucide-react-native';
import FriendListItem from '../components/FriendListItem';
import api from '../api';

import {jwtDecode} from 'jwt-decode';
import {decode} from 'base-64';
import AsyncStorage from '@react-native-async-storage/async-storage';

global.atob = decode;

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
  const [friendsData, setFriendsData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    api
      .get('/friendships/all-friends')
      .then(response => {
        setFriendsData(response.data.friends);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Box w="100%">
      <VStack space="2xl" mt="$4">
        {friendsData.length === 0 && (
          <Center>
            <Icon as={loading ? InfinityIcon : ConstructionIcon} size="xl" />
            <Text>{loading ? 'loading...' : 'No friends yet'}</Text>
          </Center>
        )}

        {friendsData.map(friend => (
          <FriendListItem
            key={friend.id}
            id={friend.id}
            avatarUri={friend.avatar}
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

  const [userData, setUserData] = React.useState({});
  const [noResult, setNoResult] = React.useState(false);
  const [friendshipButtonText, setFriendshipButtonText] = React.useState('Add');

  const onEmailChange = e => {
    setEmail(e.trim());
  };

  const handleSearchPress = () => {
    setIsSearchButtonDisabled(true);
    api
      .get(`/friendships/email/${email}`)
      .then(response => {
        console.log(response.data);
        setUserData(response.data.user);
        let requestStatus = response.data.request_status;
        if (requestStatus === 'unsent') {
          requestStatus = 'Add';
        }
        setFriendshipButtonText(requestStatus);
        setNoResult(false);
      })
      .catch(() => {
        setNoResult(true);
        setUserData({});
      })
      .finally(() => {
        setIsSearchButtonDisabled(false);
      });
  };

  const handlePressAdd = async () => {
    const token = await AsyncStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userEmail = decodedToken.email;
    console.log(userEmail);

    api
      .post('/friendships/friend-invitations', {
        user_email: userEmail,
        friend_email: email,
      })
      .then(response => {
        console.log(response.data);
        setFriendshipButtonText('sent');
      });
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
        onPress={handleSearchPress}
        isDisabled={isSearchButtonDisabled || email === ''}>
        {isSearchButtonDisabled ? (
          <Spinner w="$full" textAlign="center" />
        ) : (
          <ButtonText>Search by Email</ButtonText>
        )}
      </Button>

      <Button
        size="lg"
        variant="link"
        mt="$2"
        onPress={() => setAddingFriend(false)}>
        <ButtonText>Back</ButtonText>
      </Button>

      <Box mt="$8">
        {userData.id && (
          <FriendListItem
            id={userData.id}
            avatarUri={userData.avatar}
            name={userData.name}
            email={userData.email}
            withButton={true}
            addButtonText={friendshipButtonText}
            handlePressAdd={handlePressAdd}
          />
        )}

        {noResult && (
          <Center>
            <Icon as={ConstructionIcon} size="xl" />
            <Text>No user with this email</Text>
          </Center>
        )}
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
      <Button size="lg" mt="$2" onPress={() => setCheckFriendRequest(false)}>
        <ButtonIcon as={ArrowLeftIcon} />
        <ButtonText> Back</ButtonText>
      </Button>

      <VStack space="2xl" mt="$4">
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
            <Box w="100%" px="$4">
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
