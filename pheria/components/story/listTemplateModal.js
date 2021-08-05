import * as React from 'react';
import {Modal, Image, Flex, ScrollView, Box} from 'native-base';
import {TouchableOpacity} from 'react-native';
import {vw, vh} from '../../plugins/viewport-unit';
import {useSelector, shallowEqual, useDispatch} from 'react-redux';
import {addTemplate} from '../../store/actions/storyActions';
import {REACT_APP_API} from '../../constants';

export default function ListTemplateModal({dialog, closeModal}) {
  const state = useSelector(stateSelector, shallowEqual);
  const dispatch = useDispatch();

  const selectTemplate = template => {
    dispatch(addTemplate(template));
    closeModal();
  };

  return (
    <Modal size="full" isOpen={dialog} onClose={() => closeModal()}>
      <Modal.Content style={{marginBottom: 0, marginTop: 'auto'}}>
        <Modal.CloseButton />
        <Modal.Header>Chọn hình ảnh bạn muốn thêm vào</Modal.Header>
        <Modal.Body>
          <ScrollView horizontal={true}>
            <Flex direction={'row'}>
              {state.listTemplate.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => selectTemplate(item)}
                    key={index}>
                    <Image
                      width={item.width * vh}
                      height={item.height * vh}
                      source={{uri: REACT_APP_API + item.image}}
                      alt={item.name}></Image>
                  </TouchableOpacity>
                );
              })}
            </Flex>
          </ScrollView>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}

function stateSelector(state) {
  return {
    listTemplate: state.template.listTemplate,
    loading: state.template.loading,
  };
}
