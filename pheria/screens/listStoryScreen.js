import * as React from 'react';
import {
  NativeBaseProvider,
  Box,
  extendTheme,
  ScrollView
} from 'native-base';
import Story from '../components/story/story'
import { getListStory } from '../store/actions/storyActions'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'

function ListStoryScreen({navigation}) {

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
      <Box flex={1} bg="#000" style={{paddingTop:30, paddingBottom: 30}}>
        <ScrollView>
          <Box style={{flex: 1}} style={{marginTop:30, marginBottom: 30}}>
            {
              state.listStory.map((item, index)=>{
                return  (
                  <Story data={item} key={index} navigation={navigation}/> 
                )
              })
            }
          </Box>
        </ScrollView>
        
      </Box>
    </NativeBaseProvider>
  );
}

function stateSelector(state) {
  return {
    listStory: state.listStory.listStory,
  }
}

export default ListStoryScreen;
