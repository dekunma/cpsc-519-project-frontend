import React, {useEffect, useState} from 'react';

import {
  HStack,
  Text,
  Heading,
  Avatar,
  VStack,
  Icon,
  Pressable,
  AvatarImage,
  AvatarFallbackText,
  Center,
  Box,
  ButtonText,
  Button,
  Divider,
  FormControl,
  Input,
  InputField,
  FormControlHelper,
  FormControlHelperText,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
} from '@gluestack-ui/themed';
import {
  ChevronRight,
  User,
  Settings,
  AsteriskSquare,
  AlertCircleIcon,
} from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Dialog from '../components/Dialog';

import api from '../api';

const LogoutButton = ({setOpenLogoutAlertDialog}) => {
  return (
    <Center>
      <Box w="$5/6" borderRadius="$sm" mb="$4">
        <Button
          size="lg"
          action="negative"
          placement="bottom center"
          onPress={() => setOpenLogoutAlertDialog(true)}
          variant="outline">
          <ButtonText>Log Out</ButtonText>
        </Button>
      </Box>
    </Center>
  );
};

const BarButton = ({icon, text, onPress}) => {
  return (
    <Pressable onPress={onPress}>
      <HStack justifyContent="space-between">
        <HStack space="lg">
          <Icon as={icon} size="lg" mt="$1" />
          <Text size="lg">{text}</Text>
        </HStack>

        <Icon as={ChevronRight} />
      </HStack>
    </Pressable>
  );
};

const ButtonGroup = ({setName}) => {
  const [openChangeNameDialog, setOpenChangeNameDialog] = useState(false);
  const [isNewNameInvalid, setIsNewNameInvalid] = useState(false);
  const [nameError, setNameError] = useState('');
  const [newName, setNewName] = useState('');

  const handleChangeText = text => {
    if (text.length > 20) {
      setIsNewNameInvalid(true);
      setNameError('Name must be less than 20 characters.');
    } else {
      setIsNewNameInvalid(false);
    }
    setNewName(text);
  };

  const handleChangeName = () => {
    if (isNewNameInvalid) {
      return;
    }

    if (newName === '') {
      setIsNewNameInvalid(true);
      setNameError('Name must not be empty.');
      return;
    }

    api
      .patch('/users/update-profile', {name: newName})
      .then(() => {
        setName(newName);
        setOpenChangeNameDialog(false);
        AsyncStorage.setItem('user_name', newName);
      })
      .catch(e => console.log(e));
  };

  return (
    <>
      <Dialog
        isOpen={openChangeNameDialog}
        setIsOpen={setOpenChangeNameDialog}
        title="Change Name"
        isNegative={false}
        confirmButtonText="Update Name"
        handleConfirm={handleChangeName}>
        <FormControl size="lg" isInvalid={isNewNameInvalid}>
          <Input>
            <InputField
              placeholder="New Name"
              onChangeText={t => handleChangeText(t)}
            />
          </Input>
          <FormControlHelper>
            <FormControlHelperText>
              Must be less than 20 characters.
            </FormControlHelperText>
          </FormControlHelper>
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>{nameError}</FormControlErrorText>
          </FormControlError>
        </FormControl>
      </Dialog>
      <VStack space="xl">
        <BarButton
          icon={User}
          text="Change Name"
          onPress={() => setOpenChangeNameDialog(true)}
        />
        <BarButton icon={AsteriskSquare} text="Change Password" />
        <BarButton icon={Settings} text="Settings" />
      </VStack>
    </>
  );
};

const ProfileScreen = ({navigation, isActive}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [openLogoutAlertDialog, setOpenLogoutAlertDialog] =
    React.useState(false);

  useEffect(() => {
    AsyncStorage.getItem('user_email')
      .then(r => setEmail(r))
      .catch(e => console.log(e));

    AsyncStorage.getItem('user_name')
      .then(r => setName(r))
      .catch(e => console.log(e));
  }, []);

  const handleLogout = () => {
    AsyncStorage.removeItem('token')
      .then(() => {
        setOpenLogoutAlertDialog(false);
        navigation.replace('WelcomeScreen');
      })
      .catch(e => console.log(e));
  };

  return (
    <Box style={{display: isActive ? 'flex' : 'none'}} flex={1}>
      <VStack px="$5" py="$4" space="lg" flex={1}>
        <Heading size="lg">Profile</Heading>
        <Center mt="$10">
          <Pressable onPress={() => console.log('Avatar pressed')}>
            <Avatar size="2xl" borderRadius="$full">
              <AvatarFallbackText>{name}</AvatarFallbackText>
              <AvatarImage
                source={{
                  uri: 'https://avatar.iran.liara.run/public/2',
                }}
                alt={name}
              />
            </Avatar>
          </Pressable>

          <Heading size="2xl" mt="$3" color="$primary500">
            {name}
          </Heading>

          <Heading size="md" mt="$3" color="$textLight500">
            {email}
          </Heading>
        </Center>

        <Divider mt="$10" />
        <ButtonGroup setName={setName} />
        <Divider />
      </VStack>

      <Dialog
        isOpen={openLogoutAlertDialog}
        setIsOpen={setOpenLogoutAlertDialog}
        title="Log Out"
        isNegative={true}
        confirmButtonText="Log Out"
        handleConfirm={handleLogout}>
        <Text>Are you sure to log out?</Text>
      </Dialog>

      <LogoutButton setOpenLogoutAlertDialog={setOpenLogoutAlertDialog} />
    </Box>
  );
};
export default ProfileScreen;
