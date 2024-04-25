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
  Spinner,
} from '@gluestack-ui/themed';
import {ArrowLeftIcon} from 'lucide-react-native';
import BarButton from '../components/BarButton';
import {User} from 'lucide-react-native';
import api from '../api';
import {uploadImagesHelper} from "../utils/UploadImages";

const NewPostScreen = ({navigation, route}) => {
  const {coordinates, images} = route.params;
  const [imagesToUpload, setImagesToUpload] = useState([]);
  const [gridImages, setGridImages] = useState([]); // [ [img1, img2, img3], [img4, img5, img6], ...]
  const [description, setDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const chunkArrBySize = (arr, size) =>
      Array.from({length: Math.ceil(arr.length / size)}, (_, i) =>
        arr.slice(i * size, i * size + size),
      );

    const chunked = chunkArrBySize(images, 3);
    setGridImages(chunked);
    setImagesToUpload(images);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const uploadImages = postId => {
    // upload images
    uploadImagesHelper(imagesToUpload, postId, setIsUploading)
        .then(r => {navigation.replace('HomeScreen');});
  };

  const handleAddPin = async () => {
    setIsUploading(true);
    // Add a new post for this pin
    let newPostRequest = {
      content: description,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    };

    let postId = null;
    let jsonString = JSON.stringify(newPostRequest);
    console.debug('create-post request JSON: ' + jsonString);
    console.log('Adding pin:', description, coordinates);
    try {
      const response = await api.post('/posts/create-post', jsonString, {
        headers: {
          'Content-Type': 'text/plain',
        },
      });

      postId = response.data.post_id;
      uploadImages(postId);
      console.log('Successfully added new post. Post ID = ' + postId);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View py="$4" px="$6">
      {/* Header */}
      <HStack justifyContent="space-between" alignItems="center">
        <Pressable onPress={() => navigation.goBack()}>
          <Icon as={ArrowLeftIcon} size="xl" />
        </Pressable>
        <Button isDisabled={isUploading} onPress={handleAddPin}>
          {isUploading ? (
            <Spinner textAlign="center" />
          ) : (
            <ButtonText>Post</ButtonText>
          )}
        </Button>
      </HStack>

      <Textarea
        mt="$8"
        mx="$1"
        justifyContent="center"
        w="$full"
        isDisabled={isUploading}>
        <TextareaInput
          placeholder="Say something..."
          onChangeText={t => setDescription(t)}
        />
      </Textarea>

      <Box mt="$4">
        {gridImages.length !== 0
          ? gridImages.map(imageGroup => (
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
          isDisabled={isUploading}
        />
        <Divider />
      </VStack>
    </View>
  );
};

export default NewPostScreen;
