import * as React from 'react';
import {
  Box, Image, ScrollView, TextArea
} from 'native-base';
import { useSelector, shallowEqual } from 'react-redux'
import {vw, vh} from "../plugins/viewport-unit"
import Draggable from 'react-native-draggable';
import { REACT_APP_API } from '../constants'

function FormStory({color}) {
  console.log(color)

  const state = useSelector(stateSelector, shallowEqual)

  return (
    <Box flex={1} style={{paddingTop:0, paddingBottom: 30}}>
      <ScrollView>
        {
          state.templates.map((item, index) =>{
            return (
              <Box>
                <Draggable x={item.x} y={item.y} key={"templates"+index}
                  renderSize={item.template.width * 2 * vw}
                  onShortPressRelease={()=>alert('touched!!')}>
                  <Image source={{uri: REACT_APP_API + item.template.image}}
                    width={item.template.width * 2 * vw} height={item.template.height * 2 *vh} alt={item.template.code} />
                </Draggable>
              </Box>
            )
          })
        }
        {
          state.contents.map((item, index) =>{
            return (
              <Box>
                <Draggable x={item.x} y={item.y} key={"content"+index}
                  renderSize={item.width * vw}>
                    <Box shadow={2} width={item.width * vw } p={5} 
                      style={{borderWidth: 1, borderColor: '#ff00ff'}} 
                      onShortPressRelease={()=>alert('touched!!')}>
                    <TextArea h={40} placeholder="Nhập nội dung" 
                      _light={{
                        placeholderTextColor: color,
                        color: color,
                    }}/>
                    </Box>
                </Draggable>
              </Box>
            )
          })
        }
      </ScrollView>
    </Box>
  );
}

function stateSelector(state) {
  return {
    templates: state.story.templates,
    contents: state.story.contents,
  }
}

export default FormStory;
