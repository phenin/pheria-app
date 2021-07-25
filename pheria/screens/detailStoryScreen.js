import * as React from 'react';
import {
  NativeBaseProvider,
  extendTheme,
} from 'native-base';
import NovelOneBanner from "../components/template/novel-one-banner"
import { useSelector, shallowEqual } from 'react-redux'

function DetailStoryScreen({route}) {

  const state = useSelector(stateSelector, shallowEqual)
  const type = state.story && state.story.type

  let Component
  switch (type) {
    case 'novel-one-banner':
      Component = NovelOneBanner
      break;
    default:
      break;
  }

  const theme = extendTheme({
    components: {
      
    },
  });

  return (
    <NativeBaseProvider theme={theme}>
      {
        state.story && 
        (
          <Component data={state.story}/>
        )
      }
      
    </NativeBaseProvider>
  );
}

function stateSelector(state) {
  return {
    story: state.story.story,
  }
}

export default DetailStoryScreen;
