import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Text,
} from "react-native";
import { Center } from "native-base"
import ImagePicker from "react-native-image-crop-picker";
import axios from "axios"
export default class UploadImage extends Component {
  constructor() {
    super();
    this.state = {
      image: null,
      imageUri: require('../images/imagenull.png'),
      step: 0
    };
  }

  uploadImage = async () => {
    // Check selected image is not null
    if (this.state.image != null) {
     
      const selectedImage = this.state.image;
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
        this.setState({
          imageUri: {uri: response.data.data.link }
        })
        this.props.upload(response.data.data.link)
      })
      .catch((error) => {
        console.log('error ccc', error);
      });
    } else {
      Alert.alert("Please Select image first");
    }
  };

  pickImage = () => {
    ImagePicker.openPicker({
      cropping: false
    }).then(image => {
      this.setState({ image: image, step: 1 });
    });
  };

  clickImage = () =>{
    if(this.state.step === 0) {
      this.pickImage()
    }
    else {
      this.uploadImage()
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.clickImage()}>
          <ImageBackground source={this.state.imageUri} resizeMode="cover" style={styles.image} >
              <Center>
                <Text style={{color:'#ffffff'}}>
                {
                  this.state.step === 0 ? "Chọn ảnh" : "Đăng ảnh"
                }
                </Text>
              </Center>
          </ImageBackground>
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
  image: {
    justifyContent: "center", 
    width: 200, 
    height: 200,
    marginTop: 10
  }
});