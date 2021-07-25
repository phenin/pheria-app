import * as React from 'react';
import {
  NativeBaseProvider,
  extendTheme,
  Box,
  Input,
  TextArea
} from 'native-base';
import { useSelector, shallowEqual } from 'react-redux'
import {vw, vh} from "../plugins/viewport-unit"

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

  const theme = extendTheme({
    components: {
      
    },
  });

  return (
    <NativeBaseProvider theme={theme}>
      <Box flex={1} bg="transparent" style={{paddingTop:0, paddingBottom: 30}}>
        <Input
          mx={3}
          my={3}
          placeholder="Bạn đang nghỉ gì ?"
          _light={{
            placeholderTextColor: color,
            color: color
          }}
        />
        <TextArea mx={3} h={20*vh} placeholder="Nội dung tâm sự" 
          _light={{
            placeholderTextColor: color,
            color: color
          }}/>
      </Box>
    </NativeBaseProvider>
  );
}

function stateSelector(state) {
  return {
    story: state.story.story,
  }
}

export default FormStory;
