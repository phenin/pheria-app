import * as React from 'react';
import {
  Box,
} from 'native-base';
import { ImageBackground } from "react-native";

function Story({data}) {
  const image = data.image ? {uri: data.image} : require('../images/imagenull.png')
  return (
    <Box bg="#1d232c" style={{
      flex: 1,
      justifyContent: "center",
      width: 250,
      margin: 10,
      heigh: 400 }}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={{
          flex: 1,
          justifyContent: "center",
          width: 250,
          height:400
        }}
      >
      </ImageBackground>
    </Box>
  );
}


export default Story;