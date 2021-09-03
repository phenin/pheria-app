import * as React from 'react';
import {
  Box,
  Image,
  ScrollView,
  TextArea,
  Modal,
  Input,
  Flex,
  Button,
  Text
} from 'native-base';
import {vw, vh} from '../../plugins/viewport-unit';
import Draggable from 'react-native-draggable';
import {REACT_APP_API} from '../../constants';
import {useSelector, shallowEqual, useDispatch} from 'react-redux';
import {
  changeContent,
  changePositionTemplate,
  changePositionContent,
} from '../../store/actions/storyActions';

function FormStory({color}) {
  const [dialog, setDialog] = React.useState(false);
  const [area, setArea] = React.useState(null);
  const state = useSelector(stateSelector, shallowEqual);
  const dispatch = useDispatch();

  const openTitleStory = item => {
    setArea(item);
    setDialog(true);
  };
  const updateContent = () => {
    dispatch(changeContent(area));
    closeModal();
  };
  const handleChangeInput = (key, event) => {
    setArea({...area, [key]: event.nativeEvent.text});
  };
  const closeModal = () => {
    setDialog(false);
  };
  const moveTemplate = (event, gestureState, bound, id) => {
    dispatch(
      changePositionTemplate({
        _id: id,
        x: gestureState.dx,
        y: gestureState.dy,
      }),
    );
  };

  const moveContent = (event, gestureState, bound, id) => {
    dispatch(
      changePositionContent({
        _id: id,
        x: event.nativeEvent.locationX,
        y: event.nativeEvent.locationY,
      }),
    );
  };

  return (
    <Box flex={1} style={{paddingTop: 0, paddingBottom: 30}}>
      <ScrollView>
        <Box style={{height: 500 * vh}}>
          <Draggable x={0} y={0} disabled>
            <Box width={100 * vw} height={1} bg={color} />
          </Draggable>
          {state.templates.map((item, index) => {
            return (
              <Box key={'templates' + index}>
                <Draggable
                  x={item.x}
                  y={item.y}
                  minX={0} minY={0}
                  renderSize={item.template.width * 2 * vw}
                  onDragRelease={(event, gestureState, bound) =>
                    moveTemplate(event, gestureState, bound, item._id)
                  }>
                  <Image
                    source={{uri: REACT_APP_API + item.template.image}}
                    width={item.template.width * 2 * vw}
                    height={item.template.height * 2 * vh}
                    alt={item.template.code}
                  />
                </Draggable>
              </Box>
            );
          })}
          {state.contents.map((item, index) => {
            return (
              <Box key={'content' + index}>
                <Draggable
                  x={item.x}
                  y={item.y}
                  minX={0} minY={0}
                  onShortPressRelease={() => openTitleStory(item)}
                  onDragRelease={(event, gestureState, bound) =>
                    moveContent(event, gestureState, bound, item._id)
                  }>
                  <Box
                    shadow={2}
                    width={item.width * vw}
                    height={item.height * vw}
                    style={{
                      borderWidth: 1,
                      borderColor: '#ff00ff',
                      borderRadius: 4,
                    }}>
                    <Text style={{color: color}}>{item.text}</Text>
                  </Box>
                </Draggable>
              </Box>
            );
          })}
          <Draggable x={0} y={500 * vh} disabled>
            <Box width={100 * vw} height={2} bg={color} />
          </Draggable>
        </Box>
      </ScrollView>
      {dialog && (
        <Modal size="full" isOpen={dialog} onClose={() => closeModal()}>
          <Modal.Content style={{marginBottom: 0, marginTop: 'auto'}}>
            <Modal.CloseButton />
            <Modal.Header>Nội dung</Modal.Header>
            <Modal.Body>
              <Flex direction={'row'} justifyContent="space-between">
                <Input
                  w={40 * vw}
                  placeholder="Chiều dài %"
                  defaultValue={area.width.toString()}
                  onChange={v => handleChangeInput('width', v)}
                />
                <Input
                  w={40 * vw}
                  placeholder="Chiều cao %"
                  defaultValue={area.height.toString()}
                  onChange={v => handleChangeInput('height', v)}
                />
              </Flex>
              <TextArea
                placeholder="Nhập nội dung"
                defaultValue={area.text}
                onChange={v => handleChangeInput('text', v)}
                />
              <Button style={{marginTop: 10}} onPress={() => updateContent()}>
                Lưu
              </Button>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      )}
    </Box>
  );
}

function stateSelector(state) {
  return {
    templates: state.story.templates,
    contents: state.story.contents,
  };
}

export default FormStory;
