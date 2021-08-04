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

  const {background, templates, contents } = state

  React.useEffect(()=>{
    if( background && background.backgroundColor &&  background.backgroundColor.length > 2) {
      
      setBackgroundColor(`radial-gradient(${background.backgroundColor[0]}, ${background.backgroundColor[1]})`)
    }
    else if ( background && background.backgroundColor.length === 1 ){
      setBackgroundColor(background.backgroundColor[0])
    }

  }, [background, setBackgroundColor])

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
                <Box width={100*vw} height={1} bg={background.color} />
              </Draggable>
              {
                templates.map((item, index) =>{
                  return (
                    <Box key={"templates" + index}>
                      <Draggable x={item.x} y={item.y} disabled
                        renderSize={item.template.width * 2 * vw}>
                        <Image source={{uri: REACT_APP_API + item.template.image}}
                          width={item.template.width * 2 * vw} height={item.template.height * 2 *vh} alt={item.template.code} />
                      </Draggable>
                    </Box>
                  )
                })
              }
              {
                contents.map((item, index) =>{
                  return (
                    <Box key={"content" + index} width={(item.width - 10) * vw} height={(item.height - 10) * vw}>
                      <Draggable x={item.x} y={item.y} disabled>
                        <Text>{item.text}</Text>
                      </Draggable>
                    </Box>
                  )
                })
              }
              <Draggable x={0} y={500*vh} disabled>
                <Box width={100*vw} height={2} bg={background.color} />
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
    background: state.story.background,
    templates: state.story.templates,
    contents: state.story.contents,
  }
}

export default DetailStoryScreen;
