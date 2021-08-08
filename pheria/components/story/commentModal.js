import * as React from 'react';
import {Modal, Text, Flex, ScrollView, Box, Heading, Input} from 'native-base';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {vw, vh} from '../../plugins/viewport-unit';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconFA from 'react-native-vector-icons/FontAwesome';
import {commentStory, replyCommentStory} from '../../store/actions/storyActions';
import { useToast } from 'native-base';

import {useSelector, shallowEqual, useDispatch} from 'react-redux';

export default function ListCommentModal({dialog, closeModal}) {
  const state = useSelector(stateSelector, shallowEqual);
  const [comment, setComment] = React.useState('')
  const [reply, setReply] = React.useState('')
  const [replyId, setReplyId] = React.useState(null)
  const dispatch = useDispatch();
  const toast = useToast()

  const handleChangeInput = (key, event) => {
    if(key === 'comment'){
      setComment(event.nativeEvent.text);
    }
    else {
      setReply(event.nativeEvent.text);
    }
  };

  const sentComment = async () => {
    const data = {
      story: state.id,
      content: comment
    }

    const success = await dispatch(commentStory(data))
    if(success){
      setComment('')
    }
    else{
      toast.show({
        title: "Lỗi không bình luận được !",
        placement: "bottom",
        status: "error",
      })
    }
  }

  const sentReply = async () =>{
    const data = {
      replyId: replyId,
      content: reply
    }
    
    const success = await dispatch(replyCommentStory(data))
    if(success){
      setReply('')
      setReplyId(null)
    }
    else{
      toast.show({
        title: "Lỗi không trả lời được !",
        placement: "bottom",
        status: "error",
      })
    }
  }

  const openInputReply = (id) =>{
    setReplyId(id)
  }

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
          <Box bg={'#e0e0e0'} style={styles.boxComment}>
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
          <ScrollView height={40*vh}>
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
                      <Box bg={'#e0e0e0'} style={styles.boxComment}>
                        <Heading style={styles.name} size="sm">{item.author.name}</Heading>
                        <Text style={styles.content}>{item.content}</Text>
                      </Box>
                    </Flex>
                    <Box style={styles.moreComment}>
                      <TouchableOpacity onPress={()=>openInputReply(item._id)} >
                        <Text>Trả lời</Text>
                      </TouchableOpacity>
                    </Box>
                    {
                      item.replies.map((reply, i) =>{
                        return replies(reply, i)
                      })
                    }
                    {
                      replyId === item._id && (
                        <Box style={styles.replySection}>
                          <Input width={70*vw} style={styles.inputComment}
                            placeholder="Trả lời bình luận"
                            onChange={(v)=>handleChangeInput('reply', v)}>
                          </Input>
                          <IconFA style={styles.sendIcon} name="send-o" size={24} color={'#000'} 
                            onPress={()=>sentReply()}/>
                        </Box>
                      )
                    }
                    
                  </Box>
                )
              })
            }
          </ScrollView>
          <Box style={styles.sendSection}>
            <Input width={80*vw} style={styles.inputComment}
              value={comment}
              placeholder="Viết bình luận"
              onChange={(v)=>handleChangeInput('comment', v)}>
            </Input>
            <IconFA style={styles.sendIcon} name="send-o" size={24} color={'#000'} 
              onPress={()=>sentComment()}/>
          </Box>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}

function stateSelector(state) {
  return {
    comments: state.story.comments,
    id: state.story._id
  };
}

const styles = StyleSheet.create({
  boxComment: {
    borderRadius: 10, 
    marginLeft: 20,
    marginBottom: 10,
  },
  reply:{
    marginLeft: 30,
  },
  moreComment: {
    marginBottom: 10,
    marginLeft: 50
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
  },
  inputComment: {
    borderRadius:10,
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
  },
  sendSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  replySection:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginBottom: 10,
  },
  sendIcon: {
    padding: 10,
  },
});