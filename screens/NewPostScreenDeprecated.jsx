import React, {useState} from 'react';
import {View, TextInput, Button, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import api from '../api';

const NewPostScreen = ({route}) => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const {coordinates, addPin} = route.params;
  const [imagesToUpload, setImagesToUpload] = useState([]);

  const uploadImages = postId => {
    // upload images
    imagesToUpload.forEach(image => {
      let uploadImageFormData = new FormData();
      uploadImageFormData.append('image', {
        uri: image.uri,
        name: image.fileName,
        type: image.type,
      });
      uploadImageFormData.append('post_id', postId); // TODO: change placeholder
      console.debug('uploading image ' + image.uri);
      api
        .post('/posts/upload-post-image', uploadImageFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(r => {
          console.log('Successfully uploaded image. ');
        })
        .catch(e => {
          console.error(e);
        });
    });
  };

  const handleAddPin = async () => {
    // Add a new post for this pin
    let newPostRequest = {
      title: title,
      content: description,
    };

    let postId = null;
    let jsonString = JSON.stringify(newPostRequest);
    console.debug('create-post request JSON: ' + jsonString);
    console.log('Adding pin:', title, description, coordinates);
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

    const newPin = {
      coordinate: coordinates,
      title: title,
      description: description,
      postId: postId,
    };

    console.debug('newPin post id: ' + newPin.postId);
    addPin(newPin);

    navigation.goBack(); // Go back after adding the pin
  };

  const handleSelectPhoto = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        // const source = {uri: response.assets[0].uri};
        // TODO: do something with the image other than logging
        imagesToUpload.push(response.assets[0]);
        console.log('Images to upload: ', imagesToUpload[0]);
        console.debug('imagesToUpload : ' + imagesToUpload.toString());
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter title"
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
      />
      <Button title="Select Photos" onPress={handleSelectPhoto} />
      <Button title="Add Pin" onPress={handleAddPin} />
      <Button title="Cancel" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 16,
  },
});

export default NewPostScreen;
