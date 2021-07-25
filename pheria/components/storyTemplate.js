import * as React from 'react';
import {
  NativeBaseProvider,
  extendTheme,
  Box,
  ScrollView,
  Button,
  HStack, Stack,
} from 'native-base';
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { getListTemplate, setTemplate } from '../store/actions/templateActions'

function StoryTemplate() {

  const state = useSelector(stateSelector, shallowEqual)
  const dispatch = useDispatch()

  React.useEffect(()=>{
    dispatch(getListTemplate({group:'depression'}))
  },[dispatch, getListTemplate])

  const selectTemplate = (value) =>{
    dispatch(setTemplate(value))
  }
  const theme = extendTheme({
    components: {
      
    },
  });

  return (
      <Box bg="transparent" 
        style={{padding:10}}>
        <ScrollView horizontal={true}>
          <Stack space={3} alignItems="center">
            <HStack space={3} alignItems="center">
              {
                state.loading ? <Button isLoading></Button> :
                state.listTemplate.map((item, index) => {
                  return (
                    <Button
                      key={index}
                      variant="outline"
                      onPress={()=>selectTemplate(item)}
                    >
                      {item.name}
                    </Button>
                  )
                })
              }
            </HStack>
          </Stack>
        </ScrollView>
      </Box>
  );
}

function stateSelector(state) {
  return {
    listTemplate: state.template.listTemplate,
    loading: state.template.loading
  }
}

export default StoryTemplate;
