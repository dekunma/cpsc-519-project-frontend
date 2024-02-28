import React from 'react';
import {HStack, Icon, Pressable, Text, VStack} from '@gluestack-ui/themed';
import FriendsScreen from '../screens/FriendsScreen';

const BottomNavigation = ({bottomTabs, activeTab, setActiveTab}) => {
  const [actionsheetVisible, setActionsheetVisible] = React.useState(false);

  return (
    <>
      <HStack
        alignContent="center"
        position="absolute"
        bottom={0}
        justifyContent="space-between"
        w="100%"
        py="$3"
        px="$6"
        sx={{
          '@md': {display: 'none'},
        }}>
        {bottomTabs.map(tab => {
          return (
            <Pressable
              key={tab.label}
              onPress={() => {
                if (tab.label !== 'Friends') {
                  setActiveTab(tab.label);
                }
                if (tab.label === 'Friends') {
                  setActionsheetVisible(true);
                }
              }}
              disabled={tab.disabled}
              opacity={tab.disabled ? 0.5 : 1}>
              <VStack alignItems="center">
                <Icon
                  as={tab.icon}
                  color={
                    activeTab === tab.label ? '$primary500' : '$textLight400'
                  }
                  size={20}
                />
                <Text
                  size="xs"
                  color={
                    activeTab === tab.label ? '$textLight900' : '$textLight400'
                  }
                  sx={{
                    _dark: {
                      color:
                        activeTab === tab.label
                          ? '$textDark100'
                          : '$textLight400',
                    },
                  }}>
                  {tab.label}
                </Text>
              </VStack>
            </Pressable>
          );
        })}
      </HStack>

      {actionsheetVisible && (
        <FriendsScreen
          actionsheetVisible={actionsheetVisible}
          setActionsheetVisible={setActionsheetVisible}
        />
      )}
    </>
  );
};

export default BottomNavigation;
