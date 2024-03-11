import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PinDetailScreen = ({ route }) => {
  // Extracting pin details passed as navigation parameter
  const { pinDetails } = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{pinDetails.title}</Text>
      <Text style={styles.description}>{pinDetails.description}</Text>
      {/* Displaying latitude and longitude */}
      <Text>Latitude: {pinDetails.coordinate.latitude}</Text>
      <Text>Longitude: {pinDetails.coordinate.longitude}</Text>
      <Button title="go back" onPress={() => navigation.goBack()} />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default PinDetailScreen;
