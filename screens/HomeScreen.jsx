import React, { useState } from 'react';
import { Box, View } from '@gluestack-ui/themed';
import { Home, User, Users, MapPin } from 'lucide-react-native';
import BottomNavigation from '../components/BottomNavigation';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet} from 'react-native';

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

const MapScreenContent = ({ isActive }) => { // TODO: should be refactored later to be reusable by both HomeScreen and PinDetail Screen.
  const navigation = useNavigation(); // TODO: Hook to get access to navigation, later it should fetch the user's location
  const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  var pinClicked = false;

  const [pins, setPins] = useState([
    {
      coordinate: { latitude: 37.78825, longitude: -122.4324 },
      title: "Test Pin",
      description: "This is a test pin",
    },
    // Initially includes the example pin, add more dynamically
  ]);

  // Function to handle the map press
  const handleMapPress = (event) => {
    if (pinClicked) {
      // Marker was pressed, do not execute map press logic
      pinClicked = false;
      return;
    }
    navigation.navigate('NewPostScreen', {
      coordinates: event.nativeEvent.coordinate,
      addPin: (newPin) => {
        setPins(currentPins => [...currentPins, newPin]);
      }
    });
  };

  // Navigate to a detail screen with pin info
  const handlePinPress = (pin) => {
    pinClicked = true;
    navigation.navigate('PinDetailScreen', {
      pinDetails: pin,
    });
  };

  return (
    <View style={{ display: isActive ? 'flex' : 'none', flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={initialRegion}
        onPress={handleMapPress} // Add the press handler here
      > 
        {pins.map((pin, index) => (// TODO: Fetch data from db later
        <Marker
          key={index}
          coordinate={pin.coordinate}
          title={pin.title}
          description={pin.description}
          onPress={() => handlePinPress(pin)}
        />
      ))}
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
  }
});

const HomeScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Home');

  return (
    <>
      <Box flex={1}>
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
