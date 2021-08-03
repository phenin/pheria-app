import * as React from 'react';
import {
  Flex, Heading, Modal, Text, Input, Button, Center
} from 'native-base';
import { TouchableOpacity } from "react-native"
import Icon from 'react-native-vector-icons/AntDesign'
import UploadImage from './uploadImage'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { updateTitle, updateImage, saveStory } from "../store/actions/storyActions"
import { vw } from "../plugins/viewport-unit"

export default function HeaderCreateStory({navigation, color}) {

  const state = useSelector(stateSelector, shallowEqual)
  const dispatch = useDispatch()

  const [dialog, setDialog] = React.useState(false)
  const [title, setTitle] = React.useState(state.title)

  const openTitleStory = () =>{
    setDialog(true)
  }
  const closeModal = () => {
    dispatch(updateTitle(title))
    setDialog(false)
  }

  const upload = (link) =>{
    dispatch(updateImage(link))
  }

  const handleChangeInput = (key, event) =>{
    setTitle(event.nativeEvent.text)
  }

  const save = () =>{
    dispatch(saveStory())
  }
  
  return (
    <Flex height={30} direction={'row'} justify="space-between">
      <Icon
        name="close"
        size={24}
        color={color}
        style={{marginLeft: 10, marginRight: 10}}
        onPress={() => navigation.goBack()} 
      /> 
      <TouchableOpacity onPress={() => openTitleStory()}>
        <Heading size="md" 
          alignSelf={{base: "center"}}>{state.title || 'Nhập tiêu đề'}</Heading>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => save()}>
        <Text style={{marginLeft: 10, marginRight: 10}}>Lưu</Text>
      </TouchableOpacity>
      {
        dialog && (
          <Modal size="full" isOpen={dialog} onClose={() => closeModal()}>
            <Modal.Content style={{marginBottom: 0, marginTop: "auto"}}>
              <Modal.Header>Thông tin</Modal.Header>
              <Modal.Body>
                <Input
                  w="100%"
                  placeholder="Tiêu đề bài viết"
                  _light={{
                    placeholderTextColor: "blueGray.400",
                  }}
                  _dark={{
                    placeholderTextColor: "blueGray.50",
                  }}
                  onChange={(v)=>handleChangeInput('title', v)}
                />
                <UploadImage upload={upload}/>
                <Center style={{marginTop:10}}>
                  <Button size="sm" variant={"solid"} width={80*vw} 
                    onPress={()=>closeModal()}>Xác nhận</Button>
                </Center>
              </Modal.Body>
            </Modal.Content>
          </Modal>
        )
      }
    </Flex>
  );
}

function stateSelector(state) {
  return {
    title: state.story.title,
  }
}