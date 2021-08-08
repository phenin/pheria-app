import * as React from 'react';
import {Center, Text} from 'native-base';
import {useSelector, shallowEqual, useDispatch} from 'react-redux';
import {StyleSheet} from 'react-native';
import {vh, vw} from '../../plugins/viewport-unit';
import Icon from 'react-native-vector-icons/AntDesign';
import {heartStory} from '../../store/actions/storyActions';

export default function ActionStory({showHeart, openComment}) {
  const state = useSelector(stateSelector, shallowEqual);
  const dispatch = useDispatch();

  const {id, color, liked, hearts, comments} = state;

  const heart = () => {
    showHeart(id)
  }

  const unHeart = () => {
    dispatch(heartStory(id, false))
  }

  return (
    <>
      <Center style={styles.overlay} >
        {
          liked ?
          <Icon
            name="heart"
            size={24}
            color={'#ed4956'}
            onPress={()=>unHeart()}
          /> : 
          <Icon
            name="hearto"
            size={24}
            color={'#fff'}
            onPress={()=>heart()}
          />
        }
        <Text style={{color: color, margin: 10}} >{hearts.length}</Text>
        <Icon
          name="message1"
          size={24}
          color={'#fff'}
          onPress={()=>openComment()}
        />
        <Text style={{color: color, margin: 10}}>{comments.length}</Text>
        
      </Center>
      
      </>
  );
}

function stateSelector(state) {
  return {
    color: state.story.background.color,
    hearts: state.story.hearts,
    comments: state.story.comments,
    liked: state.story.liked,
    id: state.story._id
  };
}

const styles = StyleSheet.create({
  sizeIcon: {
    width: 20,
    height: 20,
  },
  overlay: {
    position: 'absolute',
    right: 0,
    top: 40 * vh,
    width: 20 * vw,
    alignContent: 'center',
    justifyContent: 'center'
  },
  overlayHeart: {
    tintColor: '#ed4956',
  },
});