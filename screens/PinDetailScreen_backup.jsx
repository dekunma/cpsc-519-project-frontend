import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Dimensions } from "react-native";
import { Image } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import api from "../api";
import Carousel from "react-native-reanimated-carousel";

const SCREEN_WIDTH = Dimensions.get("screen").width;

const PinDetailScreen = ({ route }) => {
  // Extracting pin details passed as navigation parameter
  const { pinDetails } = route.params;
  const navigation = useNavigation();
  const [images, setImages] = useState([]);

  console.debug("pinDetails = " + JSON.stringify(pinDetails));
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
          console.debug("images stored: " + JSON.stringify(images));
        }
        console.log(
          "Response from get post images: " + JSON.stringify(response.data),
        );
      })
      .catch(e => console.log(e.response.data));
  }, [images, pinDetails.postId]);

  const renderItem = ({ item }) => {
    console.log("Rendering item with URL:", item); // Log the URL

    return <Image source={{ uri: item }} />;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.description}>{pinDetails.description}</Text>
      <Text style={styles.postId}>{pinDetails.postId}</Text>
      {/* Displaying latitude and longitude */}
      <Text>Latitude: {pinDetails.coordinate.latitude}</Text>
      <Text>Longitude: {pinDetails.coordinate.longitude}</Text>
      {/* Display the images associated with this post */}
      {/* Display the images associated with this post */}
      <Carousel
        width={SCREEN_WIDTH}
        data={images}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={{ width: SCREEN_WIDTH, height: 200 }} // adjust the size as needed
          />
        )}>
      </Carousel>
      <Button title="go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  postId: {
    fontSize: 14,
    marginBottom: 10,
  },
  imageList: {
    flexGrow: 1,
    justifyContent: "center",
  },
});

export default PinDetailScreen;