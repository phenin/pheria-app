import * as React from 'react';
import {Modal, Text, Flex, ScrollView, Box, Center} from 'native-base';
import {TouchableOpacity} from 'react-native';
import {vw, vh} from '../../plugins/viewport-unit';

import {useSelector, shallowEqual, useDispatch} from 'react-redux';
import {getBackground} from '../../store/actions/storyActions';

export default function ListBackgroundModal({dialog, closeModal}) {
  const state = useSelector(stateSelector, shallowEqual);
  const dispatch = useDispatch();

  const selectBackground = value => {
    dispatch(getBackground(value));
    closeModal();
  };

  return (
    <Modal size="full" isOpen={dialog} onClose={() => closeModal()}>
      <Modal.Content style={{marginBottom: 0, marginTop: 'auto'}}>
        <Modal.CloseButton />
        <Modal.Header>Chọn ảnh nền</Modal.Header>
        <Modal.Body>
          <ScrollView horizontal={true}>
            <Flex direction={'row'}>
              {state.listBackground.map((item, index) => {
                let backgroundColor;
                if (item.backgroundColor.length >= 2) {
                  backgroundColor = {
                    linearGradient: {
                      colors: [
                        item.backgroundColor[0],
                        item.backgroundColor[1],
                      ],
                      start: [0, 0],
                      end: [1, 0],
                    },
                  };
                } else {
                  backgroundColor = item.backgroundColor[0];
                }

                return (
                  <TouchableOpacity
                    onPress={() => selectBackground(item)}
                    key={index}>
                    <Box
                      width={10 * vh}
                      height={25 * vw}
                      bg={backgroundColor}
                      style={{
                        borderColor: 'black',
                        borderWidth: 1,
                        margin: 10,
                      }}>
                      <Center style={{color: item.color}}>Aa</Center>
                    </Box>
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
    listBackground: state.background.listBackground,
    loading: state.background.loading,
  };
}
