import * as React from 'react';

import FormStory from "../components/formStory"
import ListGroupTemplate from "../components/listGroupTemplate"
import HeaderCreateStory from "../components/headerCreateStory"
import { setStory } from "../store/actions/storyActions"
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { vh } from "../plugins/viewport-unit"
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

function CreateStoryScreen({navigation}) {

  const state = useSelector(stateSelector, shallowEqual)
  const [backgroundColor, setBackgroundColor] = React.useState('#000')

  const dispatch = useDispatch()

  const { background } = state

  React.useEffect(()=>{
    if( background && background.backgroundColor && background.backgroundColor.length > 2 ) {
      
      setBackgroundColor(`radial-gradient(${background.backgroundColor[0]}, ${background.backgroundColor[1]})`)
    }
    else if ( background && background.backgroundColor.length === 1 ){
      setBackgroundColor(background.backgroundColor[0])
    }

    dispatch(setStory(null))

  }, [background, setBackgroundColor, dispatch, setStory])

  return (
    <SafeAreaProvider style={{backgroundColor: backgroundColor}}>
        <SafeAreaView style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: 100*vh
        }}>
          <HeaderCreateStory navigation={navigation} color={background && background.color} />
          <FormStory color={background && background.color} />
          <ListGroupTemplate />
        </SafeAreaView>
    </SafeAreaProvider>
    
  );
}

function stateSelector(state) {
  return {
    background: state.story.backgroundData,
  }
}

export default CreateStoryScreen;
