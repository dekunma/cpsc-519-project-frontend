import React from 'react';

import {
  Heading,
  Text,
  VStack,
  HStack,
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Pressable,
  Button,
  ButtonText,
  ButtonIcon,
  AddIcon,
} from '@gluestack-ui/themed';
import {Check} from 'lucide-react-native';

const FriendListItem = ({key, avatarUri, name, email, withButton}) => {
  const [addButtonDisabled, setAddButtonDisabled] = React.useState(false);

  const handleClickAdd = () => {
    setAddButtonDisabled(true);
    setTimeout(() => {
      setAddButtonDisabled(false);
    }, 2000);
  };

  return (
    <Pressable>
      <HStack
        key={key}
        space="md"
        justifyContent={withButton ? 'space-around' : 'none'}
        alignItems="center">
        <Avatar>
          <AvatarFallbackText>{name}</AvatarFallbackText>
          <AvatarImage
            source={{
              uri: avatarUri,
            }}
            alt="avatar"
          />
        </Avatar>
        <VStack>
          <Heading size="sm">{name}</Heading>
          <Text size="sm">{email}</Text>
        </VStack>

        {withButton && (
          <Button
            size="md"
            variant="outlined"
            action="primary"
            w="$1/3"
            isDisabled={addButtonDisabled}
            onPress={handleClickAdd}>
            <ButtonText>{addButtonDisabled ? 'Sent' : 'Add'} </ButtonText>
            <ButtonIcon as={addButtonDisabled ? Check : AddIcon} />
          </Button>
        )}
      </HStack>
    </Pressable>
  );
};

export default FriendListItem;
