import * as React from 'react';
import {
  Box,
  ScrollView,
  Button,
  HStack, Stack, Text
} from 'native-base';
import { TouchableOpacity } from "react-native"
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { getListGroupTemplate, setGroupTemplate } from '../../store/actions/groupTemplateActions'
import { getListTemplate } from '../../store/actions/templateActions'
import { getListBackground } from '../../store/actions/backgroundActions'
import { addContent } from '../../store/actions/storyActions'
import ListTemplateModal from "./listTemplateModal"
import ListBackgroundModal from "./listBackgroundModal"

export default function ListGroupTemplate() {

  const [dialog, setDialog] = React.useState({
    template: false,
    background: false
  })
  
  const state = useSelector(stateSelector, shallowEqual)
  const dispatch = useDispatch()

  React.useEffect(()=>{
    dispatch(getListGroupTemplate())
  },[dispatch, getListGroupTemplate])

  const selectGroupTemplate = (value) =>{
    dispatch(setGroupTemplate(value))
    if(value._id === "background") {
      dispatch(getListBackground())
      setDialog({background: true, template: false})
    }
    else if (value._id === "text") {
      dispatch(addContent())
    }
    else {
      dispatch(getListTemplate({group: value._id}))
      setDialog({background: false, template: true})
    }    
  }

  const closeModal = () =>{
    setDialog({background: false, template: false})
  }

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
        {
          dialog && dialog.template && 
            <ListTemplateModal dialog={dialog.template} closeModal={closeModal}/>
        }
        {
          dialog && dialog.background && 
          <ListBackgroundModal dialog={dialog.background} closeModal={closeModal}/>
        }
      </Box>
  );
}

function stateSelector(state) {
  return {
    listGroupTemplate: state.groupTemplate.listGroupTemplate,
    loading: state.groupTemplate.loading
  }
}