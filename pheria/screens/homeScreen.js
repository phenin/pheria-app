import * as React from 'react';
import {
  NativeBaseProvider,
  Center,
  extendTheme
} from 'native-base';
import Story from '../components/story'
import { getListStory } from '../store/actions/storyActions'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'

function HomeScreen({ navigation }) {

  const state = useSelector(stateSelector, shallowEqual)
  const dispatch = useDispatch()

  React.useEffect(()=>{
    dispatch(getListStory())
  },[dispatch, getListStory])

  const theme = extendTheme({
    components: {
      
    },
  });
  return (
    <NativeBaseProvider theme={theme}>
      <Center>
        {
          state.listStory.map((item, index)=>{
            return  (
              <Story data={item} key={index}/> 
            )
          })
        }
      </Center>
    </NativeBaseProvider>
  );
}

function stateSelector(state) {
  return {
    listStory: state.story.listStory,
  }
}

export default HomeScreen;
