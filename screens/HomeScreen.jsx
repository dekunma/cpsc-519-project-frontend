import React, {useEffect, useRef, useState} from 'react';
import {Box, Fab, FabIcon, FabLabel, View, AddIcon} from '@gluestack-ui/themed';
import {Home, User, Users} from 'lucide-react-native';
import BottomNavigation from '../components/BottomNavigation';
import MapView, {Marker} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import ProfileScreen from './ProfileScreen';
import {launchImageLibrary} from 'react-native-image-picker';
import {UploadIcon, X} from 'lucide-react-native';
import api from '../api';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Config from 'react-native-config';
const {GOOGLE_MAPS_API_KEY} = Config;

const bottomTabs = [
  {
    icon: Home,
    label: 'Home',
  },
  {
    icon: Users,
    label: 'Friends',
  },
  {
    icon: User,
    label: 'Profile',
  },
];

class Pin {
  constructor(coordinate, description, postId, color, draggable, onDragEnd) {
    this.coordinate = coordinate;
    this.description = description;
    this.postId = postId;
    this.color = color;
    this.draggable = draggable;
    this.onDragEnd = onDragEnd;
  }
}

const BottomFab = ({
  isActive,
  onPress,
  buttonText,
  icon,
  bg = '$primary500',
}) => {
  return (
    <Box
      w="$full"
      borderRadius="$md"
      style={{display: isActive ? 'flex' : 'none'}}>
      <Fab size="lg" placement="bottom center" onPress={onPress} bg={bg}>
        <FabIcon as={icon} mr="$1" />
        <FabLabel>{buttonText}</FabLabel>
      </Fab>
    </Box>
  );
};

const MapScreenContent = ({
  isActive,
  initialRegion,
  setCurrentCenter,
  pins,
}) => {
  // TODO: should be refactored later to be reusable by both HomeScreen and PinDetail Screen.
  const navigation = useNavigation(); // TODO: Hook to get access to navigation, later it should fetch the user's location

  // Navigate to a detail screen with pin info
  const handlePinPress = pin => {
    navigation.navigate('PinDetailScreen', {
      pinDetails: pin,
    });
  };

  return (
    <View style={{display: isActive ? 'flex' : 'none', flex: 1}}>
      <MapView
        style={{flex: 1}}
        region={initialRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
        provider={MapView.PROVIDER_GOOGLE}
        mapPadding={{top: 80}}>
        {pins.map(
          (
            pin,
            index, // TODO: Fetch data from db later
          ) => (
            <Marker
              key={index}
              coordinate={pin.coordinate}
              description={pin.description}
              postId={pin.postId}
              onPress={() => handlePinPress(pin)}
              pinColor={pin.color}
              draggable={pin.draggable}
              onDragEnd={pin.onDragEnd}
            />
          ),
        )}
      </MapView>
    </View>
  );
};

const HomeScreen = ({navigation}) => {
  // Yale University's coordinates
  const initialRegion = {
    latitude: 41.3123521,
    longitude: -72.9231735,
    latitudeDelta: 0.00922,
    longitudeDelta: 0.0221,
  };

  const [activeTab, setActiveTab] = useState('Home');
  const [currentCenter, setCurrentCenter] = useState(initialRegion);
  const [pins, setPins] = useState([]);
  const [isNewPostBottonPressed, setIsNewPostButtonPressed] = useState(false);

  const googlePlacesAutocompleteRef = useRef(null);

  useEffect(() => {
    // Fetch pins from the database
    api.get('/posts/get-all-posts').then(response => {
      const allPins = [];

      for (const ii of response.data) {
        const newPin = new Pin(
          {
            latitude: ii.latitude,
            longitude: ii.longitude,
          },
          ii.content,
          ii.id,
        );

        allPins.push(newPin);
      }

      setPins(allPins);
    });
  }, []);

  const addPinAtCenter = () => {
    const newPin = new Pin(
      currentCenter,
      'This is a test pin',
      -43,
      '#0077E6',
      true,
      e => {
        setCurrentCenter(e.nativeEvent.coordinate);
      },
    ); // #0077E6 = $primary500
    setPins(currentPins => [...currentPins, newPin]);
    setIsNewPostButtonPressed(true);
  };

  const cancelAddPin = () => {
    setIsNewPostButtonPressed(false);
    setPins(pins.slice(0, -1));
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
        navigation.navigate('NewPostScreen', {
          coordinates: currentCenter,
          images: response.assets,
        });
      }
    });
  };

  return (
    <>
      <Box flex={1}>
        <ProfileScreen
          isActive={activeTab === 'Profile'}
          navigation={navigation}
        />

        {/* Cancel add pin button */}
        <Fab
          size="lg"
          placement="top center"
          bg="$error400"
          display={
            activeTab === 'Home' && isNewPostBottonPressed ? 'flex' : 'none'
          }
          position="absolute"
          top={80}
          w="$16"
          h="$16"
          onPress={cancelAddPin}>
          <FabIcon as={X} />
        </Fab>

        <Box alignItems="center">
          {activeTab === 'Home' && (
            <GooglePlacesAutocomplete
              ref={googlePlacesAutocompleteRef}
              placeholder="Search a place..."
              fetchDetails={true}
              onPress={(_, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(details.geometry);
                setCurrentCenter({
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                  latitudeDelta: 0.00922,
                  longitudeDelta: 0.0221,
                });

                setTimeout(() => {
                  googlePlacesAutocompleteRef.current.clear();
                }, 2000);
              }}
              query={{
                key: GOOGLE_MAPS_API_KEY,
                language: 'en',
              }}
              styles={{
                container: {
                  position: 'absolute',
                  top: 20,
                  width: '90%',
                  zIndex: 9999,
                },
              }}
              enablePoweredByContainer={false}
            />
          )}
        </Box>
        <MapScreenContent
          isActive={activeTab === 'Home'}
          initialRegion={currentCenter}
          setCurrentCenter={setCurrentCenter}
          pins={pins}
        />
        <BottomFab />
        <Box
          h="$16"
          alignItems="center"
          w="100%"
          borderTopWidth="$1"
          borderColor="$borderLight50">
          {!isNewPostBottonPressed ? (
            <BottomFab
              onPress={addPinAtCenter}
              isActive={activeTab === 'Home'}
              buttonText="New Post"
              icon={AddIcon}
            />
          ) : (
            <>
              <BottomFab
                onPress={handleSelectPhoto}
                isActive={activeTab === 'Home'}
                buttonText="Upload Photos"
                icon={UploadIcon}
                bg="$emerald500"
              />
            </>
          )}

          <BottomNavigation
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            bottomTabs={bottomTabs}
          />
        </Box>
      </Box>
    </>
  );
};

export default HomeScreen;
