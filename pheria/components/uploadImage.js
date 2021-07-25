import * as React from 'react';
import {
  Box, Text, Center
} from 'native-base';
import { TouchableOpacity, Image, Button, Platform } from "react-native";
import {vw, vh} from "../plugins/viewport-unit"
import { useDispatch } from 'react-redux'
import { getDetailStory } from '../store/actions/storyActions'
import { REACT_APP_API } from '../constants'
import ImagePicker from 'react-native-image-crop-picker';
import { post } from '../api/API'

const createFormData = (photo, body = {}) => {
  const data = new FormData();

  data.append('file', photo);

  return data;
};

function UploadImage ({data, navigation}) {
  const dispatch = useDispatch()
  const [photo, setPhoto] = React.useState(null);

  const handleChoosePhoto = async () => {
    
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: false
    }).then(image => {
      setPhoto(image)
    });
  };

  const handleUploadPhoto = () => {
    console.log('ccc', createFormData(photo)._parts)
    post(`${REACT_APP_API}/api/upload-image`,
    { headers: {
      "Content-Type": "multipart/form-data",
      "Accept": "application/json",
      "type": "formData"
    }},
        createFormData(photo)._parts, 
      )
      .then((response) => {
        console.log('response ccc', response);
      })
      .catch((error) => {
        console.log('error ccc', error);
      });
  };

  return (
    <Box bg="#1d232c" >
      {photo ? (
        <>
          <Image
            source={{ uri: photo.uri }}
            style={{ width: 300, height: 300 }}
          />
          <Button title="Upload Photo" onPress={handleUploadPhoto} />
        </>
      ) :
      <Button title="Choose Photo" onPress={handleChoosePhoto} />
      }
      
    </Box>
  );
}


export default UploadImage;