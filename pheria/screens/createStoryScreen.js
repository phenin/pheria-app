import * as React from 'react';

import FormStory from "../components/formStory"
import ListGroupTemplate from "../components/listGroupTemplate"
import { setStory } from "../store/actions/storyActions"
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import {vw, vh} from "../plugins/viewport-unit"
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

function CreateStoryScreen({route}) {

  const state = useSelector(stateSelector, shallowEqual)
  const [backgroundColor, setBackgroundColor] = React.useState('#000')

  const dispatch = useDispatch()

  const { background } = state

  React.useEffect(()=>{
    if( background && background.backgroundColor && background.backgroundColor.length > 2 ) {
      let listColor = ''
      background.backgroundColor.forEach(color => {
        listColor = listColor + "#" + color + ", "
      })
      setBackgroundColor(`radial-gradient(${listColor})`)
    }
    else if ( background && background.backgroundColor.length === 1 ){
      setBackgroundColor(`#${background.backgroundColor[0]}`)
    }

    dispatch(setStory(null))

  }, [background, setBackgroundColor, dispatch, setStory])

  return (
    <SafeAreaProvider style={{backgroundColor:backgroundColor}}>
        <SafeAreaView style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: 100*vh
        }}>
          <FormStory />
          <ListGroupTemplate />
        </SafeAreaView>
    </SafeAreaProvider>
    
  );
}

function stateSelector(state) {
  return {
    background: state.background.background,
  }
}

export default CreateStoryScreen;
