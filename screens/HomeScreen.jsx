import {
  AddIcon,
  Box,
  Fab,
  FabIcon,
  FabLabel,
  Heading,
  View,
} from '@gluestack-ui/themed';
import React, {useState} from 'react';
import BottomNavigation from '../components/BottomNavigation';

import {Home, User, Users} from 'lucide-react-native';
import ProfileScreen from './ProfileScreen';

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

const HomeScreenContent = ({isActive}) => {
  return (
    <View style={{display: isActive ? 'flex' : 'none'}} h="$full">
      <Heading>Home Screen (REPLACE ME)</Heading>
    </View>
  );
};

const NewPostFab = ({navigation, isActive}) => {
  return (
    <Box
      w="$full"
      borderRadius="$md"
      style={{display: isActive ? 'flex' : 'none'}}>
      <Fab
        size="lg"
        placement="bottom center"
        onPress={() => navigation.navigate('NewPostScreen')}>
        <FabIcon as={AddIcon} mr="$1" />
        <FabLabel>New Post</FabLabel>
      </Fab>
    </Box>
  );
};

const HomeScreen = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('Home');

  return (
    <>
      <Box flex={1}>
        <Box flex={1}>
          <ProfileScreen
            isActive={activeTab === 'Profile'}
            navigation={navigation}
          />
          <HomeScreenContent isActive={activeTab === 'Home'} />
        </Box>

        <NewPostFab navigation={navigation} isActive={activeTab === 'Home'} />

        {/* mobile bottom tabs */}
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
