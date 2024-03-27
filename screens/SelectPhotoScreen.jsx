import React, {useState} from 'react';
import {View, Button} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';

const SelectPhotoScreen = ({route}) => {
  const {coordinates, addPin} = route.params;
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

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
        const source = {uri: response.assets[0].uri};
        // TODO: Use this `source` to display the selected photo or to do something else
      }
    });
  };

  return (
    <View>
      {/* TODO: Replace Button with GlueStack UI's button for aesthetics*/}
      <Button title="Select Photo" onPress={handleSelectPhoto} />
    </View>
  );
};

export default SelectPhotoScreen;
