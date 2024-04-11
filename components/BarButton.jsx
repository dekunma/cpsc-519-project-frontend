import React from 'react';
import {HStack, Icon, Text, Pressable} from '@gluestack-ui/themed';
import {ChevronRight} from 'lucide-react-native';

const BarButton = ({
  icon,
  text,
  onPress,
  secondaryText = '',
  isDisabled = false,
}) => {
  return (
    <Pressable onPress={isDisabled ? undefined : onPress}>
      <HStack justifyContent="space-between" alignItems="center">
        <HStack space="lg">
          <Icon as={icon} size="lg" mt="$1" />
          <Text size="lg">{text}</Text>
        </HStack>

        <HStack alignItems="center">
          <Text color="$secondary300" mr="$2">
            {secondaryText}
          </Text>
          <Icon as={ChevronRight} />
        </HStack>
      </HStack>
    </Pressable>
  );
};

export default BarButton;
