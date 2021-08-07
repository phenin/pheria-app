import * as React from 'react';
import {Modal, Text, Flex, ScrollView, Box, Heading} from 'native-base';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {vw, vh} from '../../plugins/viewport-unit';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {useSelector, shallowEqual, useDispatch} from 'react-redux';
import { marginTop } from 'styled-system';

export default function ListCommentModal({dialog, closeModal}) {
  const state = useSelector(stateSelector, shallowEqual);
  const dispatch = useDispatch();

  const replies = (item, index) =>{
    return (
      <Box style={styles.reply} key={`reply-${index}`}>
        <Flex direction={'row'} justifyContent={'flex-start'}>
          {
            item.author && item.author.picture ? (
              <Image source={{uri: item.author.picture}} alt="avatar"/>
            ) : (
              <Icon
                name="user-circle"
                size={24}
                color={'#000'}
              />
            )
          }
          <Box bg={'#e0e0e0'} style={{borderRadius: 10, marginLeft: 20}}>
            <Heading style={styles.name} size="sm">{item.author.name}</Heading>
            <Text style={styles.content}>{item.content}</Text>
          </Box>
        </Flex>
      </Box>
    )
  }

  return (
    <Modal size="full" isOpen={dialog} onClose={() => closeModal()}>
      <Modal.Content style={{marginBottom: 0, marginTop: 'auto'}}>
        <Modal.CloseButton />
        <Modal.Header>Bình luận</Modal.Header>
        <Modal.Body>
          <ScrollView horizontal={true}>
            {
              state.comments.map((item, index)=>{
                return (
                  <Box key={index}>
                    <Flex direction={'row'} justifyContent={'flex-start'}>
                      {
                        item.author && item.author.picture ? (
                          <Image source={{uri: item.author.picture}} alt="avatar"/>
                        ) : (
                          <Icon
                            name="user-circle"
                            size={24}
                            color={'#000'}
                          />
                        )
                      }
                      <Box bg={'#e0e0e0'} style={{borderRadius: 10, marginLeft: 20}}>
                        <Heading style={styles.name} size="sm">{item.author.name}</Heading>
                        <Text style={styles.content}>{item.content}</Text>
                      </Box>
                    </Flex>
                    {
                      item.replies.map((reply, i) =>{
                        return replies(reply, i)
                      })
                    }
                  </Box>
                )
              })
            }
          </ScrollView>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}

function stateSelector(state) {
  return {
    comments: state.story.comments,
  };
}

const styles = StyleSheet.create({
  reply:{
    marginLeft: 30,
    marginTop: 10
  },
  name: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  }
});