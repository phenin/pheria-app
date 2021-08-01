import * as React from 'react';
import {
  Box, Image, ScrollView, TextArea, Modal, Input, Flex, Button
} from 'native-base';
import {vw, vh} from "../plugins/viewport-unit"
import Draggable from 'react-native-draggable';
import { REACT_APP_API } from '../constants'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { updateAreaContent } from "../store/actions/storyActions"

function FormStory({color}) {

  const [dialog, setDialog] = React.useState(false)
  const [area, setArea] = React.useState(null)
  const state = useSelector(stateSelector, shallowEqual)
  const dispatch = useDispatch()

  const openTitleStory = (item) =>{
    setArea(item)
    // setTimeout(()=>{
      setDialog(true)
    // }, 500)
    
    // dispatch(updateAreaContent(item))
  }
  const updateContent = () => {
    dispatch(updateAreaContent(area))
  }
  const handleChangeInput = (key, event) =>{
    console.log(key, event.nativeEvent.text)
    setArea({...area, [key]:  event.nativeEvent.text})
  }
  const closeModal = () => {
    setDialog(false)
  }

  return (
    <Box flex={1} style={{paddingTop:0, paddingBottom: 30}}>
      <ScrollView>
        {
          state.templates.map((item, index) =>{
            return (
              <Box>
                <Draggable x={item.x} y={item.y} key={"templates"+index}
                  renderSize={item.template.width * 2 * vw}
                  onShortPressRelease={()=>alert('touched!!')}>
                  <Image source={{uri: REACT_APP_API + item.template.image}}
                    width={item.template.width * 2 * vw} height={item.template.height * 2 *vh} alt={item.template.code} />
                </Draggable>
              </Box>
            )
          })
        }
        {
          state.contents.map((item, index) =>{
            return (
              <Box>
                <Draggable x={item.x} y={item.y} key={"content"+index}
                  renderSize={item.width * vw}
                  onShortPressRelease={()=>openTitleStory(item)}>
                    <Box shadow={2} width={item.width * vw } p={5} 
                      style={{borderWidth: 1, borderColor: '#ff00ff'}} 
                    >
                      <TextArea h={40} placeholder="Nhập nội dung" 
                        _light={{
                          placeholderTextColor: color,
                          color: color,
                      }}/>
                    </Box>
                </Draggable>
              </Box>
            )
          })
        }
      </ScrollView>
      {
        dialog && (
          <Modal size="full" isOpen={dialog} onClose={() => closeModal()}>
            <Modal.Content style={{marginBottom: 0, marginTop: "auto"}}>
              <Modal.CloseButton />
              <Modal.Header>Chỉnh diện tích khung chữ</Modal.Header>
              <Modal.Body>
                <Flex direction={'row'}>
                  <Input
                    w="50%"
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
                    w="50%"
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
                <Button onPress={()=>updateContent()}>Lưu</Button>
                
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
