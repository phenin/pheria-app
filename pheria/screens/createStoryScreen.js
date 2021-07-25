import * as React from 'react';
import {
  NativeBaseProvider,
  extendTheme,
  Box,
} from 'native-base';
import { ImageBackground } from "react-native"
import FormStory from "../components/formStory"
import StoryTemplate from "../components/storyTemplate"
import { setStory } from "../store/actions/storyActions"
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import {vw, vh} from "../plugins/viewport-unit"

function CreateStoryScreen({route}) {

  const state = useSelector(stateSelector, shallowEqual)
  const [backgroundColor, setBackgroundColor] = React.useState('#000')

  const dispatch = useDispatch()

  const { template } = state

  React.useEffect(()=>{
    if( template && template.backgroundColor && template.backgroundColor.length > 2 ) {
      let listColor = ''
      template.backgroundColor.forEach(color => {
        listColor = listColor + "#" + color + ", "
      })
      setBackgroundColor(`radial-gradient(${listColor})`)
    }
    else if ( template && template.backgroundColor.length === 1 ){
      setBackgroundColor(`#${template.backgroundColor[0]}`)
    }

    dispatch(setStory(null))

  }, [template, setBackgroundColor, dispatch, setStory])

  const theme = extendTheme({
    components: {
      
    },
  });

  return (
    <NativeBaseProvider theme={theme}>
      {
        template && template.image[0].url ? 
        (
          <Box flex={1} bg={backgroundColor} style={{paddingTop:30, paddingBottom: 30}}>
            <ImageBackground 
              source={{uri: `${template && template.image[0].url}`}}
              style={{
                flex: 1,
                justifyContent: "center",
                width: '100%',
                height:40*vh,
                borderRadius: 30,
              }}>
                <StoryTemplate />
              <FormStory template={template && template._id} type={template && template.type} 
                imageTemplate={template && template.image.length > 0 && template.image[0]}/>

              </ImageBackground>
              
          </Box>
        ):
        (
          <Box flex={1} bg={backgroundColor} style={{paddingTop:30, paddingBottom: 30}}>
            <StoryTemplate />
            <FormStory template={template && template._id} type={template && template.type} 
              imageTemplate={template && template.image.length > 0 && template.image[0]}/>
          </Box>
        )
      }
      
    </NativeBaseProvider>
  );
}

function stateSelector(state) {
  return {
    template: state.template.template,
  }
}

export default CreateStoryScreen;
