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
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogHeader,
  CloseIcon,
  AlertDialogBody,
  AlertDialogFooter,
} from '@gluestack-ui/themed';
import {
  ChevronRight,
  User,
  Settings,
  AsteriskSquare,
} from 'lucide-react-native';
import {jwtDecode} from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {decode} from 'base-64';
import {AlertDialogContent} from '@gluestack-ui/themed';
import {AlertDialogCloseButton} from '@gluestack-ui/themed';

global.atob = decode;

const LogoutAlertDialog = ({
  openLogoutAlertDialog,
  setOpenLogoutAlertDialog,
  navigation,
}) => {
  const handleClose = () => {
    setOpenLogoutAlertDialog(false);
  };

  const handleLogout = () => {
    AsyncStorage.removeItem('token')
      .then(() => {
        handleClose();
        navigation.replace('WelcomeScreen');
      })
      .catch(e => console.log(e));
  };

  return (
    <AlertDialog isOpen={openLogoutAlertDialog} onClose={handleClose}>
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Heading>Log Out</Heading>
          <AlertDialogCloseButton>
            <Icon as={CloseIcon} />
          </AlertDialogCloseButton>
        </AlertDialogHeader>
        <AlertDialogBody>
          <Text>Are you sure to log out?</Text>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button
            variant="outline"
            action="secondary"
            onPress={handleClose}
            mr="$3">
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button action="negative" onPress={handleLogout}>
            <ButtonText>Logout</ButtonText>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

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
    <HStack justifyContent="space-between">
      <HStack space="lg">
        <Icon as={icon} size="lg" mt="$1" />
        <Text size="lg">{text}</Text>
      </HStack>
      <Pressable>
        <Icon as={ChevronRight} />
      </Pressable>
    </HStack>
  );
};

const ButtonGroup = () => {
  return (
    <VStack space="xl">
      <BarButton icon={User} text="Change Name" />
      <BarButton icon={AsteriskSquare} text="Change Password" />
      <BarButton icon={Settings} text="Settings" />
    </VStack>
  );
};

const ProfileScreen = ({navigation, isActive}) => {
  const name = 'USER NAME';
  const [email, setEmail] = useState('');
  const [openLogoutAlertDialog, setOpenLogoutAlertDialog] =
    React.useState(false);

  useEffect(() => {
    AsyncStorage.getItem('token')
      .then(token => {
        setEmail(jwtDecode(token).email);
      })
      .catch(e => console.log(e));
  }, []);

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
        <ButtonGroup />
        <Divider />
      </VStack>

      <LogoutAlertDialog
        openLogoutAlertDialog={openLogoutAlertDialog}
        setOpenLogoutAlertDialog={setOpenLogoutAlertDialog}
        navigation={navigation}
      />

      <LogoutButton setOpenLogoutAlertDialog={setOpenLogoutAlertDialog} />
    </Box>
  );
};
export default ProfileScreen;
