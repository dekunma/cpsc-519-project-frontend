import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Image} from '@gluestack-ui/themed';
import {useNavigation} from '@react-navigation/native';
import api from '../api';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import RNFS from 'react-native-fs';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
  MenuProvider,
} from 'react-native-popup-menu';
import UploadPhotosButton from '../components/UploadPhotosButton';
import {UploadIcon} from 'lucide-react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {uploadImagesHelper} from '../utils/UploadImages';

const window = Dimensions.get('window');
const PAGE_WIDTH = window.width;
const colors = [
  '#26292E',
  '#899F9C',
  '#B3C680',
  '#5C6265',
  '#F5D399',
  '#F1F1F1',
];

const PinDetailScreen = ({route}) => {
  // Extracting pin details passed as navigation parameter
  const {pinDetails} = route.params;
  const navigation = useNavigation();
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  console.debug('pinDetails = ' + JSON.stringify(pinDetails));
  useEffect(() => {
    api
      .get(`/posts/get-post-images?post_id=${pinDetails.postId}`)
      .then(response => {
        console.debug(
          "response.data['images'].length = " + response.data.images.length,
        );
        if (response.data.images.length > 0) {
          const newImages = response.data.images.map(image => image.file_path);
          setImages(newImages); // update the state
          console.debug('images stored: ' + JSON.stringify(images));
        }
        console.log(
          'Response from get post images: ' + JSON.stringify(response.data),
        );
      })
      .catch(e => console.log(e.response.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = ({item}) => {
    const saveImage = async () => {
      const date = new Date();
      const timestamp = date.getTime();
      const path = `${RNFS.DocumentDirectoryPath}/${timestamp}.jpg`;

      RNFS.downloadFile({
        fromUrl: item,
        toFile: path,
      }).promise.then(res => {
        if (res.statusCode === 200) {
          Alert.alert('Image saved successfully');
        } else {
          Alert.alert('Failed to save image');
        }
      });
    };

    const handleLongPress = () => {
      Alert.alert(
        'Save Image',
        'Do you want to save this image?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {text: 'OK', onPress: saveImage},
        ],
        {cancelable: false},
      );
    };

    return (
      <TouchableWithoutFeedback onLongPress={handleLongPress}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Menu>
            <MenuTrigger>
              <Image
                source={{uri: item}}
                style={{width: Dimensions.get('window').width, height: '100%'}}
                resizeMode="cover"
                alt="Image from post"
              />
            </MenuTrigger>
            <MenuOptions>
              <MenuOption onSelect={saveImage} text="Save Image" />
            </MenuOptions>
          </Menu>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  console.debug('PAGE_WIDTH = ' + PAGE_WIDTH);

  const [isVertical, setIsVertical] = React.useState(true);
  const [autoPlay, setAutoPlay] = React.useState(false);
  const [pagingEnabled, setPagingEnabled] = React.useState(true);
  const [snapEnabled, setSnapEnabled] = React.useState(true);
  const progressValue = useSharedValue(0);
  const baseOptions = {
    vertical: true,
    width: PAGE_WIDTH * 1.0,
    height: PAGE_WIDTH * 1.0,
  };

  const handleSelectPhoto = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 9,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        uploadImagesHelper(
          response.assets,
          pinDetails.postId,
          setIsUploading,
          navigation,
        );
      }
    });
  };

  return (
    <MenuProvider>
      <View style={styles.container}>
        <Text style={styles.description}>{pinDetails.description}</Text>
        {/*<Text style={styles.postId}>{pinDetails.postId}</Text>*/}
        {/* Displaying latitude and longitude */}
        {/*<Text>Latitude: {pinDetails.coordinate.latitude}</Text>*/}
        {/*<Text>Longitude: {pinDetails.coordinate.longitude}</Text>*/}
        {/* Display the images associated with this post */}
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Carousel
            {...baseOptions}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              width: PAGE_WIDTH,
              height: PAGE_WIDTH * 0.5,
            }}
            loop
            pagingEnabled={pagingEnabled}
            snapEnabled={snapEnabled}
            autoPlay={autoPlay}
            autoPlayInterval={1500}
            onProgressChange={(_, absoluteProgress) =>
              (progressValue.value = absoluteProgress)
            }
            mode="parallax"
            modeConfig={{
              parallaxScrollingScale: 0.9,
              parallaxScrollingOffset: 50,
            }}
            data={images}
            renderItem={({index}) => renderItem({item: images[index], index})}
          />
          {!!progressValue && (
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: 5,
                alignSelf: 'center',
                position: 'absolute',
                right: 5,
                top: 40,
              }}>
              {images.map((backgroundColor, index) => {
                return (
                  <PaginationItem
                    backgroundColor={backgroundColor}
                    animValue={progressValue}
                    index={index}
                    key={index}
                    isRotate={isVertical}
                    length={images.length}
                  />
                );
              })}
            </View>
          )}
        </View>
        <UploadPhotosButton
          isActive={true}
          buttonText="Upload Photos"
          icon={UploadIcon}
          bg="$emerald500"
          callbackFn={handleSelectPhoto}
        />
        <Button title="go back" onPress={() => navigation.goBack()} />
      </View>
    </MenuProvider>
  );
};

const PaginationItem = props => {
  const {animValue, index, length, backgroundColor, isRotate} = props;
  const width = 5;

  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [-width, 0, width];

    if (index === 0 && animValue?.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = [-width, 0, width];
    }

    return {
      transform: [
        {
          translateX: interpolate(
            animValue?.value,
            inputRange,
            outputRange,
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  }, [animValue, index, length]);
  return (
    <View
      style={{
        backgroundColor: 'white',
        width,
        height: width,
        borderRadius: 50,
        overflow: 'hidden',
        transform: [
          {
            rotateZ: isRotate ? '90deg' : '0deg',
          },
        ],
      }}>
      <Animated.View
        style={[
          {
            borderRadius: 50,
            backgroundColor,
            flex: 1,
          },
          animStyle,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  description: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
  },
  postId: {
    fontSize: 14,
    marginBottom: 10,
  },
  imageList: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});

export default PinDetailScreen;
