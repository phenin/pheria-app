import * as React from 'react';
import {
  Box,
} from 'native-base';
import { ImageBackground } from "react-native";
import {vw, vh} from "../plugins/viewport-unit"

function Story({data}) {
  const image = data.image ? {uri: data.image} : require('../images/imagenull.png')
  return (
    <Box bg="#1d232c" style={{
      flex: 1,
      justifyContent: "center",
      width: 80*vw,
      marginRight: 10*vw,
      marginLeft: 10*vw,
      marginTop: 4*vw,
      marginBottom: 4*vw,
      borderRadius: 30,
      heigh: 40*vh }}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={{
          flex: 1,
          justifyContent: "center",
          width: '100%',
          height:40*vh,
          borderRadius: 30,
        }}
      >
      </ImageBackground>
    </Box>
  );
}


export default Story;