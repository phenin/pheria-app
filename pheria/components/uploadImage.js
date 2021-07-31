import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import axios from "axios"
export default class UploadImage extends Component {
  constructor() {
    super();
    this.state = {
      imageUri: null
    };
  }

  uploadImage = async () => {
    // Check selected image is not null
    if (this.state.imageUri != null) {
     
      const selectedImage = this.state.imageUri;
      console.log("+++++ selected url "+selectedImage);
      const data = new FormData();
      data.append("image", {
        name: selectedImage.filename,
        type: selectedImage.mime,
        uri:
          Platform.OS === "android"
            ? selectedImage.sourceURL
            : selectedImage.sourceURL.replace("file://", "")
      });
      // Change file upload URL
      const config = {
        method: 'post',
        url: 'https://api.imgur.com/3/image',
        headers: { 
          'Authorization': 'Client-ID 574f96546392ad0', 
          'Accept': 'multipart/form-data',
          'Content-Type': 'multipart/form-data',
        },
        data : data
      };
      axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log('error ccc', error);
      });
      // let responseJson = await res.json();
      // if (responseJson.status.response == "success") {
      //   Alert.alert("Profile picture updated Successful");
      // }else{
      //   Alert.alert("Something went wrong, please try again");
      // }
    } else {
      // Validation Alert
      Alert.alert("Please Select image first");
    }
  };

  pickImage = () => {
    console.log("ccc")
    ImagePicker.openPicker({
      cropping: false
    }).then(image => {
      console.log(image);
      this.setState({ imageUri: image });
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.pickImage()}>
          <Text style={styles.welcome}>Select Image</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.uploadImage()}>
          <Text style={styles.welcome}>Upload Image</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});