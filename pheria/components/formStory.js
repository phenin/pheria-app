import * as React from 'react';
import {
  Box,
  Input,
  TextArea
} from 'native-base';
import { useSelector, shallowEqual } from 'react-redux'
import {vw, vh} from "../plugins/viewport-unit"
import UploadImage from "./uploadImage"

function FormStory({template, type, imageTemplate}) {

  const state = useSelector(stateSelector, shallowEqual)
  const [image, setImage] = React.useState(imageTemplate && imageTemplate.url)
  const [color, setColor] = React.useState('#fff')

  React.useEffect(()=>{
    if(template && template.color){
      console.log(template.color)
      setColor(`#${template.color}`)
    }
}, [template, setColor])

  return (
    <Box flex={1} bg="blue" style={{paddingTop:0, paddingBottom: 30}}>
      <TextArea />
    </Box>
  );
}

function stateSelector(state) {
  return {
    story: state.story.story,
  }
}

export default FormStory;
