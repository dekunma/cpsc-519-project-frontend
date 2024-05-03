import React, {useEffect, useState} from 'react';

import {
  Text,
  Heading,
  Avatar,
  VStack,
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
  User,
  AsteriskSquare,
  AlertCircleIcon,
  CircleUserRound,
} from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';

import Dialog from '../components/Dialog';
import api from '../api';
import BarButton from '../components/BarButton';

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

const ButtonGroup = ({setName, setAvatar}) => {
  const [openChangeNameDialog, setOpenChangeNameDialog] = useState(false);
  const [openChangePasswordDialog, setOpenChangePasswordDialog] =
    useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordInvalidText, setPasswordInvalidText] = useState('');
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
      })
      .catch(e => console.log(e));
  };

  const handleChangeAvatar = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      cropperCircleOverlay: true,
    }).then(image => {
      let formData = new FormData();
      formData.append('avatar', {
        uri: image.path,
        name: image.path.substring(image.path.lastIndexOf('/') + 1),
        type: image.mime,
      });

      api
        .post('/users/upload-avatar', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(r => {
          setAvatar(r.data.filepath);
        })
        .catch(e => {
          console.log(e);
        });
    });
  };

  const validatePassword = () => {
    if (newPassword.length < 8) {
      setIsPasswordInvalid(true);
      setPasswordInvalidText('Password must be at least 8 characters.');
      return false;
    }

    if (newPassword !== confirmNewPassword) {
      setIsPasswordInvalid(true);
      setPasswordInvalidText('The two passwords you entered do not match.');
      return false;
    }

    return true;
  };

  const handleChangePassword = () => {
    setIsPasswordInvalid(false);

    if (!validatePassword()) {
      return;
    }

    api
      .patch('/users/change-password', {new_password: newPassword})
      .then(() => {
        setOpenChangePasswordDialog(false);
      })
      .catch(e => console.log(e));
  };

  return (
    <>
      <Dialog
        isOpen={openChangePasswordDialog}
        setIsOpen={setOpenChangePasswordDialog}
        title="Change Password"
        isNegative={false}
        confirmButtonText="Update"
        handleConfirm={handleChangePassword}>
        <FormControl w="$full" size="lg" mb="$4" isInvalid={isPasswordInvalid}>
          <Input>
            <InputField
              onChangeText={e => setNewPassword(e)}
              type="password"
              placeholder="New Password"
            />
          </Input>
        </FormControl>
        <FormControl w="$full" size="lg" isInvalid={isPasswordInvalid}>
          <Input>
            <InputField
              onChangeText={e => setConfirmNewPassword(e)}
              type="password"
              placeholder="Confirm New Password"
            />
          </Input>
          <FormControlHelper>
            <FormControlHelperText>
              New password must have at least 8 characters.
            </FormControlHelperText>
          </FormControlHelper>
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>{passwordInvalidText}</FormControlErrorText>
          </FormControlError>
        </FormControl>
      </Dialog>

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
        <Divider />
        <BarButton
          icon={CircleUserRound}
          text="Change Avatar"
          onPress={handleChangeAvatar}
        />
        <Divider />
        <BarButton
          icon={AsteriskSquare}
          text="Change Password"
          onPress={() => setOpenChangePasswordDialog(true)}
        />
        {/* <BarButton icon={Settings} text="Settings" /> */}
      </VStack>
    </>
  );
};

const ProfileScreen = ({navigation, isActive}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState(
    'https://avatar.iran.liara.run/public/1',
  );
  const [openLogoutAlertDialog, setOpenLogoutAlertDialog] =
    React.useState(false);

  useEffect(() => {
    api
      .get('/users/profile')
      .then(response => {
        setName(response.data.name);
        setEmail(response.data.email);
        setAvatar(response.data.avatar);
      })
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
              <AvatarImage source={{uri: avatar}} alt={name} />
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
        <ButtonGroup setName={setName} setAvatar={setAvatar} />
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
