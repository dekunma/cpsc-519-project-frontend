import React, {useEffect, useState} from 'react';

import {
  View,
  HStack,
  Icon,
  Button,
  ButtonText,
  Pressable,
  Textarea,
  TextareaInput,
  Box,
  Image,
  VStack,
  Divider,
} from '@gluestack-ui/themed';
import {ArrowLeftIcon} from 'lucide-react-native';
import BarButton from '../components/BarButton';
import {User} from 'lucide-react-native';

const NewPostScreen = ({navigation, route}) => {
  const {coordinates, addPin, images} = route.params;
  const [imagesToUpload, setImagesToUpload] = useState([]);

  useEffect(() => {
    const chunkArrBySize = (arr, size) =>
      Array.from({length: Math.ceil(arr.length / size)}, (_, i) =>
        arr.slice(i * size, i * size + size),
      );

    const chunked = chunkArrBySize(images, 3);
    setImagesToUpload(chunked);
    console.log('imagesToUpload', chunked);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View py="$4" px="$6">
      {/* Header */}
      <HStack justifyContent="space-between" alignItems="center">
        <Pressable onPress={() => navigation.goBack()}>
          <Icon as={ArrowLeftIcon} size="xl" />
        </Pressable>
        <Button>
          <ButtonText>Post</ButtonText>
        </Button>
      </HStack>

      <Textarea mt="$8" mx="$1" justifyContent="center" w="$full">
        <TextareaInput placeholder="Say something..." />
      </Textarea>

      <Box mt="$4">
        {imagesToUpload.length !== 0
          ? imagesToUpload.map(imageGroup => (
              <HStack mt="$4" h="$32" space="xs">
                {imageGroup.map(image => (
                  <Box h="$full" w="$1/3">
                    <Image
                      source={{
                        uri: image.uri,
                      }}
                      alt="image"
                      key={image.filename}
                      h="$full"
                      w="$full"
                    />
                  </Box>
                ))}
              </HStack>
            ))
          : null}
      </Box>

      <VStack space="xl" mt="$8">
        <Divider />
        <BarButton
          icon={User}
          text="Visible To"
          onPress={() => console.log('To be implemented')}
          secondaryText="Everyone"
        />
        <Divider />
      </VStack>
    </View>
  );
};

export default NewPostScreen;
