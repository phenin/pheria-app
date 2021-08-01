import * as React from 'react';
import {
  NativeBaseProvider,
  extendTheme,
  Box,
  ScrollView,
  Button,
  HStack, Stack, Text
} from 'native-base';
import { TouchableOpacity } from "react-native"
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { getListGroupTemplate, setGroupTemplate } from '../store/actions/groupTemplateActions'

function StoryGroupTemplate() {

  const state = useSelector(stateSelector, shallowEqual)
  const dispatch = useDispatch()

  React.useEffect(()=>{
    dispatch(getListGroupTemplate())
  },[dispatch, getListGroupTemplate])

  const selectGroupTemplate = (value) =>{
    dispatch(setGroupTemplate(value))
  }
  const theme = extendTheme({
    components: {
      
    },
  });

  return (
      <Box bg="black" 
        style={{padding:10}}>
        <ScrollView horizontal={true}>
          <Stack space={3} alignItems="center">
            <HStack space={3} alignItems="center">
              {
                state.loading ? <Button isLoading></Button> :
                state.listGroupTemplate.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={()=>selectGroupTemplate(item)}
                    >
                      <Text>{item.name}</Text>
                    </TouchableOpacity>
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
    listGroupTemplate: state.groupTemplate.listGroupTemplate,
    loading: state.groupTemplate.loading
  }
}

export default StoryGroupTemplate;
