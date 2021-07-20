import * as React from 'react';
import {
  Box,
  Image,
  extendTheme,
  NativeBaseProvider
} from 'native-base';
import { Dimensions } from "react-native";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

function Story({data}) {

  const [heigth, setHeight] = React.useState(window.width)

  const theme = extendTheme({
    components: {
      Image: {
        baseStyle: {
          width: 400,
          color: 'white'
        },
      }
    },
  });

  return (
    <NativeBaseProvider theme={theme}>
      <Box >
        <Image
          source={{
            uri: data.image,
          }}
          alt="Alternate Text"
          size={"xl"}
        />
      </Box>
    </NativeBaseProvider>
    
  );
}

export default Story;