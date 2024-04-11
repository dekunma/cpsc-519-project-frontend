import React, {useState} from 'react';
import {Box, View} from '@gluestack-ui/themed';
import {Home, User, Users} from 'lucide-react-native';
import BottomNavigation from '../components/BottomNavigation';
import MapView, {Marker} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import ProfileScreen from './ProfileScreen';
import {launchImageLibrary} from 'react-native-image-picker';

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
  constructor(coordinate, title, description, postId) {
    this.coordinate = coordinate;
    this.title = title;
    this.description = description;
    this.postId = postId;
  }
}

const MapScreenContent = ({isActive}) => {
  // TODO: should be refactored later to be reusable by both HomeScreen and PinDetail Screen.
  const navigation = useNavigation(); // TODO: Hook to get access to navigation, later it should fetch the user's location

  // Yale University's coordinates
  const initialRegion = {
    latitude: 41.3123521,
    longitude: -72.9231735,
    latitudeDelta: 0.00922,
    longitudeDelta: 0.0221,
  };

  var pinClicked = false;

  const [pins, setPins] = useState([
    {
      coordinate: {latitude: 41.3123521, longitude: -72.9231735},
      title: 'Test Pin',
      description: 'This is a test pin',
      postId: -43,
    },
    // Initially includes the example pin, add more dynamically
  ]);

  const [currentCenter, setCurrentCenter] = useState(initialRegion);

  // Function to handle the map press
  const handleMapPress = event => {
    if (pinClicked) {
      // Marker was pressed, do not execute map press logic
      pinClicked = false;
      return;
    }
    // navigation.navigate('NewPostScreen', {
    //   coordinates: event.nativeEvent.coordinate,
    //   addPin: newPin => {
    //     setPins(currentPins => [...currentPins, newPin]);
    //   },
    // });
    handleSelectPhoto(event.nativeEvent.coordinate);
  };

  // Navigate to a detail screen with pin info
  const handlePinPress = pin => {
    pinClicked = true;
    navigation.navigate('PinDetailScreen', {
      pinDetails: pin,
    });
  };

  const addPin = newPin => {
    setPins(currentPins => [...currentPins, newPin]);
  };

  const handleSelectPhoto = coordinates => {
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
          coordinates,
          addPin: newPin => {
            setPins(currentPins => [...currentPins, newPin]);
          },
          images: response.assets,
        });
      }
    });
  };

  return (
    <View style={{display: isActive ? 'flex' : 'none', flex: 1}}>
      <MapView
        style={{flex: 1}}
        initialRegion={initialRegion}
        onPress={handleMapPress} // Add the press handler here
        showsUserLocation={true}
        showsMyLocationButton={true}
        provider={MapView.PROVIDER_GOOGLE}
        onRegionChangeComplete={region => setCurrentCenter(region)}>
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
            />
          ),
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  newPostButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007bff',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

const HomeScreen = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('Home');

  return (
    <>
      <Box flex={1}>
        <ProfileScreen
          isActive={activeTab === 'Profile'}
          navigation={navigation}
        />
        <MapScreenContent isActive={activeTab === 'Home'} />
        <Box
          h="$16"
          alignItems="center"
          w="100%"
          borderTopWidth="$1"
          borderColor="$borderLight50">
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
