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

const FriendListItem = ({
  id,
  avatarUri,
  name,
  email,
  withButton,
  addButtonText,
  handlePressAdd,
}) => {
  const addButtonDisabled = ['sent', 'accepted', 'yourself'].includes(
    addButtonText,
  );

  return (
    <Pressable>
      <HStack
        key={id}
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
            onPress={handlePressAdd}>
            <ButtonText>
              {addButtonText.charAt(0).toUpperCase() +
                addButtonText.slice(1) +
                ' '}
            </ButtonText>
            <ButtonIcon as={addButtonDisabled ? Check : AddIcon} />
          </Button>
        )}
      </HStack>
    </Pressable>
  );
};

export default FriendListItem;
