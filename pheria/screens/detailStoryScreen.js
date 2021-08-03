import * as React from 'react';
import {
  Box, ScrollView, Text, Image
} from 'native-base';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, shallowEqual } from 'react-redux'
import {vw, vh} from "../plugins/viewport-unit"
import Draggable from 'react-native-draggable';
import { REACT_APP_API } from '../constants'

function DetailStoryScreen({route}) {

  const state = useSelector(stateSelector, shallowEqual)
  const [backgroundColor, setBackgroundColor] = React.useState("#000000")

  const {backgroundData, templates, contents } = state

  React.useEffect(()=>{
    if( backgroundData && backgroundData.backgroundColor &&  backgroundData.backgroundColor.length > 2) {
      
      setBackgroundColor(`radial-gradient(${backgroundData.backgroundColor[0]}, ${backgroundData.backgroundColor[1]})`)
    }
    else if ( backgroundData && backgroundData.backgroundColor.length === 1 ){
      setBackgroundColor(backgroundData.backgroundColor[0])
    }

  }, [backgroundData, setBackgroundColor])

  return (
    <SafeAreaProvider style={{backgroundColor: backgroundColor}}>
      <SafeAreaView style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 100*vh
      }}>
        <Box flex={1} style={{paddingTop:0, paddingBottom: 30}}>
          <ScrollView >
            <Box style={{height: 500*vh}}>
              <Draggable x={0} y={0} disabled>
                <Box width={100*vw} height={1} bg={backgroundData.color} />
              </Draggable>
              {
                templates.map((item, index) =>{
                  return (
                    <Box key={"templates" + index}>
                      <Draggable x={item.x} y={item.y} disabled
                        renderSize={item.templateData.width * 2 * vw}>
                        <Image source={{uri: REACT_APP_API + item.templateData.image}}
                          width={item.templateData.width * 2 * vw} height={item.templateData.height * 2 *vh} alt={item.templateData.code} />
                      </Draggable>
                    </Box>
                  )
                })
              }
              {
                contents.map((item, index) =>{
                  return (
                    <Box key={"content" + index} disabled>
                      <Draggable x={item.x} y={item.y} >                          
                        <Text>{item.text}</Text>
                      </Draggable>
                    </Box>
                  )
                })
              }
              <Draggable x={0} y={500*vh} disabled>
                <Box width={100*vw} height={2} bg={backgroundData.color} />
              </Draggable>
            </Box>
          </ScrollView>
        </Box>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

function stateSelector(state) {
  return {
    backgroundData: state.story.backgroundData,
    templates: state.story.templates,
    contents: state.story.contents,
  }
}

export default DetailStoryScreen;
