import * as React from 'react';
import {
  NativeBaseProvider,
  Box,
  Image,Text,
  HStack, Stack,Center,
  extendTheme,
  ScrollView
} from 'native-base';
import {REACT_APP_API} from "../../constants"
import {vw, vh} from "../../plugins/viewport-unit"

function NovelOneBanner({data}) {

  const { template } = data
  let backgroundColor = null
  if( template.backgroundColor && template.backgroundColor.length > 2 ) {
    let listColor = ''
    template.backgroundColor.forEach(color => {
      listColor = listColor + "#" + color + ", "
    })
    backgroundColor = `radial-gradient(${listColor})`
  }
  else if ( template.backgroundColor.length === 1 ){
    backgroundColor = `#${template.backgroundColor[0]}`
  }

  const theme = extendTheme({
    components: {
      
    },
  });
  
  return (
    <NativeBaseProvider theme={theme}>
      <Box flex={1} bg={backgroundColor} >
        <ScrollView>
          <Stack>
            <HStack>
              <Image
                style={{width: 50*vw, height: 50*vw}}
                source={{uri: `${REACT_APP_API}/${template.image[0].url}`}} />
              <Center>
                <Text fontSize="3xl" style={{color:template.color ? `#${template.color}` : '#000000'}}>{data.title}</Text>
              </Center>
            </HStack>
          </Stack>
        
          <Box style={{flex: 1}} style={{marginTop:30, marginBottom: 30, marginRight: 10, marginLeft: 10}}>
            <Text style={{color:template.color ? `#${template.color}` : '#000000'}}>
              {data.content}
            </Text>
          </Box>
        </ScrollView>
        
      </Box>
    </NativeBaseProvider>
  );
}

export default NovelOneBanner;
