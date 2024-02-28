import React from 'react';

import {Heading, ScrollView} from '@gluestack-ui/themed';

const ProfileScreen = ({isActive}) => {
  return (
    <ScrollView style={{display: isActive ? 'flex' : 'none'}} bg="$amber100">
      <Heading>Profile Screen</Heading>
    </ScrollView>
  );
};
export default ProfileScreen;
