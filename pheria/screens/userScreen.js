import * as React from 'react';
import {
  NativeBaseProvider,
  Box,
  extendTheme,
  ScrollView
} from 'native-base';
// import Story from '../components/story'
// import { getListStory } from '../store/actions/storyActions'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'

function UserScreen({ navigation }) {

  const state = useSelector(stateSelector, shallowEqual)
  const dispatch = useDispatch()

  // React.useEffect(()=>{
  //   dispatch(getListStory())
  // },[dispatch, getListStory])

  const theme = extendTheme({
    components: {
      
    },
  });
  
  return (
    <NativeBaseProvider theme={theme}>
      <Box flex={1} bg="#000" >
        <ScrollView>
          <Box style={{flex: 1}} style={{marginTop:30}}>
            jf;sà
          </Box>
        </ScrollView>
        
      </Box>
    </NativeBaseProvider>
  );
}

function stateSelector(state) {
  return {
    listStory: state.story.listStory,
  }
}

export default UserScreen;
