import * as React from 'react';
import {
  Flex, Heading, Modal, Text, Input
} from 'native-base';
import { TouchableOpacity } from "react-native"
import Icon from 'react-native-vector-icons/AntDesign';

import { useSelector, shallowEqual } from 'react-redux'

export default function HeaderCreateStory({navigation, color}) {

  const [dialog, setDialog] = React.useState(false)

  const state = useSelector(stateSelector, shallowEqual)
  const openTitleStory = () =>{
    setDialog(true)
  }
  const closeModal = () => {
    setDialog(false)
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
      <TouchableOpacity>
        <Text style={{marginLeft: 10, marginRight: 10}}>Lưu</Text>
      </TouchableOpacity>
      {
        dialog && (
          <Modal size="full" isOpen={dialog} onClose={() => closeModal()}>
            <Modal.Content style={{marginBottom: 0, marginTop: "auto"}}>
              <Modal.CloseButton />
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
                />
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