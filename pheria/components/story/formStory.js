import * as React from 'react';
import {
  Box, Image, ScrollView, TextArea, Modal, Input, Flex, Button
} from 'native-base';
import {vw, vh} from "../../plugins/viewport-unit"
import Draggable from 'react-native-draggable';
import { REACT_APP_API } from '../../constants'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { updateAreaContent, changeContent } from "../../store/actions/storyActions"

function FormStory({color}) {

  const [dialog, setDialog] = React.useState(false)
  const [area, setArea] = React.useState(null)
  const state = useSelector(stateSelector, shallowEqual)
  const dispatch = useDispatch()

  const openTitleStory = (item) =>{
    setArea(item)
      setDialog(true)
  }
  const updateContent = () => {
    dispatch(updateAreaContent(area))
    closeModal()
  }
  const handleChangeInput = (key, event) =>{
    setArea({...area, [key]:  event.nativeEvent.text})
  }
  const closeModal = () => {
    setDialog(false)
  }
  const handleChangeArea = (id, event) => {
    dispatch(changeContent({
      uuid: id,
      text: event.nativeEvent.text
    }))
  }

  return (
    <Box flex={1} style={{paddingTop:0, paddingBottom: 30}}>
      <ScrollView >
        <Box style={{height: 500*vh}}>
          <Draggable x={0} y={0} disabled>
            <Box width={100*vw} height={1} bg={color} />
          </Draggable>
          {
            state.templates.map((item, index) =>{
              return (
                <Box key={"templates" + index}>
                  <Draggable x={item.x} y={item.y} 
                    renderSize={item.templateData.width * 2 * vw}
                    onShortPressRelease={()=>alert('touched!!')}>
                    <Image source={{uri: REACT_APP_API + item.templateData.image}}
                      width={item.templateData.width * 2 * vw} height={item.templateData.height * 2 *vh} alt={item.templateData.code} />
                  </Draggable>
                </Box>
              )
            })
          }
          {
            state.contents.map((item, index) =>{
              return (
                <Box key={"content" + index}>
                  <Draggable x={item.x} y={item.y} 
                    onShortPressRelease={()=>openTitleStory(item)}>
                      <Box shadow={2} width={item.width * vw } height={item.height * vw} p={5} 
                        style={{borderWidth: 1, borderColor: '#ff00ff', borderRadius: 4}} 
                      >
                        <TextArea placeholder="Nhập nội dung"
                          style={{height: (item.height - 10) * vw}}
                          width={(item.width - 10) * vw }
                          h={item.height * vw}
                          _light={{
                            placeholderTextColor: color,
                            color: color,
                          }}
                          onChange={(v)=>handleChangeArea(item.uuid, v)}
                        />
                      </Box>
                  </Draggable>
                </Box>
              )
            })
          }
          <Draggable x={0} y={500*vh} disabled>
            <Box width={100*vw} height={2} bg={color} />
          </Draggable>
        </Box>
      </ScrollView>
      {
        dialog && (
          <Modal size="full" isOpen={dialog} onClose={() => closeModal()}>
            <Modal.Content style={{marginBottom: 0, marginTop: "auto"}}>
              <Modal.CloseButton />
              <Modal.Header>Chỉnh diện tích khung chữ</Modal.Header>
              <Modal.Body>
                <Flex direction={'row'} justifyContent="space-between">
                  <Input
                    w={40*vw}
                    placeholder="Chiều dài %"
                    value={area.width}
                    _light={{
                      placeholderTextColor: "blueGray.400",
                    }}
                    _dark={{
                      placeholderTextColor: "blueGray.50",
                    }}
                    onChange={(v)=>handleChangeInput('width', v)}
                  />
                  <Input
                    w={40*vw}
                    placeholder="Chiều cao %"
                    value={area.height}
                    _light={{
                      placeholderTextColor: "blueGray.400",
                    }}
                    _dark={{
                      placeholderTextColor: "blueGray.50",
                    }}
                    onChange={(v)=>handleChangeInput('height', v)}
                  />
                </Flex>
                <Button style={{marginTop:10}} onPress={()=>updateContent()}>Lưu</Button>
                
              </Modal.Body>
            </Modal.Content>
          </Modal>
        )
      }
    </Box>
  );
}

function stateSelector(state) {
  return {
    templates: state.story.templates,
    contents: state.story.contents,
  }
}

export default FormStory;
