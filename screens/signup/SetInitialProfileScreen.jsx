import React, {useEffect} from 'react';
import {
  AlertCircleIcon,
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  Center,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
  Heading,
  Input,
  InputField,
  Spinner,
} from '@gluestack-ui/themed';
import {RefreshCwIcon, UploadCloudIcon} from 'lucide-react-native';
import ImagePicker from 'react-native-image-crop-picker';

import api from '../../api';

const SetInitialProfileScreen = ({navigation}) => {
  const [avatarUrl, setAvatarUrl] = React.useState(
    'https://avatar.iran.liara.run/public/1',
  );
  const [isNameInvalid, setIsNameInvalid] = React.useState(false);
  const [nameInvalidText, setNameInvalidText] = React.useState('');
  const [name, setName] = React.useState('');
  const [isCompleteButtonDisabled, setIsCompleteButtonDisabled] =
    React.useState(true);
  const [isAvatarUploading, setIsAvatarUploading] = React.useState(false);

  const drawRandomAvatar = () => {
    const id = 1 + Math.floor(Math.random() * 100);
    setAvatarUrl(`https://avatar.iran.liara.run/public/${id}`);
  };

  useEffect(() => {
    drawRandomAvatar();
  }, []);

  useEffect(() => {
    if (name === '') {
      setIsCompleteButtonDisabled(true);
    } else {
      setIsCompleteButtonDisabled(false);
    }
  }, [name]);

  const handleChangeName = n => {
    if (n.length > 20) {
      setIsNameInvalid(true);
      setNameInvalidText('Name must be less than 20 characters.');
    } else {
      setIsNameInvalid(false);
    }
    setName(n);
  };

  const handlePressComplete = () => {
    setIsCompleteButtonDisabled(true);
    api
      .patch('/users/update-profile', {name: name, avatar: avatarUrl})
      .then(() => {
        navigation.navigate('HomeScreen');
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => {
        setIsCompleteButtonDisabled(false);
      });
  };

  const handlePressUpload = () => {
    setIsAvatarUploading(true);
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
          setAvatarUrl(r.data.filepath);
        })
        .catch(e => {
          console.log(e);
        })
        .finally(() => {
          setIsAvatarUploading(false);
        });
    });
  };

  return (
    <>
      <Center p="$4" h="$full">
        <Heading size="xl" color="$primary500" mb="$10" mt="-$20">
          Set Up Your Profile
        </Heading>
        <Avatar size="2xl" borderRadius="$full">
          <AvatarFallbackText>{name}</AvatarFallbackText>
          <AvatarImage source={{uri: avatarUrl}} alt="avatar" />
        </Avatar>

        <Box w="$3/4" mb="$6" mt="$10">
          <Button
            w="$full"
            mb="$4"
            onPress={handlePressUpload}
            isDisabled={isAvatarUploading}>
            {isAvatarUploading ? (
              <Spinner w="$full" color="$primary500" />
            ) : (
              <>
                <ButtonText>Upload </ButtonText>
                <ButtonIcon as={UploadCloudIcon} />
              </>
            )}
          </Button>

          <Button
            variant="outline"
            w="$full"
            onPress={() => drawRandomAvatar()}>
            <ButtonText>Random </ButtonText>
            <ButtonIcon as={RefreshCwIcon} color="$primary500" />
          </Button>
        </Box>

        <Box w="$3/4" mb="$10">
          <FormControl size="lg" isInvalid={isNameInvalid} isReadOnly={false}>
            <FormControlLabel mb="$1" justifyContent="center">
              <FormControlLabelText>Name</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type="email"
                placeholder="Your name in the app"
                onChangeText={handleChangeName}
              />
            </Input>
            <FormControlHelper>
              <FormControlHelperText>
                You can always change it later
              </FormControlHelperText>
            </FormControlHelper>
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>{nameInvalidText}</FormControlErrorText>
            </FormControlError>
          </FormControl>
        </Box>

        <Box position="absolute" bottom="$10">
          <Button
            size="lg"
            w="$full"
            onPress={handlePressComplete}
            isDisabled={isCompleteButtonDisabled || isNameInvalid}>
            {isCompleteButtonDisabled && isNameInvalid ? (
              <Spinner w="$full" textAlign="center" />
            ) : (
              <ButtonText w="$full" textAlign="center">
                COMPLETE
              </ButtonText>
            )}
          </Button>
        </Box>
      </Center>
    </>
  );
};
export default SetInitialProfileScreen;
